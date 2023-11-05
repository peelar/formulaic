import { FormService } from "../../../modules/form/form-service";

export async function GET(
  request: Request,
  { params }: { params: { id: string | null } }
) {
  const formService = new FormService(request);
  const id = params.id;

  return formService.getById(id);
}
