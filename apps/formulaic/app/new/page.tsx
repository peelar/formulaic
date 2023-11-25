import { Metadata } from "next";
import { protectPage } from "../../src/lib/routing";
import { CreateForm } from "../../src/modules/form/ui/create-form";
import { FormProvider } from "../../src/modules/form/ui/form-provider";
import { Section } from "../../src/ui/section";

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
            <CreateForm />
          </FormProvider>
        </div>
      </Section>
    </main>
  );
};

export default NewFormPage;
