import { FormRepository } from "../../../modules/form/form-repository";
import { FormService } from "../../../modules/form/form-service";

export async function GET(
  request: Request,
  { params }: { params: { id: string | null } }
) {
  const repository = new FormRepository();
  const formService = new FormService({ request, repository });
  const id = params.id;

  return formService.getById(id);
}
