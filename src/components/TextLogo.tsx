import { twMerge } from "tailwind-merge";

type TextLogoProps = {
  onClick?: () => void;
};

const TextLogo = ({ onClick }: TextLogoProps) => {
  return (
    <span
      onClick={onClick}
      className={twMerge(
        "text-3xl font-black text-purple-400",
        onClick ? "cursor-pointer" : "cursor-auto",
      )}
    >
      <span>KHE</span>
      <span className="text-lg font-medium text-white">pex</span>
    </span>
  );
};

export default TextLogo;
