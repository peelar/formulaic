import React from "react";
import { FormCreator } from "../../src/modules/form/ui/form-creator";
import { Section } from "../../src/ui/section";
import { Metadata } from "next";
import { SchemaProvider } from "../../src/modules/form/ui/schema-provider";
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
            <span className="underline decoration-violet-600 decoration-4">
              Formulaic
            </span>{" "}
            form
          </h3>
          <SchemaProvider>
            <FormCreator onHandleSubmit={createForm} />
          </SchemaProvider>
        </div>
      </Section>
    </main>
  );
};

export default NewFormPage;
