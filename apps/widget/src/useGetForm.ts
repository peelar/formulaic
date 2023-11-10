import React from "react";
import type { RJSFSchema } from "@rjsf/utils";
import { API_URL } from "./const";
import { ROOT_ID } from "./main";

// todo: parse with zod or
// todo: use a type from the api package
type FormResponse = {
  id: number;
  schema: {
    content: RJSFSchema;
    createdAt: string;
    updatedAt: string;
    formId: number;
    id: number;
  };
};

export function useGetForm() {
  const formId = document.getElementById(ROOT_ID)?.getAttribute("data-form-id");

  if (!formId) {
    throw new Error(
      "Missing form id. Make sure that your root element has a data-form-id attribute."
    );
  }

  const [form, setForm] = React.useState<FormResponse>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  async function fetchForm() {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/form/` + formId);
      const data = (await response.json()) as unknown as FormResponse;

      setIsLoading(false);
      setForm(data);
    } catch (e) {
      const nextError = e instanceof Error ? e : new Error("Unknown error");
      setError(nextError);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    fetchForm();
  }, []);

  return { data: form, isLoading, error };
}
