import { SchemaVersionSelect } from "../../schema/ui/schema-version-select";
import { SubmissionsTable } from "./submissions-table";

export const Submissions = ({ formId }: { formId: string }) => {
  return (
    <div>
      <div className="my-6 flex">
        <SchemaVersionSelect formId={formId} />
      </div>
      <SubmissionsTable />
    </div>
  );
};
