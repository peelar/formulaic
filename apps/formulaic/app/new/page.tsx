import React from "react";
import { FormCreator } from "../../src/modules/form/ui/form-creator";
import { Section } from "../../src/ui/section";
import { Metadata } from "next";
import { SchemaProvider } from "../../src/modules/form/ui/schema-provider";
import { protectPage } from "../../src/lib/routing";

export const metadata: Metadata = {
  title: "Create new form",
  description: "Create a new form",
};

const NewFormPage = async () => {
  await protectPage();

  return (
    <main>
      <Section>
        <SchemaProvider>
          <FormCreator />
        </SchemaProvider>
      </Section>
    </main>
  );
};

export default NewFormPage;
