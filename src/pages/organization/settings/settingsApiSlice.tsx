import {
  Credits,
  InitiatePaymentInput,
  InitiatePaymentResponse,
  VerifyPaymentInput,
  VerifyPaymentResponse,
} from "@/types/user.types";
import { connectedApiSlice } from "../../../app/connectedApiSlice";

const apiSliceWithTags = connectedApiSlice.enhanceEndpoints({
  addTagTypes: ["user", "notification", "credits"],
});

const SettingsApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getCreditBalance: builder.query<
      { message: string; data: Credits; status: string },
      void
    >({
      query: () => "/credits/balance",
      providesTags: ["credits"],
    }),
    initiateCreditPayment: builder.mutation<
      { data: InitiatePaymentResponse; message: string; status: string },
      InitiatePaymentInput
    >({
      query: (values) => ({
        url: "/credits/initialize-payment",
        method: "POST",
        body: { ...values },
      }),
      //   invalidatesTags: ["credits"],
    }),
    verifyCreditPayment: builder.mutation<
      { data: VerifyPaymentResponse; message: string; status: string },
      VerifyPaymentInput
    >({
      query: (values) => ({
        url: "/credits/verify-payment",
        method: "POST",
        body: { ...values },
      }),
      invalidatesTags: ["credits"],
    }),
  }),
});

export const {
  useGetCreditBalanceQuery,
  useInitiateCreditPaymentMutation,
  useVerifyCreditPaymentMutation,
} = SettingsApiSlice;
