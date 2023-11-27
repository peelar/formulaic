"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../@/components/ui/tabs";
import { Count } from "../../../ui/count";
import { Section } from "../../../ui/section";
import { FormActionsResponse } from "../form-actions";

export const FormPageTabs = ({
  form,
}: {
  form: FormActionsResponse.GetForm;
}) => {
  const noOfSubmissions = form?.schema?.submissions?.length ?? 0;
  const [tabValue, setTabValue] = React.useState<"form" | "submissions">(
    "form"
  );

  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname.includes("submissions")) {
      setTabValue("submissions");
    } else {
      setTabValue("form");
    }
  }, [pathname]);

  return (
    <Section>
      <Tabs value={tabValue}>
        <TabsList>
          <TabsTrigger asChild value="form">
            <Link href={`/${form.slug}`}>Form</Link>
          </TabsTrigger>
          <TabsTrigger asChild value="submissions">
            <Link href={`/${form.slug}/submissions`}>
              Submissions
              <Count className="bg-secondary/10" count={noOfSubmissions} />
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Section>
  );
};
