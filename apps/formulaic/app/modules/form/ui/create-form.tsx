"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createForm } from "../form-actions";

export const CreateForm = () => {
  const [state, formAction] = useFormState(createForm, { message: null });
  const status = useFormStatus();

  return (
    <section>
      <h2>Create a form</h2>
      <form action={formAction}>
        <textarea name="schemaContent" />
        <button disabled={status.pending} type="submit">
          {status.pending ? "Loading..." : "Create"}
        </button>
        {state.message && <p>{state.message}</p>}
      </form>
    </section>
  );
};
