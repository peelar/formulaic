"use client";

import { z } from "zod";
import { useStateUrl } from "../../../lib/hooks/useStateUrl";

const schemaVersionStateSchema = z.object({
  version: z.string(),
});

type SchemaVersionState = z.infer<typeof schemaVersionStateSchema>;

const defaultState: SchemaVersionState = {
  version: "",
};

export const useSchemaVersion = () => {
  return useStateUrl(schemaVersionStateSchema, defaultState);
};
