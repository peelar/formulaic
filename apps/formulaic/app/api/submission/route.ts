import { SubmissionController } from "../../modules/submission/submission-controller";

export async function POST(request: Request) {
  const submissionController = new SubmissionController();

  return submissionController.POST(request);
}
