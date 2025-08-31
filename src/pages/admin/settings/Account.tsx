import CustomTextField from "@/components/inputs/CustomTextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/pages/auth/authSlice";
import { Check } from "lucide-react";
import { useEditUserMutation } from "@/pages/auth/userApiSlice";
import CustomTextArea from "@/components/inputs/CustomTextArea";
import {
  AccountSchema,
  accountSchema,
} from "@/pages/organization/settings/schema";

const Account = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountSchema>({ resolver: zodResolver(accountSchema) });

  const [editUser] = useEditUserMutation();

  const { showToast } = useToast();
  const currentUser = useSelector(selectCurrentUser);

  const onSubmit: SubmitHandler<AccountSchema> = async (data) => {
    try {
      await editUser(data).unwrap();
      console.log(data);
      showToast("Profile updated successfully", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Something went wrong", "error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div>
          <div>
            <CustomTextField
              label="Email Address"
              placeholder="Type your email here"
              register={register("username")}
              errorMessage={errors.username}
              defaultValue={currentUser?.username}
              // className="my-3"
            />

            <CustomTextField
              label="Name"
              placeholder="Type your name here"
              register={register("company_name")}
              errorMessage={errors.company_name}
              defaultValue={currentUser?.company_name}
              className="my-3"
            />

            <CustomTextField
              label="Address"
              placeholder="Type your address here"
              register={register("address")}
              errorMessage={errors.address}
              defaultValue={currentUser?.address}
              className="my-3"
            />

            <CustomTextArea
              label="Description"
              placeholder="Type your description here"
              register={register("description")}
              errorMessage={errors.description}
              defaultValue={currentUser?.description}
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
