import { connectedApiSlice } from "../../../app/connectedApiSlice";
import { Message, MessageInput, Messages } from "@/types/messages.types";

const apiSliceWithTags = connectedApiSlice.enhanceEndpoints({
  addTagTypes: ["message"],
});

const MessagesApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<
      { message: string; data: Messages; status: string },
      void
    >({
      query: () => "/messages",
      providesTags: ["message"],
    }),
    createBroadcast: builder.mutation<Message, MessageInput>({
      query: (values) => ({
        url: "/broadcast",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["message"],
    }),
    deleteMessage: builder.mutation<unknown, { id: number }>({
      query: ({ id }) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useCreateBroadcastMutation,
  useDeleteMessageMutation,
} = MessagesApiSlice;
