import { ApiProvider } from "@/shared/api";
import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return <ApiProvider>{children}</ApiProvider>;
}
