import { describe, expect, it } from "vitest";
import { buildFieldsFromJsonSchema } from "./json-schema-to-fields";

const jsonSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
    email: {
      type: "string",
      format: "email",
    },
    age: {
      type: "integer",
      minimum: 0,
    },
  },
  required: ["name", "email", "age"],
};

describe("buildFieldsFromJsonSchema", () => {
  it("should build fields from json schema", () => {
    const fields = buildFieldsFromJsonSchema(jsonSchema);
    expect(fields).toEqual([
      {
        id: expect.any(String),
        name: "name",
        required: false,
        type: "text",
        rules: {
          minLength: 1,
          maxLength: 100,
        },
      },
      {
        id: expect.any(String),
        name: "email",
        required: false,
        type: "email",
      },
      {
        id: expect.any(String),
        name: "age",
        required: false,
        type: "number",
        rules: {
          minimum: 0,
          maximum: 100,
        },
      },
    ]);
  });
});
