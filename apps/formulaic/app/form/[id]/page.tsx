import { FormRepository } from "../../../src/modules/form/form-repository";
import { FormService } from "../../../src/modules/form/form-service";
import { EmbedSnippet } from "../../../src/modules/form/ui/embed-snippet";
import { Section } from "../../../src/ui/section";

async function getForm(id: string) {
  const formRepository = new FormRepository();
  const formService = new FormService(formRepository);

  return formService.getById({ id });
}

export default async function FormPage({ params }: { params: { id: string } }) {
  const form = await getForm(params.id);
  return (
    <main>
      <header>
        <Section>
          <h2 className="text-stone-800 capitalize">{form.name}</h2>
        </Section>
      </header>
      <Section>
        <EmbedSnippet formId={form.id} />
      </Section>
    </main>
  );
}
