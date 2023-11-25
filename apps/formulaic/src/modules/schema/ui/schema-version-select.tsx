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
import {
  SchemaActionsResponse,
  getFormSchemaVersions,
} from "../schema-actions";
import { date } from "../../../lib/date";
import { atom, useAtom } from "jotai";

export const schemaIdAtom = atom<string | undefined>(undefined);

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
  const [schemaId, setSchemaId] = useAtom(schemaIdAtom);
  const [isLoading, setIsLoading] = React.useState(false);

  async function fetchSchemaVersions() {
    setIsLoading(true);
    const schemaVersions = await getFormSchemaVersions({ formId });
    const nextOptions = schemaVersionsToOptions(schemaVersions);

    setOptions(nextOptions);
    setSchemaId(nextOptions[0].id);
    setIsLoading(false);
  }

  React.useEffect(() => {
    fetchSchemaVersions();
  }, []);

  return (
    <Select
      disabled={isLoading}
      onValueChange={(value) => setSchemaId(value)}
      value={schemaId}
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
