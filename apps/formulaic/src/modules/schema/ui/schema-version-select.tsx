"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { date } from "../../../lib/date";
import {
  SchemaActionsResponse,
  getFormSchemaVersions,
} from "../schema-actions";
import { useSchemaId } from "./useSchemaId";

const schemaVersionsToOptions = (
  schemaVersions: SchemaActionsResponse.GetFormSchemaVersions
) => {
  return schemaVersions.map((schemaVersion) => ({
    id: schemaVersion.id,
    name: String(schemaVersion.version),
    date: date.toShortDateRel(schemaVersion.createdAt),
  }));
};

type SelectOption = ReturnType<typeof schemaVersionsToOptions>[0];

export const SchemaVersionSelect = ({ formId }: { formId: string }) => {
  const [options, setOptions] = React.useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { state, push } = useSchemaId();

  function updateSchemaId(schemaId: string) {
    push({ schemaId });
  }

  async function fetchSchemaVersions() {
    setIsLoading(true);
    const schemaVersions = await getFormSchemaVersions({ formId });
    const nextOptions = schemaVersionsToOptions(schemaVersions);

    const nextSchemaId = nextOptions[0].id;

    if (state.schemaId === undefined && nextSchemaId) {
      updateSchemaId(nextSchemaId);
    }

    setOptions(nextOptions);
    setIsLoading(false);
  }

  React.useEffect(() => {
    fetchSchemaVersions();
  }, []);

  return (
    <Select
      disabled={isLoading}
      onValueChange={(value) => updateSchemaId(value)}
      value={state.schemaId}
    >
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Select schema version" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <>
              <SelectLabel className="text-stone-400 font-normal">
                Created today at {option.date}
              </SelectLabel>
              <SelectItem key={option.id} value={option.id}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Version {option.name}</span>
                </div>
              </SelectItem>
            </>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
