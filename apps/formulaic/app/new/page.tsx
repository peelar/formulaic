import React from "react";
import { FormCreator } from "../../src/modules/form/ui/form-creator";
import { Section } from "../../src/ui/section";

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
