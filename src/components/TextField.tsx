import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

type TextFieldProps = {
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, errorMessage, ...rest }, ref) => {
    return (
      <div className="flex w-full flex-col">
        <input
          ref={ref}
          {...rest}
          className={twMerge(
            "h-10 w-full rounded-md px-4 py-2 text-sm text-zinc-800 outline-none",
            errorMessage ? "bg-rose-50" : "bg-white",
            className,
          )}
        />
        {errorMessage && (
          <div className="text-xs text-rose-300">{errorMessage}</div>
        )}
      </div>
    );
  },
);

export default TextField;
