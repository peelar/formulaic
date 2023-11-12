import React from "react";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { FormsTable } from "../../src/modules/form/ui/forms-table";

async function protectPage() {
  const session = await auth();
  console.log(session);

  if (session?.user === undefined) {
    redirect("/");
  }
}

const FormsPage = async () => {
  await protectPage();

  return (
    <main>
      <FormsTable />
    </main>
  );
};

export default FormsPage;
