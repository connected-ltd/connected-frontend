// src/components/ui/InitializePaymentModal.tsx
import React, { useCallback, useState } from "react";
import { Info, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import {
  creditSchema,
  CreditSchema,
} from "@/pages/organization/settings/schema";
import { useInitiateCreditPaymentMutation } from "@/pages/organization/settings/settingsApiSlice";
import { Button } from "@/components/ui/button";
import CustomTextField from "@/components/inputs/CustomTextField";

interface InitializePaymentModalProps {
  open: boolean;
  onClose: () => void;
  onPaymentLaunched?: (args: {
    reference: string;
    popup: Window | null;
  }) => void; // ✅ new
}

const InitializePaymentModal: React.FC<InitializePaymentModalProps> = ({
  open,
  onClose,
  onPaymentLaunched,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<CreditSchema>({
    resolver: zodResolver(creditSchema),
    defaultValues: { amount: 0 },
  });

  const { showToast } = useToast();
  const [initiatePayment] = useInitiateCreditPaymentMutation();
  const [isPaying, setIsPaying] = useState(false);

  // display-only estimates
  const PRICING = {
    creditsPerNaira: 1 / 10,
    creditsPerBroadcast: 0.5,
    creditsPerAiResponse: 1,
  };
  const rawAmount = watch("amount");
  const amountNaira = Number.isFinite(rawAmount as number)
    ? (rawAmount as number)
    : 0;
  const credits = Math.floor(amountNaira * PRICING.creditsPerNaira);
  const estBroadcasts =
    credits > 0 ? Math.floor(credits / PRICING.creditsPerBroadcast) : 0;
  const estAiResponses =
    credits > 0 ? Math.floor(credits / PRICING.creditsPerAiResponse) : 0;

  const openCenteredPopup = useCallback(
    (url: string, title = "Paystack Checkout") => {
      const w = 520;
      const h = 720;
      const dualLeft = window.screenLeft ?? window.screenX ?? 0;
      const dualTop = window.screenTop ?? window.screenY ?? 0;
      const width =
        window.innerWidth ??
        document.documentElement.clientWidth ??
        screen.width;
      const height =
        window.innerHeight ??
        document.documentElement.clientHeight ??
        screen.height;
      const left = dualLeft + (width - w) / 2;
      const top = dualTop + (height - h) / 2;
      const features = `scrollbars=yes,width=${w},height=${h},top=${top},left=${left}`;
      const popup = window.open(url, title, features);
      popup?.focus?.();
      return popup;
    },
    []
  );

  const onSubmit: SubmitHandler<CreditSchema> = async (form) => {
    try {
      if (!form.amount || form.amount <= 0) {
        showToast("Please enter a valid amount", "error");
        return;
      }
      setIsPaying(true);

      // 1) Create transaction with ONLY { amount }
      const res = await initiatePayment({ amount: form.amount }).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authUrl = (res as any)?.data?.authorization_url;
      const reference =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (res as any)?.data?.reference ??
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (res as any)?.data?.transaction?.reference;

      if (!authUrl || !reference) {
        showToast("Unable to start payment. Please try again.", "error");
        setIsPaying(false);
        return;
      }

      // 2) Open Paystack popup and close the modal right away
      const popup = openCenteredPopup(authUrl);
      reset({ amount: 0 });
      onClose();

      // 3) Let parent show the progress overlay and handle verification
      onPaymentLaunched?.({ reference, popup });
    } catch (err) {
      console.error(err);
      showToast("Something went wrong starting your payment.", "error");
    } finally {
      setIsPaying(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F566] backdrop-blur-sm">
      <div className="bg-bg-primary rounded-lg shadow-lg p-6 w-1/4 min-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Top Up Wallet
          </h3>
          <button onClick={onClose} className="cursor-pointer">
            <X className="text-text-primary" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md py-4"
        >
          <CustomTextField
            label="Amount"
            placeholder="Type in your amount here"
            type="number"
            register={register("amount", { valueAsNumber: true })}
            errorMessage={errors.amount}
            className="my-2"
          />

          <div className="mt-2 p-2 rounded-sm bg-[#F0F9FF] w-full flex items-center gap-3">
            <Info className="text-[#0369A1]" />
            <div>
              <p className="text-xs text-[#0369A1]">{credits} Credits</p>
              <p className="text-xs text-[#0369A1]">
                ~{estBroadcasts} Broadcasts & ~{estAiResponses} AI responses
              </p>
            </div>
          </div>

          <Button
            className="mt-2 w-full"
            type="submit"
            variant="default"
            size="default"
            loading={isSubmitting || isPaying}
            disabled={isSubmitting || isPaying}
          >
            Pay & Top Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InitializePaymentModal;
