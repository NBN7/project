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
            color="#0070F0"
            height="2px"
            options={{
              showSpinner: false,
            }}
          />
        </QueryClientProvider>
      </SessionProvider>
    </NextUIProvider>
  );
};
