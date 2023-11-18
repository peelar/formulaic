import Link from "next/link";
import { getUser } from "../../../../auth";
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
  const repository = new FormRepository();
  const user = await getUser();
  const formService = new FormService({ repository, user });

  const forms = await formService.getAllMine();

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
      <div className="flex justify-end mt-2">
        <Link href="/new">
          <Button>Add new</Button>
        </Link>
      </div>
    </section>
  );
};
