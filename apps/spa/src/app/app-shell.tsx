import { queryClient } from "@/shared/api";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
