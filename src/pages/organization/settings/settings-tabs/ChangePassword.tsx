import CustomTextField from "@/components/inputs/CustomTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { passwordSchema, PasswordSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useChangePasswordMutation } from "@/pages/auth/userApiSlice";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordSchema>({ resolver: zodResolver(passwordSchema) });

  const [changePassword] = useChangePasswordMutation();

  const { showToast } = useToast();

  const onSubmit: SubmitHandler<PasswordSchema> = async (data) => {
    try {
      await changePassword({ password: data.confirm_password }).unwrap();
      showToast("Password changed successfully", "success");
    } catch (error) {
      console.error("Error updating password:", error);
      showToast("Something went wrong", "error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div>
          <div>
            <CustomTextField
              label="New Password"
              placeholder="Type new password here"
              register={register("password")}
              errorMessage={errors.password}
              type="password"
              checkPassword
              // className="my-3"
            />

            <CustomTextField
              label="Confirm Password"
              placeholder="Confirm your new password here"
              register={register("confirm_password")}
              errorMessage={errors.confirm_password}
              type="password"
              checkPassword
              className="my-3"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              className="mt-2 w-full"
              type="submit"
              variant={"default"}
              size={"default"}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              <Check /> Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
