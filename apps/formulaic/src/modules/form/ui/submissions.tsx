import { Submission } from "@prisma/client";
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

type SelectedSubmission = Pick<Submission, "content" | "createdAt" | "id">;

const SubmissionsTable = ({
  submissions,
}: {
  submissions: SelectedSubmission[];
}) => {
  return (
    <section className="my-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Content</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => {
            const content = JSON.stringify(submission.content, null, 2);
            return (
              <TableRow>
                <TableCell className="font-bold">
                  <pre>{content}</pre>
                </TableCell>
                <TableCell>{date.toLongDate(submission.createdAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {!submissions.length && (
          <TableCaption>No submissions found</TableCaption>
        )}
      </Table>
    </section>
  );
};

export const Submissions = ({
  submissions,
}: {
  submissions: SelectedSubmission[];
}) => {
  return <SubmissionsTable submissions={submissions} />;
};
