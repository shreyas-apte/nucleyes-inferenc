import { redirect } from "next/navigation";

import { auth } from "./auth";
import DefaultDashboard from "./default-dashboard";

export default async function Home() {
  const session = await auth();
  console.log({ session });

  if (!session) {
    redirect("/login");
  }

  return <DefaultDashboard />;
}
