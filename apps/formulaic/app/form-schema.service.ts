import { mocks } from "./mocks";

export class FormSchemaService {
  private toString(object: any) {
    return JSON.stringify(object, null, 2);
  }

  get() {
    return this.toString(mocks.schema);
  }
}
