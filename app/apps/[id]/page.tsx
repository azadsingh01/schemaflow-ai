import DynamicRenderer from "@/components/renderer/DynamicRenderer";
import AppRenderer from "@/components/renderer/AppRenderer";
import { prisma } from "@/lib/prisma";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AppPage({ params }: Props) {
  const { id } = await params;
  const app = await prisma.app.findUnique({
  where: { id },
} 
);



 if (!app) {
  return <div>App not found</div>;
}

return (
  <main className="p-10">
    <h1 className="text-4xl font-bold">App Details</h1>

   <h2 className="mt-4 text-2xl">{app.name}</h2>

 <AppRenderer schema={app.schemaJson} />
  </main>
);
}