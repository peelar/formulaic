import { FormSchemaService } from "../form-schema.service";

const formSchemaService = new FormSchemaService();

export async function GET(request: Request) {
  return new Response(formSchemaService.get(), {
    status: 200,
    headers: {
      // todo: add real CORS policy here
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
