"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

export const useStateUrl = <
  TState extends Record<string, string>,
  TSchema extends z.ZodType<TState>,
>(
  schema: TSchema,
  defaultState: TState
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = convertUrlIntoState() ?? defaultState;

  function parseState(state: TState) {
    return schema.safeParse(state);
  }

  function convertStateIntoQuery(state: TState) {
    const result = parseState(state);

    if (!result.success) {
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
      return undefined;
    }

    return result.data;
  }

  function synchronizeStateWithUrl(state: TState) {
    const query = convertStateIntoQuery(state);

    if (query) {
      router.push(`?${query}`, { shallow: true });
    }
  }

  function push(update: Partial<TState>) {
    const currentState = convertUrlIntoState();
    const nextState = { ...defaultState, ...currentState, ...update };
    synchronizeStateWithUrl(nextState);
  }

  function remove({ key }: { key: keyof TState }) {
    const currentState = convertUrlIntoState();
    const nextState = { ...defaultState, ...currentState };
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
