import { db } from "./db";

async function queryUsers() {
  const allUsers = await db.user.findMany();

  console.log(allUsers);
}

export default function Page(): JSX.Element {
  queryUsers();
  return (
    <main>
      <h1>Formulaic</h1>
    </main>
  );
}
