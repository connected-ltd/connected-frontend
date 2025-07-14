import { Shortcodes } from "@/types/shortcodes.types";
import { connectedApiSlice } from "../../../app/connectedApiSlice";
import { Areas, AreasStats } from "../../../types/areas.types";
import {
  Numbers,
  NumbersInput,
  NumberStats,
} from "../../../types/number.types";

const apiSliceWithTags = connectedApiSlice.enhanceEndpoints({
  addTagTypes: ["numbers", "areas", "shortcodes"],
});

const QuestionApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getAreas: builder.query<
      { message: string; data: Areas[]; status: string },
      void
    >({
      query: () => "/areas",
      providesTags: ["numbers"],
    }),
    getNumbers: builder.query<
      { message: string; data: Numbers[]; status: string },
      void
    >({
      query: () => "/numbers",
      providesTags: ["numbers"],
    }),
    getNumbersStats: builder.query<
      { message: string; data: NumberStats[]; status: string },
      void
    >({
      query: () => "/numbers/stats",
      providesTags: ["numbers"],
    }),
    getAreaStats: builder.query<
      { message: string; data: AreasStats; status: string },
      void
    >({
      query: () => "/areas/stats",
      providesTags: ["numbers"],
    }),
    getShortcodes: builder.query<
      { message: string; data: Shortcodes; status: string },
      void
    >({
      query: () => "/shortcodes",
      providesTags: ["shortcodes"],
    }),
    createNumbers: builder.mutation<Numbers[], NumbersInput>({
      query: (values) => ({
        url: "/numbers",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["numbers"],
    }),
  }),
});

export const {
  useGetAreasQuery,
  useGetNumbersQuery,
  useGetNumbersStatsQuery,
  useGetAreaStatsQuery,
  useGetShortcodesQuery,
  useCreateNumbersMutation,
} = QuestionApiSlice;
