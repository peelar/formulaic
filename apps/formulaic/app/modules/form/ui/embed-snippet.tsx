"use client";

import React from "react";

async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

export const EmbedSnippet = ({ formId }: { formId: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const snippetText = `
  <div data-form-id="${formId}" id="formulaic-widget"></div><script crossorigin src="https://widget-ruddy.vercel.app/embed.js">
  `;

  function handleClick() {
    copyTextToClipboard(snippetText);
    setIsCopied(true);
  }

  return (
    <section>
      <p>Paste this snippet on your website</p>
      <pre>{snippetText}</pre>
      <div>
        <button onClick={handleClick}>{isCopied ? "Copied ✅" : "Copy"}</button>
      </div>
    </section>
  );
};
