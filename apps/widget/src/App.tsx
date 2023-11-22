import { IChangeEvent } from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import "./App.css";
import { Form } from "./Form";
import { useGetForm } from "./useGetForm";
import { useSubmitForm } from "./useSubmitForm";

export function App() {
  const { data: form, isLoading, error } = useGetForm();
  const [submit, { data: submitData }] = useSubmitForm();

  const schema = form?.schema;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleFormSubmit(data: IChangeEvent<any, RJSFSchema, any>) {
    console.log(data.formData);

    if (!schema?.id) throw new Error("Schema ID not found");

    await submit({ content: data.formData, schemaId: schema.id });
  }

  const isSubmitted = submitData !== undefined;

  return (
    <section>
      <main>
        {isLoading && <p>Initializing...</p>}
        {error && <p>{error.message}</p>}
        {form && form.schema && form.schema.content && (
          <Form
            onSubmit={handleFormSubmit}
            schema={form.schema.content}
            validator={validator}
            theme={form.theme}
          />
        )}
        {isSubmitted && <p>Form submitted!</p>}
      </main>
    </section>
  );
}
