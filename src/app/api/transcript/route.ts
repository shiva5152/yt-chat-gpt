import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { YoutubeTranscript } from 'youtube-transcript';
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

export const POST = async (request: NextRequest) => {
    const body = await request.json()
    const { url } = body;
    try {
        const transcriptResponse = await YoutubeTranscript.fetchTranscript(
            url, { lang: "en" }
        );
        if (!transcriptResponse) {
            return NextResponse.json({
                success: false,
                message: "Failed to fetch transcript!",
            });
        }
        let transcript = "";
        transcriptResponse.forEach((line) => {
            transcript += line.text;
        });

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

        const pineconeApiKey = process.env.PINECONE_API_KEY || "5013bbcf-00d5-4011-bcf1-63d773651f12";
        const pineconeIndex = process.env.PINECONE_INDEX || "yt-chat-gpt";

        if (!pineconeApiKey || !pineconeIndex) {
            throw new Error("pineconeApiKey or pineconeIndex not found")
        }

        const pinecone = new Pinecone({
            apiKey: pineconeApiKey,
        });
        const index = pinecone.Index(pineconeIndex);

        const azureOpenAIApiKey = process.env.AZURE_OPENAI_KEY || "0a995d6ac1fb47b9a19629e9ffe6f14e";
        const azureOpenAIApiVersion = process.env.AZURE_OPENAI_API_VERSION || "2023-05-15";
        const azureOpenAIApiInstanceName = process.env.AZURE_OPENAI_INSTANCE_NAME || "cyberlevels";
        const azureOpenAIApiDeploymentName = process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME || "cyberlevels-resume";

        if (!azureOpenAIApiKey || !azureOpenAIApiVersion || !azureOpenAIApiInstanceName || !azureOpenAIApiDeploymentName) {
            throw new Error("All env variable not found while getting Embeddings");
        }

        const embeddings = new OpenAIEmbeddings({
            azureOpenAIApiKey,
            azureOpenAIApiVersion,
            azureOpenAIApiInstanceName,
            azureOpenAIApiDeploymentName,
        });

        await PineconeStore.fromDocuments(
            docOutput,
            embeddings,
            {
                pineconeIndex: index,
                // namespace: candidateId
            }
        );

        return NextResponse.json({
            success: true,
            transcript: docOutput,
        });
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
};
