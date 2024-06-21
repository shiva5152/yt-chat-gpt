import { combineDocuments, getChatLLM, getEmbeddings, getPineconeIndex } from "@/app/lib/langchainHelper";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { PineconeStore } from "@langchain/pinecone";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import errorResponse from "@/app/lib/errorResponse";
import Chat from "@/models/chat";
import { auth } from '@clerk/nextjs/server';
import connectToDb from "@/utils/connectDb";
import User from "@/models/user";

type Params = {
    [key: string]: {
        videoId: string
    };
};

export const GET = async (request: NextRequest, { params }: Params) => {

    const { searchParams } = new URL(request.url);
    const question = searchParams.get("query");
    const videoId = params.videoId;
    const { userId } = auth();



    try {
        if (!question) {
            return errorResponse("query not found", 400);
        }
        if (!videoId) {
            return errorResponse("videoId found", 400);
        }
        if (question.length > 250) {
            return errorResponse("query could not exceed the 250 character limit.", 400);
        }
        const user = await User.findOne({ userId });
        if (user.tokenLeft <= 0) {
            return errorResponse("!!! You have exhausted free your tokens.", 403);
        }

        const pineconeIndex = getPineconeIndex()
        const embeddings = getEmbeddings();

        const tokenUsage = { tokens: 0, totalTokenCount: 0 };
        const llm = getChatLLM(tokenUsage);

        if (!pineconeIndex || !embeddings || !llm) {
            throw new Error("pineconeIndex, embeddings or llm,either of them not found");
        }

        const standaloneQuestionTemplate = 'Given a question, convert it to a standalone question. question: {question} standalone question:'

        const answerTemplate = `You are a helpful and enthusiastic teacher who can answer a given question about the topic
                                 based on the context provided. Try to find the answer in the context.
                                If you really don't know the answer, say "I'm sorry, I don't know the answer to that."
                                Don't try to make up an answer.
                                Always speak as if you were chatting to a student who is curious about the his topic.
                                context: {context}
                                question: {question}
                                answer: `

        // setUp promptTemplate instance
        const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);
        const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

        // setUp the related chains
        const standaloneQuestionChain = standaloneQuestionPrompt
            .pipe(llm)
            .pipe(new StringOutputParser());
        const answerChain = answerPrompt
            .pipe(llm)
            .pipe(new StringOutputParser());

        // setup retriever
        const vectorStore = await PineconeStore.fromExistingIndex(
            embeddings,
            {
                pineconeIndex,
                namespace: videoId,
            }
        );
        const retriever = vectorStore.asRetriever();

        const retrieverChain = RunnableSequence.from([
            prevResult => prevResult.standalone_question,
            retriever,
            combineDocuments
        ])

        const chain = RunnableSequence.from([
            {
                standalone_question: standaloneQuestionChain,
                original_input: new RunnablePassthrough(),

            },
            {
                context: retrieverChain,
                question: ({ original_input }) => original_input.question
            },
            answerChain
        ])

        const response = await chain.invoke({
            question
        });

        // saving the chat in the database 
        await connectToDb();
        await Chat.updateOne({ videoId, userId }, { $push: { conversations: { query: question, gptReply: response } } });
        await User.updateOne({ userId }, { $inc: { tokenLeft: -tokenUsage.totalTokenCount } });

        return NextResponse.json({
            success: true,
            tokenUsage: { responseToken: tokenUsage.tokens, totalTokenUsed: tokenUsage.totalTokenCount },
            response: response,
            tokenLeft: user.tokenLeft - tokenUsage.totalTokenCount > 0 ? user.tokenLeft - tokenUsage.totalTokenCount : 0
        }, { status: 200 });

    } catch (err) {
        return errorResponse("Something went wrong while getting the response", 500);
    }
};