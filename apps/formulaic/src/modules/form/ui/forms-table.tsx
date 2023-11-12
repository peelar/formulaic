import { ArrowRightIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";
import { FormRepository } from "../form-repository";
import { FormService } from "../form-service";
import { date } from "../../../lib/date";
import Link from "next/link";
import { Button } from "../../../@/components/ui/button";

export const FormsTable = async () => {
  const formRepository = new FormRepository();
  const formService = new FormService(formRepository);
  const session = await auth();
  const user = session?.user;

  if (user === undefined) {
    redirect("/");
  }

  if (!user.email) {
    throw new Error("User email is missing");
  }

  const forms = await formService.getAllMine({ userEmail: user.email });

  return (
    <section className="my-6">
      <h4 className="mb-2">Forms table</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Domains</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow>
              <TableCell className="break-all">{form.id}</TableCell>
              <TableCell className="font-bold">{form.name}</TableCell>
              <TableCell>{form.domainAllowList.join(", ")}</TableCell>
              <TableCell>{form.schema?._count.submissions}</TableCell>
              <TableCell>{date.toLongDate(form.createdAt)}</TableCell>
              <TableCell>
                <Link href={`/form/${form.id}`}>
                  <Button variant={"ghost"} size="icon">
                    <ArrowRightIcon />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {!forms.length && <TableCaption>No forms found</TableCaption>}
      </Table>
    </section>
  );
};
