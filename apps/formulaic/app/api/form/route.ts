import { getUser } from "../../../auth";
import { FormController } from "../../../src/modules/form/form-controller";
import { FormRepository } from "../../../src/modules/form/form-repository";

export async function POST(request: Request) {
  const repository = new FormRepository();
  const user = await getUser();
  const formController = new FormController({
    repository,
    user,
  });

  return formController.POST(request);
}
