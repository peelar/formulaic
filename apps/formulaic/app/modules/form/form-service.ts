import { FormRepository } from "./form-repository";

// todo: move
type Nullable<T> = T | null | undefined;

function isDomainAllowed(request: Request, form: any) {
  // todo: get domain from request
  // const domain = new URL(request.url).hostname;
  // const allowedDomains = form.allowedDomains;
  // if (!allowedDomains) {
  //   return false;
  // }
  // if (allowedDomains.includes(domain)) {
  //   return true;
  // }
  // return false;
  return true;
}

export class FormService {
  private repository: FormRepository;
  private request: Request;

  constructor({
    request,
    repository,
  }: {
    request: Request;
    repository: FormRepository;
  }) {
    this.repository = repository;
    this.request = request;
  }

  async getById(id: Nullable<string>) {
    if (!id) {
      return new Response("Missing id", { status: 400 });
    }

    const form = await this.repository.getById(id);

    if (!form) {
      return new Response("Not found", { status: 404 });
    }

    if (!isDomainAllowed(this.request, form)) {
      return new Response("Not allowed", { status: 403 });
    }

    return new Response(JSON.stringify(form), {
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
