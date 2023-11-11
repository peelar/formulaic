"use client";

import { useFormState } from "react-dom";
import { createForm } from "../form-actions";
import { SubmitButton } from "./submit-button";
import { EmbedSnippet } from "./embed-snippet";

export const CreateForm = () => {
  const [state, formAction] = useFormState(createForm, { id: null });

  return (
    <section>
      <h2>Create a form</h2>
      <form action={formAction}>
        <textarea name="schemaContent" />
        <div>
          <SubmitButton />
        </div>
      </form>
      {state.id && <EmbedSnippet formId={state.id} />}
    </section>
  );
};
