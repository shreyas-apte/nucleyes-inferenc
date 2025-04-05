import { Inter } from "next/font/google";

import { Providers } from "./providers";
import Navbar from "./components/navbar";
import InitGlobalAppPopUps from "./app-popups";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: "INFERENC",
    template: `%s - INFERENC`,
  },
  description: "A RAG-based AI Chat Application built with Next.js and Vercel.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <Providers>
          <InitGlobalAppPopUps />
          <main className="min-h-screen bg-background-secondary flex flex-col">
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
