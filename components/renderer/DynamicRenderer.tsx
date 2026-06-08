"use client";

import TextField from "../forms/TextField";
import EmailField from "../forms/EmailField";
import SubmitButton from "../forms/SubmitButton";
import UnknownComponent from "./UnknownComponent";
import { validateField } from "@/lib/validator";
import ErrorState from "@/components/states/ErrorState";
import SelectField from "../forms/SelectField";
import CheckboxField from "../forms/CheckboxField";
import React from "react";

type Field = {
  type: string;
  label?: string;
  placeholder?: string;
  text?: string;
  options?: string[];
};

type Props = {
  schema: {
    fields: Field[];
  };
  formData: Record<string, unknown>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
};

export default function DynamicRenderer({
  schema,
  formData,
  setFormData,
}: Props) {
  return (
    <div className="space-y-6">
      {schema.fields?.map((field, index) => {
        const errors = validateField(field);

        if (errors.length > 0) {
          return <ErrorState key={index} errors={errors} />;
        }

        switch (field.type) {
          case "date":
            return (
              <div key={index}>
                <label>{field.label}</label>
                <input type="date" className="w-full border p-2 rounded" />
              </div>
            );
          case "number":
            return (
              <div key={index}>
                <label>{field.label}</label>
                <input
                  type="number"
                  placeholder={field.placeholder}
                  className="w-full border p-2 rounded"
                />
              </div>
            );
          case "textarea":
            return (
              <div key={index}>
                <label>{field.label}</label>
                <textarea
                  placeholder={field.placeholder}
                  className="w-full border p-2 rounded"
                />
              </div>
            );

          case "select":
            return (
              <SelectField
                key={index}
                label={field.label || ""}
                options={field.options || []}
              />
            );

          case "checkbox":
            return <CheckboxField key={index} label={field.label || ""} />;

          case "text":
            return (
              <TextField
                key={index}
                label={field.label || ""}
                placeholder={field.placeholder}
                value={String(formData[field.label || ""] || "")}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.label || ""]: value,
                  }))
                }
              />
            );

          case "email":
            return (
              <EmailField
                key={index}
                label={field.label || ""}
                placeholder={field.placeholder}
                value={String(formData[field.label || ""] || "")}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.label || ""]: value,
                  }))
                }
              />
            );

          case "submit":
            return (
              <SubmitButton
                key={index}
                text={field.text || "Submit"}
                onClick={async () => {
                  const response = await fetch("/api/submissions", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  });

                  const data = await response.json();

                  console.log(data);
                  alert("Form created successfully!");
                }}
              />
            );

          default:
            return <UnknownComponent key={index} type={field.type} />;
        }
      })}
    </div>
  );
}
