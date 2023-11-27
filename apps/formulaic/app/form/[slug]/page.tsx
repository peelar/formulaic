import { Metadata } from "next";
import { getForm } from "../../../src/modules/form/form-actions";
import { FormInput } from "../../../src/modules/form/form-input.schema";
import { buildFieldsFromJsonSchema } from "../../../src/modules/form/json-schema-to-fields";
import { FormProvider } from "../../../src/modules/form/ui/form-provider";
import { UpdateForm } from "../../../src/modules/form/ui/update-form";
import { Section } from "../../../src/ui/section";
import { FormActionsResponse } from "../../../src/modules/form/form-actions";

type Form = FormActionsResponse.GetForm;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const form = await getForm({ slug });
  return {
    title: `Editing ${form.name}`,
    description: `Editing ${form.name}`,
  };
}

function getDefaultValues(form: Form): FormInput.FullSchema {
  return {
    name: form.name,
    schemaContent: (form.schema?.content ?? {}) as Record<string, any>,
    urls: form.domainAllowList,
    theme: form.theme,
  };
}

export default async function FormPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const form = await getForm({ slug });
  const defaultValues = getDefaultValues(form);
  const fields = buildFieldsFromJsonSchema(defaultValues.schemaContent);

  return (
    <main>
      <Section title="Form">
        <FormProvider defaultValues={fields}>
          <UpdateForm defaultValues={defaultValues} />
        </FormProvider>
      </Section>
    </main>
  );
}
