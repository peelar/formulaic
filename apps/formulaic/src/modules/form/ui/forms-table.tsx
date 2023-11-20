import Link from "next/link";
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
import { getUserFormService } from "../utils";
import { DeleteFormAlert } from "./delete-form-alert";

export const FormsTable = async () => {
  const formService = await getUserFormService();
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
            <TableHead>Actions</TableHead>
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
              <TableCell>
                <DeleteFormAlert id={form.id} />
              </TableCell>
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
