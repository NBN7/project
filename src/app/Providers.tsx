"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
        <ProgressBar
          height="2px"
          color="#19cfff"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </QueryClientProvider>
    </SessionProvider>
  );
};
