import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { Button } from "../../../@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";
import { date } from "../../../lib/date";
import { FormRepository } from "../form-repository";
import { FormService } from "../form-service";

export const FormsTable = async () => {
  const formRepository = new FormRepository();
  const formService = new FormService(formRepository);
  const session = await auth();
  const user = session?.user;

  const userEmail = user?.email;

  if (user === undefined) {
    redirect("/");
  }

  if (!userEmail) {
    throw new Error("User email is missing");
  }

  const forms = await formService.getAllMine({ userEmail });

  return (
    <section className="my-6">
      <h3 className="mb-2">Forms table</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Domains</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow>
              <TableCell className="break-all">
                <Link href={`/form/${form.id}`}>{form.id}</Link>
              </TableCell>
              <TableCell className="font-bold">{form.name}</TableCell>
              <TableCell>{form.domainAllowList.join(", ")}</TableCell>
              <TableCell>{form.schema?._count.submissions}</TableCell>
              <TableCell>{date.toLongDate(form.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {!forms.length && <TableCaption>No forms found</TableCaption>}
      </Table>
      <Link href="/new">
        <Button size="lg" className="w-full" variant={"ghost"}>
          <PlusIcon />
        </Button>
      </Link>
    </section>
  );
};
