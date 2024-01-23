import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          `
          flex
          w-full
          rounded-md
          focus:outline-none
          p-2
          text-sm
          placeholder:text-neutral-500
          file:border-0
          file:bg-transparent
          disabled:cursor-not-allowed
          disabled:opacity-50
          bg-neutral-700
        `,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
