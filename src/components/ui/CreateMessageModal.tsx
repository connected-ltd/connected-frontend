import React from "react";
import { Info, X } from "lucide-react";
import {
  createMessageSchema,
  CreateMessageSchema,
} from "@/pages/organization/messages/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import {
  useGetAreasQuery,
  useGetShortcodesQuery,
} from "@/pages/admin/admin-api/statsApiSlice";
import CustomSelect from "../inputs/CustomSelect";
import { Button } from "./button";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/pages/auth/authSlice";
import CustomTextArea from "../inputs/CustomTextArea";
import { useCreateBroadcastMutation } from "@/pages/organization/organization-api/messagesApiSlice";

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
    defaultValues: {
      shortcode_id: "",
      area_id: "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  });

  const { showToast } = useToast();
  const userId = useSelector(selectCurrentUser)?.id;
  const { data: areas, isLoading: isFetchingAreas } = useGetAreasQuery();
  const { data: shortcodes, isLoading: isFetchingShortcodes } =
    useGetShortcodesQuery();
  const [sendBroadcast] = useCreateBroadcastMutation();

  const onSubmit: SubmitHandler<CreateMessageSchema> = async (data) => {
    try {
      const body = {
        ...data,
        user_id: userId,
      };
      await sendBroadcast(body).unwrap();
      showToast("Message sent successfully", "success");
      onClose();
    } catch (error) {
      console.error("Error sending message:", error);
      showToast("Something went wrong", "error");
    }
  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md py-4"
        >
          <div>
            <div>
              <CustomSelect
                label="Shortcode"
                register={register("shortcode_id", {
                  valueAsNumber: true,
                })}
                errorMessage={errors.shortcode_id}
                className="my-2"
                options={
                  shortcodes?.data.map((code) => ({
                    name: code.shortcode,
                    value: code.id,
                  })) || []
                }
                disabled={isFetchingShortcodes}
              />

              <CustomTextArea
                label="Message"
                placeholder="Type your message here"
                register={register("message")}
                errorMessage={errors.message}
                className="my-2"
              />

              <CustomSelect
                label="Area"
                register={register("area_id", {
                  valueAsNumber: true,
                })}
                errorMessage={errors.area_id}
                className="my-2"
                options={
                  areas?.data.map((area) => ({
                    name: area.name,
                    value: area.id,
                  })) || []
                }
                disabled={isFetchingAreas}
              />
            </div>

            <div className="mt-2 p-2 rounded-sm bg-[#F0F9FF] w-full flex items-center gap-3">
              <Info className="text-[#0369A1]" />
              <div>
                <p className="text-xs text-[#0369A1]">
                  Your broadcast will be sent to 1,367,890 people. You will
                  charged 30 units for this. Learn More
                </p>
              </div>
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
        </form>
      </div>
    </div>
  );
};

export default CreateMessageModal;
