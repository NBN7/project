import { useRouter } from "next/navigation";

import { Button } from "@nextui-org/button";

import { IoChevronBack } from "react-icons/io5";

export const GoBackButton = () => {
  const router = useRouter();

  const iconSize = "20px";

  return (
    <Button
      isIconOnly
      className="dark:text-icondark text-iconlight bg-transparent"
      radius="full"
    >
      <IoChevronBack size={iconSize} onClick={() => router.back()} />
    </Button>
  );
};
