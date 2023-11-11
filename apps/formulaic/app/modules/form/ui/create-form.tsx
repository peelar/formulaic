"use client";

import { GetFormResponse } from "../form-controller";
import { CreateFormArgs } from "../form-service";

export const CreateForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const schemaContent = formData.get("schemaContent") as string;
    const schema = JSON.parse(schemaContent);

    const body: CreateFormArgs = {
      schemaContent: schema,
    };

    const response = await fetch(`/api/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as unknown as GetFormResponse;

    console.log(data);
  };

  return (
    <section>
      <h2>Create a form</h2>
      <form onSubmit={handleSubmit}>
        <textarea name="schemaContent" />
        <button type="submit">Create</button>
      </form>
    </section>
  );
};
