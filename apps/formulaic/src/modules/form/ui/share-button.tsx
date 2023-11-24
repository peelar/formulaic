"use client";

import { Share1Icon } from "@radix-ui/react-icons";
import { env } from "../../../../env.mjs";
import { Button } from "../../../@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../@/components/ui/popover";
import { getForm } from "../form-actions";

const EmbedSnippet = ({ formId }: { formId: string }) => {
  const snippetText = `
  <div data-form-id="${formId}" id="formulaic-widget"></div><script crossorigin src="${env.NEXT_PUBLIC_EMBED_SCRIPT_URL}">
  `;

  return (
    <div className="flex flex-col">
      <ol className="my-2 flex flex-col gap-4">
        <li>
          <p>
            <b>1.</b> Copy the snippet below
          </p>
          <div className="flex max-w-[480px] ml-2 mt-2">
            <div className="bg-stone-100 wrap" contentEditable>
              {snippetText}
            </div>
          </div>
        </li>
        <li>
          <b>2.</b> Paste the snippet into your website
        </li>
      </ol>
    </div>
  );
};

export const ShareButton = ({
  form,
}: {
  form: Awaited<ReturnType<typeof getForm>>;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button icon={<Share1Icon />} variant="brand">
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <EmbedSnippet formId={form.id} />
      </PopoverContent>
    </Popover>
  );
};
