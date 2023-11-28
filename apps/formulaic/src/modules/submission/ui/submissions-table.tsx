"use client";

import React from "react";
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
import { useSchemaVersion } from "../../schema/ui/useSchemaVersion";
import {
  SubmissionActionsResponse,
  getSubmissionsBySchemaVersion,
} from "../submission-actions";

// todo: maybe server component?
export const SubmissionsTable = () => {
  const {
    state: { version },
  } = useSchemaVersion();
  const [isLoading, setIsLoading] = React.useState(false);
  const [submissions, setSubmissions] =
    React.useState<SubmissionActionsResponse.GetSubmissionsBySchemaVersion>([]);

  async function fetchSubmissions(schemaVersion: string) {
    setIsLoading(true);
    const nextSubmissions = await getSubmissionsBySchemaVersion({
      schemaVersion: Number(schemaVersion),
    });
    setSubmissions(nextSubmissions);
    setIsLoading(false);
  }

  React.useEffect(() => {
    if (!version) return;
    fetchSubmissions(version);
  }, [version]);

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
        {isLoading && <TableCaption>Fetching submissions...</TableCaption>}
        {!isLoading && !submissions.length && (
          <TableCaption>No submissions found</TableCaption>
        )}
      </Table>
    </section>
  );
};
