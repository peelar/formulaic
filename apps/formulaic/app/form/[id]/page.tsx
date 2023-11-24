import { Metadata } from "next";
import { getForm, updateForm } from "../../../src/modules/form/form-actions";
import { FormInput } from "../../../src/modules/form/form-input.schema";
import { buildFieldsFromJsonSchema } from "../../../src/modules/form/json-schema-to-fields";
import { FormCreator } from "../../../src/modules/form/ui/form-creator";
import { FormProvider } from "../../../src/modules/form/ui/form-provider";
import { getUserFormService } from "../../../src/modules/form/utils";
import { Section } from "../../../src/ui/section";

type Form = Awaited<ReturnType<typeof getForm>>;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // read route params
  const id = params.id;

  const formService = await getUserFormService();
  const form = await formService.getById({ id });

  return {
    title: `Editing ${form.name}`,
    description: `Editing ${form.name}`,
  };
}

function getDefaultValues(form: Form): FormInput.Schema {
  return {
    name: form.name,
    schemaContent: (form.schema?.content ?? {}) as Record<string, any>,
    urls: form.domainAllowList,
    theme: form.theme,
  };
}

export default async function FormPage({ params }: { params: { id: string } }) {
  const form = await getForm(params.id);
  const defaultValues = getDefaultValues(form);
  const fields = buildFieldsFromJsonSchema(defaultValues.schemaContent);

  return (
    <main>
      <Section title="Form">
        <FormProvider defaultValues={fields}>
          <FormCreator
            buttonText="Update"
            defaultValues={defaultValues}
            onHandleSubmit={async (input) => {
              "use server";

              return updateForm(form.id, input);
            }}
          />
        </FormProvider>
      </Section>
    </main>
  );
}
