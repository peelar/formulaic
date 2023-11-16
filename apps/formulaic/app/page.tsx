import { auth } from "../auth";
import { FormsTable } from "../src/modules/form/ui/forms-table";
import { Section } from "../src/ui/section";

const LoggedInHomePageContent = () => {
  return (
    <Section>
      <FormsTable />
    </Section>
  );
};

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="flex flex-col items-center my-[10vh]">
      {user && <LoggedInHomePageContent />}
      {!user && <p>Please log in</p>}
    </main>
  );
}
