import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { YoutubeTranscript } from 'youtube-transcript';
import { ErrorResponse } from "@/app/lib/errorResponse";



export const getPineconeIndex = () => {

    const pineconeApiKey = process.env.PINECONE_API_KEY
    const pineconeIndex = process.env.PINECONE_INDEX_NAME;
    console.log(pineconeIndex);

    if (!pineconeApiKey || !pineconeIndex) {
        throw new Error("pineconeApiKey or pineconeIndex not found")
    }

    const pinecone = new Pinecone({
        apiKey: pineconeApiKey,
    });
    const index = pinecone.Index(pineconeIndex);
    return index;
}

export const getEmbeddings = () => {

    const azureOpenAIApiKey = process.env.AZURE_OPENAI_KEY;
    const azureOpenAIApiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const azureOpenAIApiInstanceName = process.env.AZURE_OPENAI_INSTANCE_NAME;
    const azureOpenAIApiDeploymentName = process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME;

    if (!azureOpenAIApiKey || !azureOpenAIApiVersion || !azureOpenAIApiInstanceName || !azureOpenAIApiDeploymentName) {
        throw new Error("All env variable not found while getting Embeddings");
    }

    const embeddings = new OpenAIEmbeddings({
        azureOpenAIApiKey,
        azureOpenAIApiVersion,
        azureOpenAIApiInstanceName,
        azureOpenAIApiDeploymentName,
    });

    return embeddings;
}

export const getChatLLM = (tokenUsage: { tokens: number, totalTokenCount: number }) => {

    const azureOpenAIApiKey = process.env.AZURE_OPENAI_KEY;
    const azureOpenAIApiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const azureOpenAIApiInstanceName = process.env.AZURE_OPENAI_INSTANCE_NAME;
    const azureOpenAIApiDeploymentName = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;

    if (!azureOpenAIApiKey || !azureOpenAIApiVersion || !azureOpenAIApiInstanceName || !azureOpenAIApiDeploymentName) {
        throw new Error("All env variable not found while getting ChatLLM")
    }
    let totalTokenCount = 0;
    const llm = new ChatOpenAI({
        temperature: 0.5,
        maxTokens: 200,
        azureOpenAIApiKey,
        azureOpenAIApiInstanceName,
        azureOpenAIApiDeploymentName,
        callbacks: [
            {
                handleLLMEnd: (val: any) => {
                    try {
                        const tokens = val.llmOutput.tokenUsage.completionTokens
                        totalTokenCount += tokens;
                        tokenUsage.tokens = tokens,
                            tokenUsage.totalTokenCount = totalTokenCount
                        console.log({ tokens, totalTokenCount });
                    } catch {
                        console.log(val.generations[0])
                    }
                },
            },
        ],
    })

    return llm;
}

export function combineDocuments(docs: any) {
    return docs.map((doc: any) => doc.pageContent).join('\n\n')
}

export const addTranscriptToPinecone = async (videoId: string, errorResponse: ErrorResponse) => {

    try {
        const transcriptResponse = await YoutubeTranscript.fetchTranscript(
            videoId, { lang: "en" }
        );

        if (!transcriptResponse) {
            return errorResponse("Failed to fetch transcript!")
        }

        let transcript = "";
        transcriptResponse.forEach((line) => {
            transcript += line.text;
        });

        if (transcript.length > 12000) {
            return errorResponse("The maximum video length should be around 10 minutes. ", 400);
        }

        const splitter = new RecursiveCharacterTextSplitter(
            {
                separators: ["\n\n", "\n", " ", ""],
                chunkSize: 500,
                chunkOverlap: 30
            }
        );

        const docOutput = await splitter.splitDocuments([
            new Document({ pageContent: transcript }),
        ]);

        const pineconeIndex = getPineconeIndex();
        const embeddings = getEmbeddings();

        if (!embeddings || !pineconeIndex) {
            throw new Error("pineconeIndex, embeddings or either of them not found");
        }

        await PineconeStore.fromDocuments(
            docOutput,
            embeddings,
            {
                pineconeIndex: pineconeIndex,
                namespace: videoId
            }
        );
    } catch (error) {
        return errorResponse(error instanceof Error ? error.message : "Something went wrong while adding transcript to pinecone")
    }
}