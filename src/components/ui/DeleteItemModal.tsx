import React from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import { Message } from "@/types/messages.types";

interface DeleteItemModalProps {
  open: boolean;
  onClose: () => void;
  handlSubmit: (message: Message) => void;
  isLoading: boolean;
  message?: Message;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  open,
  onClose,
  handlSubmit,
  isLoading,
  message,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F566] backdrop-blur-sm">
      <div className="bg-bg-primary rounded-lg shadow-lg p-6 w-1/4 min-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Delete Message?
          </h3>
          <button onClick={onClose} className="cursor-pointer">
            <X className="text-text-primary" />
          </button>
        </div>
        <div className="my-4">
          <p>
            Are you sure you want to delete the message{" "}
            <span className="font-bold">
              “{message ? message.message : ""}”
            </span>
            ? You can't undo this action.
          </p>
        </div>
        <div className="flex mt-2 gap-4 justify-between items-center">
          <Button
            className="w-3/7"
            variant={"default"}
            size={"default"}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            className="w-3/7"
            variant={"default"}
            size={"default"}
            loading={isLoading}
            disabled={isLoading || !message}
            onClick={() => {
              if (message) {
                handlSubmit(message);
              }
            }}
          >
            Delete Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemModal;
