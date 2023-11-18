import { FormRepository } from "../../../../src/modules/form/form-repository";
import { PublicFormController } from "../../../../src/modules/form/public/public-form-controller";

export async function GET(
  request: Request,
  { params }: { params: { id: string | null } }
) {
  const id = params.id;

  if (!id) {
    throw new Error("No id provided");
  }

  const repository = new FormRepository();

  const formController = new PublicFormController({
    repository,
  });

  return formController.GET({ id, request });
}
