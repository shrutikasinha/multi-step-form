import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ChatCompletionResponse } from "../../types/suggestionsType";

interface AIWriteRequest {
  fieldName: string;
  context: string;
  currentValue?: string;
  usePersonalData?: boolean;
  previousFormData: string;
}

interface AIWriteResponse {
  content: string;
}

export const suggestionsApi = createApi({
  reducerPath: "aiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openai.com/v1",
    prepareHeaders: (headers) => {
      const key = import.meta.env.VITE_OPENAI_API_KEY;
      headers.set("Authorization", `Bearer ${key}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    generateContent: builder.mutation<AIWriteResponse, AIWriteRequest>({
      query: (data) => ({
        url: "/chat/completions",
        method: "POST",
        body: {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a helpful writing assistant for form completion. Always write in first-person ("I"). Generate professional, clear, and concise content based on the user's input and any personal data provided.`,
            },
            {
              role: "user",
              content: `I need help writing content for the "${data.fieldName}" field.

${data.usePersonalData && data.previousFormData ? `Here is my personal information:
${data.previousFormData}
` : ''}
${data.currentValue ? `Current field content: ${data.currentValue}
` : ''}
Based on this context/instruction: ${data.context}

Please generate appropriate content for this field${data.usePersonalData ? ', taking my personal information into account' : ''}.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
      }),
      transformResponse: (response: ChatCompletionResponse) => ({
        content: response.choices[0].message.content,
      }),
    }),
  }),
});

export const { useGenerateContentMutation } = suggestionsApi;