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
import { useSchemaVersion } from "./useSchemaVersion";

const schemaVersionsToOptions = (
  schemaVersions: SchemaActionsResponse.GetFormSchemaVersions
) => {
  return schemaVersions.map((schemaVersion) => ({
    id: schemaVersion.id,
    version: schemaVersion.version,
    date: date.toShortDateRel(schemaVersion.createdAt),
  }));
};

type SelectOption = ReturnType<typeof schemaVersionsToOptions>[0];

export const SchemaVersionSelect = ({ formId }: { formId: string }) => {
  const [options, setOptions] = React.useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { state, push } = useSchemaVersion();

  function updateSchemaVersion(schemaVersion: number) {
    push({ version: String(schemaVersion) });
  }

  async function fetchSchemaVersions() {
    setIsLoading(true);
    const schemaVersions = await getFormSchemaVersions({ formId });
    const nextOptions = schemaVersionsToOptions(schemaVersions);

    const nextSchemaVersion = nextOptions[0].version;

    if (nextSchemaVersion) {
      updateSchemaVersion(nextSchemaVersion);
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
      onValueChange={(value) => updateSchemaVersion(Number(value))}
      value={String(state.version)}
    >
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Select schema version" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <span key={option.id}>
              <SelectLabel className="text-stone-400 font-normal">
                Created {option.date}
              </SelectLabel>
              <SelectItem value={String(option.version)}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Version {option.version}</span>
                </div>
              </SelectItem>
            </span>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
