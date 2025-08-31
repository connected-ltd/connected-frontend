import { useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import LinearProgress from "@/components/ui/LinearProgress";
import { useToast } from "@/context/ToastContext";
import { useVerifyCreditPaymentMutation } from "../settingsApiSlice";

const VerifyPayment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [verifyPayment, { isLoading }] = useVerifyCreditPaymentMutation();

  const reference = useMemo(() => params.get("reference") ?? "", [params]);

  useEffect(() => {
    const run = async () => {
      if (!reference) {
        showToast("Missing payment reference.", "error");
        navigate("/settings", { replace: true });
        return;
      }
      try {
        await verifyPayment({ reference }).unwrap();

        showToast("Credits added successfully", "success");

        // Go back to Payments page
        navigate("/settings", { replace: true });
      } catch (e) {
        console.error("verifyPayment error:", e);
        showToast(
          "Payment verification failed. If you were charged, contact support.",
          "error"
        );
        navigate("/settings", { replace: true });
      }
    };
    run();
  }, [reference, verifyPayment, navigate, showToast]);

  return (
    <div className="p-6">
      <p className="mb-2 text-text-primary">Verifying your payment...</p>
      {isLoading && <LinearProgress />}
    </div>
  );
};

export default VerifyPayment;
