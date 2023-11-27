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
import { getAllForms } from "../form-actions";
import { DeleteFormAlert } from "./delete-form-alert";

export const FormsTable = async () => {
  const forms = await getAllForms();

  return (
    <div className="my-6 w-full max-w-2xl">
      <h3 className="mb-2">Your forms</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow key={form.slug}>
              <TableCell className="font-bold">
                <Link href={`/form/${form.slug}`}>{form.name}</Link>
              </TableCell>
              <TableCell>{date.toLongDate(form.createdAt)}</TableCell>
              <TableCell>
                <DeleteFormAlert id={form.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {!forms.length && <TableCaption>No forms found</TableCaption>}
      </Table>
      <div className="flex mt-4">
        <Link href="/new">
          <Button>Add new</Button>
        </Link>
      </div>
    </div>
  );
};
