import { twMerge } from "tailwind-merge";
import { CgSpinner } from "react-icons/cg";

type ButtonVariant = "primary" | "secondary" | "info";

type ButtonProps = {
  isLoading?: boolean;
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClassNameMapping: Record<ButtonVariant, string> = {
  primary: "border-purple-400 border-opacity-50 bg-purple-500",
  secondary: "border-purple-400 border-opacity-50 bg-purple-500",
  info: "border-purple-400 border-opacity-50 bg-purple-500",
};

const Button = ({
  isLoading,
  disabled,
  className,
  children,
  variant = "primary",
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={twMerge(
        "relative flex h-10 w-full items-center justify-center rounded-md border px-4 py-2 text-sm",
        variantClassNameMapping[variant],
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
