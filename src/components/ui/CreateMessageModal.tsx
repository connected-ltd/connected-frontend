import React from "react";

import { X } from "lucide-react";
import {
  createMessageSchema,
  CreateMessageSchema,
} from "@/pages/organization/messages/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import CustomTextField from "../inputs/CustomTextField";
import { useGetAreasQuery } from "@/pages/admin/admin-api/statsApiSlice";
import CustomSelect from "../inputs/CustomSelect";
import { Button } from "./button";

interface CreateMessageModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateMessageModal: React.FC<CreateMessageModalProps> = ({
  open,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateMessageSchema>({
    resolver: zodResolver(createMessageSchema),
  });

  const { showToast } = useToast();
  const { data: areas, isLoading } = useGetAreasQuery();

  const onSubmit: SubmitHandler<CreateMessageSchema> = async (data) => {
    try {
      // const userData = await loginRequest(data).unwrap();
      // dispatch(login(userData));
      console.log("Message data:", data);
      showToast("Message sent successfully", "success");
      // navigate("/lesson-plans");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // alert("something went wrong");
      console.error("Error sending message:", error);
      showToast("Something went wrong", "error");
    }
  };
  const [message, setMessage] = React.useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F566] backdrop-blur-sm ">
      <div className="bg-bg-primary rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Create New Message
          </h3>
          <button onClick={onClose} className="cursor-pointer">
            <X className="text-text-primary" />
          </button>
        </div>
        <div>
          <CustomTextField
            label="Shortcode"
            placeholder="xxxxx"
            register={register("shortcode")}
            errorMessage={errors.shortcode}
            className="my-2"
          />

          <CustomTextField
            label="Message"
            placeholder="xxxxx"
            register={register("message")}
            errorMessage={errors.message}
            className="my-2"
          />

          <CustomSelect
            label="Area"
            register={register("area")}
            errorMessage={errors.area}
            className="my-2"
            options={
              areas?.data.map((area) => ({
                name: area.name,
                value: String(area.id),
              })) || []
            }
            disabled={isLoading}
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
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateMessageModal;
