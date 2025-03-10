import type { PropsWithChildren } from "react";

export function BooksPageLayout({ children }: PropsWithChildren) {
  return <div className="px-4 py-4">{children}</div>;
}
