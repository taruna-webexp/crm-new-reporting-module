import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientHome from "./ClientHome";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Dashboard from "./dashboard/page";
export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return <Dashboard />;
}
