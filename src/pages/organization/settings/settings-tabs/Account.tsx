import CustomTextField from "@/components/inputs/CustomTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { accountSchema, AccountSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/pages/auth/authSlice";
import { Check } from "lucide-react";

const Account = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountSchema>({ resolver: zodResolver(accountSchema) });

  const { showToast } = useToast();
  const currentUser = useSelector(selectCurrentUser);

  const onSubmit: SubmitHandler<AccountSchema> = async (data) => {
    try {
      // await sendBroadcast(body).unwrap();
      console.log(data);
      showToast("Profile updated successfully", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Something went wrong", "error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <div>
          <div>
            <CustomTextField
              label="Email Address"
              placeholder="Type your username here"
              register={register("username")}
              errorMessage={errors.username}
              value={currentUser.username}
              // className="my-3"
            />

            <CustomTextField
              label="Phone Number"
              placeholder="Type your phone number here"
              register={register("phone")}
              errorMessage={errors.phone}
              // value={currentUser}
              className="my-3"
            />

            <CustomTextField
              label="Description"
              placeholder="Type your description here"
              register={register("description")}
              errorMessage={errors.description}
              value={currentUser.description}
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

export default Account;
