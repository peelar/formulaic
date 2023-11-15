import { redirect } from "next/navigation";
import { auth } from "../../auth";

export async function protectPage(fallbackUrl = "/") {
  const session = await auth();

  if (session?.user === undefined) {
    redirect(fallbackUrl);
  }
}
