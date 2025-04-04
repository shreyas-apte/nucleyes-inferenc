// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider as JotaiProvider } from "jotai";

export function Providers({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider {...rest}>
      <JotaiProvider>
        <NextUIProvider>
          <main className="dark text-foreground bg-background">{children}</main>
        </NextUIProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}
