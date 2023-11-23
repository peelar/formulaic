"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { Theme } from "@prisma/client";

const themeToLabelMap: Record<Theme, string> = {
  ANTD: "Ant Design",
  CHAKRA: "Chakra UI",
  MUI: "Material UI v5",
  SEMANTIC: "Semantic UI",
};

const options = Object.entries(Theme).map(([key, value]) => ({
  id: key,
  name: value,
}));

export const FormThemeSelect = ({ defaultValue }: { defaultValue?: Theme }) => {
  return (
    <Select required defaultValue={defaultValue} name="theme">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {themeToLabelMap[option.name as Theme]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
