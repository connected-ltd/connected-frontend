// src/components/ui/PaymentProgress.tsx
import { useEffect, useRef } from "react";
import LinearProgress from "@/components/ui/LinearProgress";
import { useToast } from "@/context/ToastContext";
import { useVerifyCreditPaymentMutation } from "@/pages/organization/settings/settingsApiSlice";
import { X } from "lucide-react";

type PaymentProgressProps = {
  open: boolean;
  reference: string;
  popup?: Window | null;
  onDone: () => void; // called on success or final failure (closes overlay)
};

const PaymentProgress: React.FC<PaymentProgressProps> = ({
  open,
  reference,
  popup,
  onDone,
}) => {
  const { showToast } = useToast();
  const [verifyPayment] = useVerifyCreditPaymentMutation();
  const timerRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const closeWatchRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open || !reference) return;

    const intervalMs = 3000;
    const timeoutMs = 2 * 60 * 1000; // 2 minutes

    const tick = async () => {
      try {
        await verifyPayment({ reference }).unwrap();
        // close popup if still open; this shouldn't throw
        popup?.close?.();
        showToast("Credits added successfully", "success");
        cleanup();
        onDone();
      } catch (error) {
        console.error(error);
        // keep polling until timeout
        return; // <-- non-empty catch: explicit no-op
      }
    };

    // start polling
    timerRef.current = window.setInterval(
      tick,
      intervalMs
    ) as unknown as number;

    // safety timeout
    timeoutRef.current = window.setTimeout(async () => {
      // stop normal polling
      if (timerRef.current) window.clearInterval(timerRef.current);

      // when popup closes, try one last verify
      closeWatchRef.current = window.setInterval(async () => {
        if (!popup || popup.closed) {
          if (closeWatchRef.current)
            window.clearInterval(closeWatchRef.current);
          try {
            await verifyPayment({ reference }).unwrap();
            showToast("Credits added successfully", "success");
          } catch (_finalErr) {
            console.log(_finalErr);
            showToast(
              "We couldn't confirm your payment automatically. If you completed payment, it should reflect shortly. Otherwise, try verifying again.",
              "error"
            );
          }
          cleanup();
          onDone();
        }
      }, 800) as unknown as number;
    }, timeoutMs) as unknown as number;

    // kick off first attempt slightly sooner
    const first = window.setTimeout(tick, 1200);

    return () => {
      window.clearTimeout(first);
      cleanup();
    };

    function cleanup() {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (closeWatchRef.current) window.clearInterval(closeWatchRef.current);
      timerRef.current = null;
      timeoutRef.current = null;
      closeWatchRef.current = null;
    }
  }, [open, reference, verifyPayment, popup, onDone, showToast]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-bg-primary rounded-lg shadow-xl p-5 w-full max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-text-primary">
            Processing Payment
          </h3>
          <X className="text-text-primary opacity-40" />
        </div>
        <p className="text-sm text-text-secondary mb-3">
          Please complete the checkout in the popup. We’ll confirm your payment
          automatically.
        </p>
        <LinearProgress />
        <p className="mt-3 text-xs text-text-tertiary">
          Ref: <span className="font-mono">{reference}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentProgress;
