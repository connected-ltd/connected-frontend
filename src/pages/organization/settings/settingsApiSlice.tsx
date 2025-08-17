// import { connectedApiSlice } from "../../../app/connectedApiSlice";
// import { Areas } from "../../../types/areas.types";
// import { Numbers, NumbersInput } from "../../../types/number.types";

// const apiSliceWithTags = connectedApiSlice.enhanceEndpoints({
//   addTagTypes: ["numbers", "areas", "shortcodes"],
// });

// const SettingsApiSlice = apiSliceWithTags.injectEndpoints({
//   endpoints: (builder) => ({
//     getAreas: builder.query<
//       { message: string; data: Areas[]; status: string },
//       void
//     >({
//       query: () => "/areas",
//       providesTags: ["numbers"],
//     }),
//     createNumbers: builder.mutation<Numbers[], NumbersInput>({
//       query: (values) => ({
//         url: "/numbers",
//         method: "POST",
//         body: { ...values },
//       }),
//       invalidatesTags: ["numbers"],
//     }),
//   }),
// });

// export const { useGetAreasQuery, useCreateNumbersMutation } = SettingsApiSlice;
