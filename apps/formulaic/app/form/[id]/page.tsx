import { Metadata } from "next";
import { updateForm } from "../../../src/modules/form/form-actions";
import { FormInput } from "../../../src/modules/form/form-service";
// import { EmbedButton } from "../../../src/modules/form/ui/embed-button";
import { Separator } from "../../../src/@/components/ui/separator";
import { EmbedButton } from "../../../src/modules/form/ui/embed-button";
import { FormCreator } from "../../../src/modules/form/ui/form-creator";
import { SchemaProvider } from "../../../src/modules/form/ui/schema-provider";
import { Submissions } from "../../../src/modules/form/ui/submissions";
import { getUserFormService } from "../../../src/modules/form/utils";
import { Section } from "../../../src/ui/section";

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

function convertFormToFormInput(
  form: Awaited<ReturnType<typeof getForm>>
): FormInput {
  return {
    name: form.name,
    // todo: map form.schema to schemaContent
    schemaContent: {} as Record<string, any>,
    // todo: think about array of domains
    domain: "",
  };
}

export default async function FormPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const form = await getForm(params.id);
  const defaultValues = convertFormToFormInput(form);

  return (
    <main>
      <Section>
        <header className="flex justify-between items-center">
          <h2 className="text-stone-800 capitalize border-0">{form.name}</h2>
          <EmbedButton form={form} />
        </header>
        <Separator className="my-4" orientation="horizontal" />
      </Section>
      <Section title="Form fields">
        <SchemaProvider>
          <FormCreator
            defaultValues={defaultValues}
            onHandleSubmit={async (input) => {
              "use server";

              return updateForm(id, input);
            }}
          />
        </SchemaProvider>
      </Section>

      <Section title="Submissions">
        <div className="max-w-2xl w-full">
          <Submissions submissions={form.schema?.submissions ?? []} />
        </div>
      </Section>
    </main>
  );
}
