import React from "react";
import { FormCreator } from "../../src/modules/form/ui/form-creator";
import { Section } from "../../src/ui/section";
import { Metadata } from "next";
import { FormProvider } from "../../src/modules/form/ui/form-provider";
import { protectPage } from "../../src/lib/routing";
import { createForm } from "../../src/modules/form/form-actions";

export const metadata: Metadata = {
  title: "Create new form",
  description: "Create a new form",
};

const NewFormPage = async () => {
  await protectPage();

  return (
    <main>
      <Section>
        <div className="mt-24">
          <h3>
            Create your{" "}
            <span className="underline decoration-brand decoration-4">
              Formulaic
            </span>{" "}
            form
          </h3>
          <FormProvider>
            <FormCreator buttonText="Submit" onHandleSubmit={createForm} />
          </FormProvider>
        </div>
      </Section>
    </main>
  );
};

export default NewFormPage;
