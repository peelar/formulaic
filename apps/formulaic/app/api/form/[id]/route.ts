import { FormController } from "../../../modules/form/form-controller";
import { FormRepository } from "../../../modules/form/form-repository";
import { FormService } from "../../../modules/form/form-service";

export async function GET(
  request: Request,
  { params }: { params: { id: string | null } }
) {
  const id = params.id;

  if (!id) {
    throw new Error("No id provided");
  }

  const formController = new FormController();

  return formController.GET({ id, request });
}
