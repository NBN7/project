"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <NextUIProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ProgressBar
            height="2px"
            color="#19cfff"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </QueryClientProvider>
      </SessionProvider>
    </NextUIProvider>
  );
};
