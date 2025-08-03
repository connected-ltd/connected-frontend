import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { Button } from "./button";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/pages/auth/authSlice";
import uploadIcon from "@/assets/icons/upload-icon.svg";
import { useAddFileMutation } from "@/pages/organization/organization-api/filesApiSlice";

interface AddFileModalProps {
  open: boolean;
  onClose: () => void;
}

const AddFileModal: React.FC<AddFileModalProps> = ({ open, onClose }) => {
  const { showToast } = useToast();
  const userId = useSelector(selectCurrentUser)?.id;
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadFile] = useAddFileMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!file) {
        showToast("Please select a file to upload", "error");
        setIsSubmitting(false);
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", String(userId));

      await uploadFile(formData).unwrap();

      showToast("File uploaded successfully", "success");
      setFile(null);
      setFileName("");
      onClose();
    } catch (error) {
      console.error("Error uploading file:", error);
      showToast("Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form and file state when modal closes
  useEffect(() => {
    if (!open) {
      setFile(null);
      setFileName("");
      setIsSubmitting(false);
    }
  }, [open]);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFileChange(event.target.files[0]);
    }
  };

  const handleFileChange = (file: File) => {
    setFile(file);
    setFileName(file.name);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F566] backdrop-blur-sm ">
      <div className="bg-bg-primary rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Add New File
          </h3>
          <button onClick={onClose} className="cursor-pointer">
            <X className="text-text-primary" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="w-full max-w-md py-4">
          <div>
            <div>
              {/* <CustomSelect
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
              /> */}

              <div
                className="border-2 border-[#02569280] border-dashed rounded-sm text-center cursor-pointer w-full p-16 bg-[#F8F8FF] my-4"
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={onFileInputChange}
                  accept=".pdf"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-[4.5em]">
                    <img src={uploadIcon} className="w-full" />
                  </div>
                  <p className="text-sm text-[#676767]">
                    Drag and drop files or browse <br /> Supported formats: PDF
                  </p>
                </label>
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
                Add File
              </Button>
            </div>
            {fileName && (
              <div className="block mt-2 text-primary text-sm truncate">
                File selected: <br /> {fileName}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFileModal;
