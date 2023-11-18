import { Session } from "next-auth/types";
import { auth, getUser } from "../../../auth";
import { FormRepository } from "../../../src/modules/form/form-repository";
import { FormService } from "../../../src/modules/form/form-service";
import { EmbedSnippet } from "../../../src/modules/form/ui/embed-snippet";
import { Section } from "../../../src/ui/section";

async function getForm(id: string) {
  const repository = new FormRepository();
  const user = await getUser();

  const formService = new FormService({ repository, user });
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
