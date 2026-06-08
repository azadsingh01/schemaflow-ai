import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";


export default async function SubmissionsPage() {
  const submissions = await prisma.submission.findMany({
    include: {
      app: true,
    },
  });

 


  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Submissions
      </h1>

       <div className="mb-6 p-4 border rounded">
  <h2 className="text-xl font-bold">
    Total Submissions: {submissions.length}
  </h2>
</div>

     <div className="overflow-x-auto">
  <table className="w-full border">
    <thead>
      <tr className="border-b">
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3 text-left">Date</th>
       
      </tr>
    </thead>

    <tbody>
      {submissions.map((submission) => (
        <tr key={submission.id} className="border-b">
          <td className="p-3">
            {(submission.data as any).Name}
          </td>

          <td className="p-3">
            {(submission.data as any).Email}
          </td>
            
             <td className="p-3">
  {new Date(submission.createdAt).toLocaleDateString()}
</td>

        </tr>
      ))}
    </tbody>
  </table>
</div>
    </main>
  );
}