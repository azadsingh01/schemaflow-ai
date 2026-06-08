export function validateField(field: any) {
  const errors: string[] = [];

  if (!field.type) {
    errors.push("Field type is required");
  }

  if (
    (field.type === "text" || field.type === "email") &&
    !field.label
  ) {
    errors.push(`${field.type} field requires a label`);
  }

  if (
  field.type === "select" &&
  (!field.options || field.options.length === 0)
) {
  errors.push("Select field requires options");
}
  return errors;
}

export function validateSchema(schema: any) {
  const errors: string[] = [];

  if (!schema.fields || !Array.isArray(schema.fields)) {
    errors.push("Schema must contain a fields array");
    return errors;
  }

  schema.fields.forEach((field: any, index: number) => {
    const repairedField = repairField(field);

const fieldErrors = validateField(repairedField);

    fieldErrors.forEach((error) => {
      errors.push(`Field ${index + 1}: ${error}`);
    });
  });

  return errors;
}

export function repairField(field: any) {
  const typeMap: Record<string, string> = {
    txt: "text",
    textbox: "text",
    emial: "email",
    mail: "email",
    chekbox: "checkbox",
    check: "checkbox",
    dropdown: "select",
  };

  if (field.type && typeMap[field.type]) {
    field.type = typeMap[field.type];
  }

  return field;
}