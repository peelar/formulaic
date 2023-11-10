import { SubmissionRepository } from "../../modules/submission/submission-repository";
import { SubmissionService } from "../../modules/submission/submission-service";

export async function POST(request: Request) {
  const repository = new SubmissionRepository();
  const submissionService = new SubmissionService(repository);

  return submissionService.create(request);
}
