import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface LinkUIProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export const LinkUI = ({ children, href, className }: LinkUIProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "text-sm font-medium dark:text-darkmode text-lightmode hover:opacity-75 transition-all truncate",
        className
      )}
    >
      {children}
    </Link>
  );
};
