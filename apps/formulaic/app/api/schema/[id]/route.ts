import { NextRequest } from "next/server";
import { FormSchemaService } from "../../../form-schema.service";

const formSchemaService = new FormSchemaService();

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string | null } }
) {
  const id = params.id;

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  const schema = await formSchemaService.getById(id);

  if (!schema) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(JSON.stringify(schema), {
    status: 200,
    headers: {
      // todo: add real CORS policy here
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
