import { twMerge } from "tailwind-merge";

interface GradientProps {
  text: string;
  className?: string;
}

export const Gradient = ({ text, className }: GradientProps) => {
  return (
    <span
      className={twMerge(
        "font-semibold text-pretty from-[#0070F0] to-[#19cfff] bg-clip-text text-transparent bg-gradient-to-b",
        className
      )}
    >
      {text}
    </span>
  );
};
