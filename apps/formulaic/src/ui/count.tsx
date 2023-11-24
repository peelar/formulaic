"use client";

import React from "react";
import { cn } from "../@/lib/utils";

type CountProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & { count: number };

export const Count = ({ count, className, ...props }: CountProps) => {
  return (
    <span
      {...props}
      className={cn(
        className,
        "ml-2 w-6 h-6 border rounded-sm flex items-center justify-center"
      )}
    >
      {count}
    </span>
  );
};
