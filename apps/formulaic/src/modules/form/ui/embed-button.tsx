"use client";

import { Button } from "../../../@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../@/components/ui/popover";
import { CopyIcon } from "@radix-ui/react-icons";
import { getForm } from "../../../../app/form/[id]/page";
import { env } from "../../../../env.mjs";

const EmbedSnippet = ({ formId }: { formId: string }) => {
  const snippetText = `
  <div data-form-id="${formId}" id="formulaic-widget"></div><script crossorigin src="${env.NEXT_PUBLIC_EMBED_SCRIPT_URL}">
  `;

  return (
    <div className="flex flex-col">
      <ol className="my-4 flex flex-col gap-4">
        <li>
          <p>1. Copy the snippet below</p>
          <div className="flex max-w-[480px] ml-2 mt-2">
            <div className="bg-stone-100 wrap" contentEditable>
              {snippetText}
            </div>
          </div>
        </li>
        <li>2. Paste the snippet into your website</li>
      </ol>
    </div>
  );
};

export const EmbedButton = ({
  form,
}: {
  form: Awaited<ReturnType<typeof getForm>>;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CopyIcon className="mr-2" />
          Embed
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <EmbedSnippet formId={form.id} />
      </PopoverContent>
    </Popover>
  );
};
