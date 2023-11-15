import { protectPage } from "../../src/lib/routing";
import { FormsTable } from "../../src/modules/form/ui/forms-table";

const FormsPage = async () => {
  await protectPage();

  return (
    <main>
      <FormsTable />
    </main>
  );
};

export default FormsPage;
