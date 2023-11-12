import { FormController } from "../../../src/modules/form/form-controller";

export async function POST(request: Request) {
  const formController = new FormController();

  return formController.POST(request);
}
