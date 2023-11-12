import { FormRepository } from "../../../src/modules/form/form-repository";
import { FormService } from "../../../src/modules/form/form-service";
import { EmbedSnippet } from "../../../src/modules/form/ui/embed-snippet";

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
        <h2 className="text-stone-800 capitalize">{form.name}</h2>
        <div className="mt-8">
          <EmbedSnippet formId={form.id} />
        </div>
      </header>
    </main>
  );
}
