import errorResponse from "@/app/lib/errorResponse";
import { getEmbeddings, getPineconeIndex } from "@/app/lib/langchainHelper";
import { Document } from "@langchain/core/documents";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { YoutubeTranscript } from 'youtube-transcript';

export const POST = async (request: NextRequest) => {

    try {
        const body = await request.json()
        const { videoId } = body;

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
        // return NextResponse.json({
        //     success: true,
        //     transcript: transcript,
        // });

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

        return NextResponse.json({
            success: true,
            transcript: docOutput,
        });
    } catch (err) {
        console.log(err);
        return errorResponse(err instanceof Error ? err.message : "Something went wrong while Inserting the transcript.")
    }
};
