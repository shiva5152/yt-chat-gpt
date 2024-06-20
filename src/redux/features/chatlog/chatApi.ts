import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) => ({
        getChatLog: builder.query({
            query: (videoId) => `chat?videoId=${videoId}`,
        }),
    }),
});

export const { useGetChatLogQuery } = chatApi