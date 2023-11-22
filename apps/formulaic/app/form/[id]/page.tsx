import { Metadata } from "next";
import { updateForm } from "../../../src/modules/form/form-actions";
import { Separator } from "../../../src/@/components/ui/separator";
import { ShareButton } from "../../../src/modules/form/ui/share-button";
import { FormCreator } from "../../../src/modules/form/ui/form-creator";
import { FormProvider } from "../../../src/modules/form/ui/form-provider";
import { Submissions } from "../../../src/modules/form/ui/submissions";
import { getUserFormService } from "../../../src/modules/form/utils";
import { Section } from "../../../src/ui/section";
import { buildFieldsFromJsonSchema } from "../../../src/modules/form/json-schema-to-fields";
import { FormInput } from "../../../src/modules/form/formCreateInputSchema";

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

export async function getForm(id: string) {
  const formService = await getUserFormService();
  return formService.getById({ id });
}

function getDefaultValues(
  form: Awaited<ReturnType<typeof getForm>>
): FormInput {
  return {
    name: form.name,
    schemaContent: (form.schema?.content ?? {}) as Record<string, any>,
    urls: form.domainAllowList,
    theme: form.theme,
  };
}

export default async function FormPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const form = await getForm(params.id);
  const defaultValues = getDefaultValues(form);
  const fields = buildFieldsFromJsonSchema(defaultValues.schemaContent);

  return (
    <main>
      <Section>
        <header className="flex justify-between items-center">
          <h2 className="text-stone-800 capitalize border-0">{form.name}</h2>
          <ShareButton form={form} />
        </header>
        <Separator className="my-4" orientation="horizontal" />
      </Section>
      <Section>
        <FormProvider defaultValues={fields}>
          <FormCreator
            buttonText="Update"
            defaultValues={defaultValues}
            onHandleSubmit={async (input) => {
              "use server";

              return updateForm(id, input);
            }}
          />
        </FormProvider>
      </Section>

      <Section title="Submissions">
        <div className="max-w-2xl w-full">
          <Submissions submissions={form.schema?.submissions ?? []} />
        </div>
      </Section>
    </main>
  );
}
