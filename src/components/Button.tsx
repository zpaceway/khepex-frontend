import { twMerge } from "tailwind-merge";
import { CgSpinner } from "react-icons/cg";

type ButtonProps = {
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  isLoading,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={twMerge(
        "relative flex h-10 w-full items-center justify-center rounded-md border border-purple-400 border-opacity-50 bg-purple-500 px-4 py-2 text-sm",
        className,
      )}
      {...rest}
    >
      <div className={isLoading ? "opacity-0" : "opacity-100"}>{children}</div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CgSpinner className="animate-spin" />
        </div>
      )}
    </button>
  );
};

export default Button;
