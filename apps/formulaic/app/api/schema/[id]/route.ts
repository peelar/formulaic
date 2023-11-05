import { NextRequest } from "next/server";
import { FormService } from "../../../modules/form/form-service";

const formService = new FormService();

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string | null } }
) {
  const id = params.id;

  return formService.getById(id);
}
