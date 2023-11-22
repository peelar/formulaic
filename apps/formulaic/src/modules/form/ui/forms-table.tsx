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
    <div className="my-6 w-full max-w-2xl">
      <h3 className="mb-2">Forms table</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {/* <TableHead>Allowed URLs</TableHead> */}
            <TableHead>Submissions</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow key={form.id}>
              <TableCell className="font-bold">
                <Link href={`/form/${form.id}`}>{form.name}</Link>
              </TableCell>
              {/* <TableCell>
                <UrlBadges urls={form.domainAllowList} />
              </TableCell> */}
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
      <div className="flex mt-4">
        <Link href="/new">
          <Button variant={"brand"}>Add new</Button>
        </Link>
      </div>
    </div>
  );
};
