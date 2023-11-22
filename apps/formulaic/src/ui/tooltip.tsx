"use client";
import React from "react";
import {
  Tooltip as _Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../@/components/ui/tooltip";

export const Tooltip = ({
  children,
  tooltipContent,
}: {
  children: React.ReactNode;
  tooltipContent: React.ReactNode;
}) => {
  return (
    <TooltipProvider>
      <_Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </_Tooltip>
    </TooltipProvider>
  );
};
