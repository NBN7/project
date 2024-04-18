import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { IoChevronBack } from "react-icons/io5";

export const GoBackButton = () => {
  const router = useRouter();

  const iconSize = "20px";

  return (
    <Button
      variant="ghost"
      className="dark:text-icondark text-iconlight rounded-full"
      size="icon"
    >
      <IoChevronBack size={iconSize} onClick={() => router.back()} />
    </Button>
  );
};
