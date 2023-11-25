import { PublicSubmissionController } from "../../../src/modules/submission/public-submission-controller";

export async function POST(request: Request) {
  const submissionController = new PublicSubmissionController();

  return submissionController.POST(request);
}
