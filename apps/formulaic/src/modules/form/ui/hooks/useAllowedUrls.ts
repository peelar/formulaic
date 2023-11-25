"use client";

import React from "react";

export const useAllowedUrls = (defaultValues: string[] = []) => {
  const [urls, setUrls] = React.useState<string[]>(defaultValues);
  const [urlValue, setUrlValue] = React.useState("");

  const deleteUrl = (url: string) => {
    setUrls(urls.filter((u) => u !== url));
  };

  const addUrl = () => {
    setUrls([...urls, urlValue]);
    setUrlValue("");
  };

  return { urls, deleteUrl, addUrl, urlValue, setUrlValue };
};

export type UseAllowedUrlsValues = ReturnType<typeof useAllowedUrls>;
