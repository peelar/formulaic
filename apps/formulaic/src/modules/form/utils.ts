import { getUser } from "../../../auth";
import { FormRepository } from "./form-repository";
import { FormService } from "./form-service";

export async function getUserFormService() {
  const repository = new FormRepository();
  const user = await getUser();
  const formService = new FormService({ repository, user });

  return formService;
}
