"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { useSwitchTheme } from "@/hooks/useSwitchTheme";

import { SwitchThemeButtonSkeleton } from "@/components/CustomButtons/SwitchThemeButton/SwitchThemeButtonSkeleton";

import { Button } from "@/components/ui/button";

import { THEME } from "@/constants/theme";
import type { TTheme } from "@/types/theme";

import { IoSunny, IoMoon } from "react-icons/io5";

export const SwitchThemeButton = () => {
  const { data: session, update } = useSession();

  const [localTheme, setLocalTheme] = useState<TTheme | null>(() => {
    const theme =
      typeof window !== "undefined"
        ? window.localStorage.getItem("theme")
        : null;
    return theme === THEME.DARK || theme === THEME.LIGHT ? theme : null;
  });
  const [themeLoaded, setThemeLoaded] = useState(false);

  const iconSize = "20px";

  // fn to update the session we get from useSession
  const updateSession = async () => {
    await update({
      ...session,
      user: {
        ...session?.user,
        theme: session?.user?.theme === THEME.DARK ? THEME.LIGHT : THEME.DARK,
      },
    });
  };

  // custom hook to switch the theme
  const { callSwitchThemeMutation } = useSwitchTheme({
    id: session?.user?.id as string,
    updateSession,
  });

  // fn to apply the theme
  const applyTheme = (theme: string) => {
    if (theme === THEME.DARK) {
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
    const newTheme = currentTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

    // if the user is logged in, update the theme in the database
    if (session?.user) {
      callSwitchThemeMutation();
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
      setThemeLoaded(true);
    }
  }, [session, localTheme]);

  if (!themeLoaded) {
    return <SwitchThemeButtonSkeleton />;
  }

  return (
    <Button
      variant="ghost"
      className="rounded-full"
      size="icon"
      onClick={toggleTheme}
    >
      {(session ? session.user.theme : localTheme) === THEME.DARK ? (
        <IoSunny size={iconSize} className="text-icondark" />
      ) : (
        <IoMoon size={iconSize} className="text-iconlight" />
      )}
    </Button>
  );
};
