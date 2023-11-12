"use client";

import React from "react";
import { env } from "../../../../env.mjs";

export const EmbedSnippet = ({ formId }: { formId: string }) => {
  const snippetText = `
  <div data-form-id="${formId}" id="formulaic-widget"></div><script crossorigin src="${env.NEXT_PUBLIC_EMBED_SCRIPT_URL}">
  `;

  return (
    <section className="flex flex-col">
      <h3>Embed</h3>
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
    </section>
  );
};
