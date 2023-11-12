import { FormController } from "../../../../src/modules/form/form-controller";

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
