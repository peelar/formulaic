"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

export const useStateUrl = <T extends z.ZodType<Record<string, string>>>(
  schema: T,
  defaultState?: z.infer<T>
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = convertUrlIntoState() ?? defaultState ?? {};

  function parseState(state: z.infer<T>) {
    return schema.safeParse(state);
  }

  function convertStateIntoQuery(state: z.infer<T>) {
    const result = parseState(state);

    if (!result.success) {
      console.log("Failed to parse state from URL", result.error);
      return undefined;
    }

    const query = new URLSearchParams(result.data);
    return query.toString();
  }

  function convertSearchParamsIntoObject() {
    const params = Object.fromEntries(searchParams);
    return params;
  }

  function convertUrlIntoState() {
    const objectParams = convertSearchParamsIntoObject();
    const result = schema.safeParse(objectParams);

    if (!result.success) {
      console.log("Failed to parse state from URL", result.error);
      return undefined;
    }

    return result.data;
  }

  function synchronizeStateWithUrl(state: z.infer<T>) {
    const query = convertStateIntoQuery(state);

    if (query) {
      router.push(`?${query}`, { shallow: true });
    }
  }

  function push(update: Partial<z.infer<T>>) {
    const currentState = convertUrlIntoState();
    const nextState = { ...currentState, ...update };
    synchronizeStateWithUrl(nextState);
  }

  function remove({ key }: { key: keyof z.infer<T> }) {
    const currentState = convertUrlIntoState();
    const nextState = { ...currentState };
    delete nextState[key as string];
    synchronizeStateWithUrl(nextState);
  }

  function reset() {
    router.push("", { shallow: true });
  }

  return {
    state,
    push,
    remove,
    reset,
  };
};
