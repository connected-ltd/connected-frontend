import { FieldError } from "react-hook-form";

interface CustomTextFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  errorMessage?: FieldError | undefined;
  className?: string;
  value?: string;
  disabled?: boolean;
}

const CustomTextField = ({
  label,
  type,
  register,
  placeholder,
  errorMessage,
  className,
  value,
  disabled,
}: CustomTextFieldProps) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={label} className="text-sm my-2">
        {label}
      </label>
      <input
        id={label}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        {...register}
        className={`border border-black/10 rounded w-full py-2 px-3 text-sm h-10`}
      />
      {errorMessage?.message && (
        <p className="text-red-500 text-sm my-1">{errorMessage.message}</p>
      )}
    </div>
  );
};

export default CustomTextField;
