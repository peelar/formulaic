import React from "react";
import { API_URL } from "./const";

// todo: parse with zod or
// todo: use a type from the api package
type SubmitResponse = {
  id: number;
};

type UseSubmitFormValues = [
  (body: { content: string; formId: number }) => Promise<void>,
  {
    data: SubmitResponse | undefined;
    isLoading: boolean;
    error: Error | null;
  },
];

export function useSubmitForm(): UseSubmitFormValues {
  const [submission, setSubmission] = React.useState<SubmitResponse>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function submitForm(body: { content: any; formId: number }) {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/submission`, {
        method: "POST",
        body: JSON.stringify({
          content: body.content,
          formId: body.formId,
        }),
      });
      const data = (await response.json()) as unknown as SubmitResponse;

      setIsLoading(false);
      setSubmission(data);
    } catch (e) {
      const nextError = e instanceof Error ? e : new Error("Unknown error");
      setError(nextError);
      setIsLoading(false);
    }
  }

  return [submitForm, { data: submission, isLoading, error }];
}
