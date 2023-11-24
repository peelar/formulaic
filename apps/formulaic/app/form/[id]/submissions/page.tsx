import React from "react";
import { getForm } from "../../../../src/modules/form/form-actions";
import { Submissions } from "../../../../src/modules/form/ui/submissions";
import { Section } from "../../../../src/ui/section";

const SubmissionsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const form = await getForm(id);
  return (
    <Section title="Submissions">
      <div className="max-w-2xl w-full">
        <Submissions submissions={form.schema?.submissions ?? []} />
      </div>
    </Section>
  );
};

export default SubmissionsPage;
