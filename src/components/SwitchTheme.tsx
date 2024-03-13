"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSwitchTheme } from "@/hooks/useSwitchTheme";
import { Button } from "@nextui-org/button";
import { IoSunny, IoMoon } from "react-icons/io5";

export const SwitchTheme = () => {
  const { data: session, update } = useSession();

  const [localTheme, setLocalTheme] = useState(() =>
    typeof window !== "undefined" ? window.localStorage.getItem("theme") : null
  );

  const iconSize = "18px";

  // fn to update the session we get from useSession
  const updateSession = async () => {
    await update({
      ...session,
      user: {
        ...session?.user,
        theme: session?.user?.theme === "DARK" ? "LIGHT" : "DARK",
      },
    });
  };

  // custom hook to switch the theme
  const { useSwitchThemeMutation } = useSwitchTheme({
    id: session?.user?.id as string,
    updateSession,
  });

  // fn to apply the theme
  const applyTheme = (theme: string) => {
    if (theme === "DARK") {
      document.querySelector("html")!.classList.add("dark");
    } else {
      document.querySelector("html")!.classList.remove("dark");
    }
  };

  // fn to toggle the theme
  const toggleTheme = () => {
    // if the user is logged in, currentTheme is the user's theme, else it's the localTheme
    const currentTheme = session?.user ? session.user.theme : localTheme;

    // this is used to update the theme locally
    const newTheme = currentTheme === "DARK" ? "LIGHT" : "DARK";

    // if the user is logged in, update the theme in the database
    if (session?.user) {
      useSwitchThemeMutation();
      return;
    }

    // if the user is not logged in, update the theme locally
    setLocalTheme(newTheme);

    // set the theme in the local storage
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const theme = session?.user?.theme ?? localTheme;
    if (theme) {
      applyTheme(theme);
    }
  }, [session, localTheme]);

  return (
    <Button
      className="bg-transparent"
      isIconOnly
      radius="full"
      onClick={toggleTheme}
    >
      {(session?.user ? session.user.theme : localTheme) === "DARK" ? (
        <IoSunny size={iconSize} className="text-icondark" />
      ) : (
        <IoMoon size={iconSize} className="text-iconlight" />
      )}
    </Button>
  );
};