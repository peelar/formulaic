"use client";
import { Button } from "../../../@/components/ui/button";

export const SubmitButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <Button disabled={isPending} type="submit">
      {isPending ? "Loading..." : "Create"}
    </Button>
  );
};
