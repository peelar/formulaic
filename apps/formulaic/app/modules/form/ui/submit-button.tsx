"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../../../../@/components/ui/button";

export const SubmitButton = () => {
  "use client";
  const status = useFormStatus();

  return (
    <Button disabled={status.pending} type="submit">
      {status.pending ? "Loading..." : "Create"}
    </Button>
  );
};
