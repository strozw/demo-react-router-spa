import type { PropsWithChildren } from "react";
import { ApiProvider } from "./providers/api-provider";

export function AppShell({ children }: PropsWithChildren) {
  return <ApiProvider>{children}</ApiProvider>
}
