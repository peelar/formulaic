"use client";

import { z } from "zod";
import { useStateUrl } from "../../../lib/hooks/useStateUrl";

const schemaIdStateSchema = z.object({
  schemaId: z.string().optional(),
});

export const useSchemaId = () => {
  return useStateUrl(schemaIdStateSchema, { schemaId: undefined });
};
