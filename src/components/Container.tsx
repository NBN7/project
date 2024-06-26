import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  sectionClassName?: string;
  contentClassName?: string;
}

export const Container = ({
  children,
  sectionClassName,
  contentClassName,
}: ContainerProps) => {
  return (
    <section
      className={twMerge(
        "w-full flex flex-col items-center justify-center px-4",
        sectionClassName
      )}
    >
      <div
        className={twMerge(
          "w-full lg:w-[1000px] flex flex-col items-center gap-3",
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};
