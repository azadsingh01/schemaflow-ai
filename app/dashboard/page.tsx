
import Link from "next/link";
import { prisma } from "@/lib/prisma";
 import { getServerSession } from "next-auth";
 import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

import LogoutButton from "../components/LogoutButton";

export default async function Dashboard() {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const apps = await prisma.app.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("APPS =>", apps);

  return (
 <main className="max-w-5xl mx-auto p-8">
   <h1 className="text-4xl font-bold mb-8">
  SchemaFlow AI 🚀
</h1>
    <Link
      href="/submissions"
      className="bg-black text-white px-4 py-2 rounded-lg inline-block mb-6"
    >
      View Submissions
    </Link>
   
    {apps.map((app: any) => (
        <Card
  key={app.id}
  className="mb-4 hover:shadow-lg transition"
>
  <CardContent className="p-4">
 

         <Link
  href={`/apps/${app.id}`}
  className="block"
>
  <h2 className="text-xl font-bold">
    {app.name}
  </h2>
</Link>
          <p>{app.description}</p>

         </CardContent>
</Card>
      ))}

    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
  Logout
</button>
    </main>
  );
}

