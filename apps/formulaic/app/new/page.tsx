import React from "react";
import { FormCreator } from "../../src/modules/form/ui/form-creator";
import { Section } from "../../src/ui/section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create new form",
  description: "Create a new form",
};

const NewFormPage = () => {
  return (
    <main>
      <Section>
        <FormCreator />
      </Section>
    </main>
  );
};

export default NewFormPage;
