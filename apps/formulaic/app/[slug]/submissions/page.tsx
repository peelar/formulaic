import { Submissions } from "../../../src/modules/submission/ui/submissions";
import { Section } from "../../../src/ui/section";

const SubmissionsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <Section title="Submissions">
      <div className="max-w-2xl w-full">
        <Submissions formId={id} />
      </div>
    </Section>
  );
};

export default SubmissionsPage;
