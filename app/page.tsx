"use client";

import { useState } from "react";
import Link from "next/link";

import DynamicRenderer from "@/components/renderer/DynamicRenderer";
import JsonEditor from "@/components/builder/JsonEditor";

const initialSchema = {
  fields: [
    {
      type: "text",
      label: "Name",
      placeholder: "Enter your name",
    },

    {
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
    },

    {
      type: "select",
      label: "City",
      options: ["Bhopal", "Indore", "Delhi"],
    },
    {
      type: "checkbox",
      label: "Accept Terms",
    },

    {
      type: "textarea",
      label: "Description",
      placeholder: "Enter description",
    },

    {
      type: "number",
      label: "Age",
      placeholder: "Enter your age",
    },
    {
      type: "date",
      label: "Birth Date",
    },

    {
      type: "submit",
      text: "Create App",
    },
  ],
};

export default function Home() {
  const [json, setJson] = useState(JSON.stringify(initialSchema, null, 2));
const [formData, setFormData] = useState<Record<string, unknown>>({});
  let parsedSchema;

  try {
    parsedSchema = JSON.parse(json);
  } catch {
    parsedSchema = {
      fields: [],
    };
  }

  const createApp = async () => {
  const res = await fetch("/api/apps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Test App",
      description: "Created from Builder",
      schema: parsedSchema,
      userId: "cmpwfof5i0000l05a19gqw7yp",
    }),
  });

  const data = await res.json();

console.log("API RESPONSE =>", data);
console.log("STATUS =>", res.status);

if (res.ok) {
  alert("App Created Successfully");
} else {
  alert("Failed To Create App");
}
};

  return (
    
    <main className="min-h-screen bg-black text-white p-10">

     <div className="flex gap-4 mb-6">
  <Link href="/login">
    <button>Login</button>
  </Link>

  <Link href="/register">
    <button>Register</button>
  </Link>

  <Link href="/dashboard">
  <button>Dashboard</button>
</Link>

<button onClick={createApp}>
  Create App
</button>
</div>

      <h1 className="text-4xl font-bold mb-10">SchemaFlow AI 🚀</h1>

      <div className="grid grid-cols-2 gap-10">
        <JsonEditor value={json} onChange={setJson} />

       <DynamicRenderer
  schema={parsedSchema}
  formData={formData}
  setFormData={setFormData}
/>
      </div>
    </main>
  );
}
