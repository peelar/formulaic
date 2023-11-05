import { FormRepository } from "./form-repository";

// todo: move
type Nullable<T> = T | null | undefined;

export class FormService {
  private formRepository: FormRepository;

  constructor(private request: Request) {
    this.formRepository = new FormRepository();
  }

  private isDomainAllowed(request: Request, form: any) {
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

  async getById(id: Nullable<string>) {
    if (!id) {
      return new Response("Missing id", { status: 400 });
    }

    const form = await this.formRepository.getById(id);

    if (!form) {
      return new Response("Not found", { status: 404 });
    }

    if (!this.isDomainAllowed(this.request, form)) {
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
