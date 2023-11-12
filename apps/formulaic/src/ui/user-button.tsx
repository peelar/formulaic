import { Button } from "../@/components/ui/button";
import { auth, signIn, signOut } from "../../auth";
import { redirect } from "next/navigation";

function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        const url = await signIn(provider, { redirect: false });
        redirect(url.replace("signin", "api/auth/signin"));
      }}
    >
      <Button variant={"ghost"}>Sign In</Button>
    </form>
  );
}
function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>Sign Out</button>
    </form>
  );
}
export const UserButton = async () => {
  const session = await auth();
  if (!session?.user) return <SignIn />;

  return (
    <div>
      <span>{session.user.name}</span>
      <SignOut />
    </div>
  );
};
