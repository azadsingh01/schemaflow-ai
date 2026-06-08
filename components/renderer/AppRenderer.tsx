"use client";

import { useState } from "react";
import DynamicRenderer from "./DynamicRenderer";

export default function AppRenderer({
  schema,
}: {
  schema: any;
}) {
  const [formData, setFormData] = useState({});

  return (
    <DynamicRenderer
      schema={schema}
      formData={formData}
      setFormData={setFormData}
    />
  );
}