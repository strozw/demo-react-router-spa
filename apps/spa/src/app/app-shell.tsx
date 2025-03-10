import { ApiProvider } from "@/shared/api/api-provider";
import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return <ApiProvider>{children}</ApiProvider>;
}
