"use client";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  "use client";
  const status = useFormStatus();

  return (
    <button disabled={status.pending} type="submit">
      {status.pending ? "Loading..." : "Create"}
    </button>
  );
};
