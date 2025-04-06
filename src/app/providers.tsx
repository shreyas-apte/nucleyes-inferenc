// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";
import { Provider as JotaiProvider } from "jotai";

export function Providers({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  return (
    <JotaiProvider>
      <HeroUIProvider>
        <main className="dark text-foreground bg-background">{children}</main>
      </HeroUIProvider>
    </JotaiProvider>
  );
}
