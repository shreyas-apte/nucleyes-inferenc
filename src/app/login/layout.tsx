"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) router.replace("/");
  }, [session, router]);

  return session ? null : (
    <div className="h-full w-full relative overflow-hidden">
      <Image
        alt="gradient"
        src="/assets/login-gradient.png"
        width={1000}
        height={600}
        className="w-4/5 md:w-1/2 fixed bottom-8 animate-intro left-16 blur-[12px] rounded-full saturate-[1.3] overflow-auto object-contain"
        priority
      />
      <div className="w-full h-full z-10 relative">{children}</div>
    </div>
  );
}
