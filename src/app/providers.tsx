// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
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
        <HeroUIProvider>
          <main className="dark text-foreground bg-background">{children}</main>
        </HeroUIProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}
