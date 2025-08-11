import { File, FileInput, Files } from "@/types/files.types";
import { connectedApiSlice } from "../../../app/connectedApiSlice";

const apiSliceWithTags = connectedApiSlice.enhanceEndpoints({
  addTagTypes: ["files"],
});

const FilesApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getFiles: builder.query<
      { message: string; data: Files; status: string },
      void
    >({
      query: () => "/files",
      providesTags: ["files"],
    }),
    addFile: builder.mutation<File, FormData>({
      query: (values) => ({
        url: "/files",
        method: "POST",
        body: values,
        formdata: true,
      }),
      invalidatesTags: ["files"],
    }),
    addWhatsappFile: builder.mutation<File, FileInput>({
      query: (values) => ({
        url: "/files/whatsapp",
        method: "POST",
        body: values,
        formdata: true,
      }),
      invalidatesTags: ["files"],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useAddFileMutation,
  useAddWhatsappFileMutation,
} = FilesApiSlice;
