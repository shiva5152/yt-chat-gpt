import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";


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