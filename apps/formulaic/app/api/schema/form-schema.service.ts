import schema from "../../example-schema.json";

export class FormSchemaService {
  private toString(object: any) {
    return JSON.stringify(object, null, 2);
  }

  get() {
    return this.toString(schema);
  }
}
