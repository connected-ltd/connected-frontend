import React from "react";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import {
  useCreateNumbersMutation,
  useEditNumberMutation,
  useGetAreasQuery,
} from "@/pages/admin/admin-api/statsApiSlice";
import CustomSelect from "../inputs/CustomSelect";
import { Button } from "./button";
import { addUserSchema, AddUserSchema } from "@/pages/admin/users/schema";
import CustomTextField from "../inputs/CustomTextField";

import { Numbers } from "@/types/number.types";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  numberToEdit?: Numbers | null;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  numberToEdit,
}) => {
  const isEdit = Boolean(numberToEdit);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserSchema>({
    resolver: zodResolver(addUserSchema),
    defaultValues: isEdit
      ? {
          number: numberToEdit?.number || "",
          language: numberToEdit?.language || "",
          area_id: (numberToEdit?.area_id as number) || undefined,
        }
      : {
          area_id: undefined,
          language: "",
          number: "",
        },
  });

  const { showToast } = useToast();
  const { data: areas, isLoading: isFetchingAreas } = useGetAreasQuery();
  const [addUser] = useCreateNumbersMutation();
  const [editNumber] = useEditNumberMutation();

  React.useEffect(() => {
    if (isEdit && numberToEdit) {
      reset({
        number: numberToEdit.number,
        language: numberToEdit.language,
        area_id: (numberToEdit.area_id as number) || undefined,
      });
    } else {
      reset({ area_id: undefined, language: "", number: "" });
    }
  }, [isEdit, numberToEdit, reset]);

  const onSubmit: SubmitHandler<AddUserSchema> = async (data) => {
    try {
      if (isEdit && numberToEdit) {
        await editNumber({ ...data, id: numberToEdit.id }).unwrap();
        showToast("User updated successfully", "success");
      } else {
        await addUser(data).unwrap();
        showToast("User added successfully", "success");
      }
      onClose();
    } catch (error) {
      console.error("Error submitting user:", error);
      showToast("Something went wrong", "error");
    }
  };

  const languages = [
    { id: 1, language: "English", value: "english" },
    { id: 2, language: "Hausa", value: "hausa" },
    { id: 3, language: "Igbo", value: "igbo" },
    { id: 4, language: "Yoruba", value: "yoruba" },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F566] backdrop-blur-sm ">
      <div className="bg-bg-primary rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            {isEdit ? "Edit User" : "Add User"}
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

              <CustomSelect
                label="Language"
                register={register("language")}
                errorMessage={errors.language}
                className="my-2"
                options={
                  languages.map((language) => ({
                    name: language.language,
                    value: language.value,
                  })) || []
                }
                disabled={isFetchingAreas}
              />

              <CustomTextField
                label="Number"
                placeholder="+234..."
                register={register("number")}
                errorMessage={errors.number}
                className="my-2"
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
                {isEdit ? "Edit User" : "Add User"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
