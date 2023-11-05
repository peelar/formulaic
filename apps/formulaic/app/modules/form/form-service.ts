import { FormRepository } from "./form-repository";

// todo: move
type Nullable<T> = T | null | undefined;

export class FormService {
  private formRepository: FormRepository;
  constructor() {
    this.formRepository = new FormRepository();
  }

  async getById(id: Nullable<string>) {
    if (!id) {
      return new Response("Missing id", { status: 400 });
    }

    const schema = await this.formRepository.getById(id);

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
}
