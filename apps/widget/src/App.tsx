import Form, { IChangeEvent } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import "./App.css";
import { useGetForm } from "./useGetForm";
import { useSubmitForm } from "./useSubmitForm";
import { RJSFSchema } from "@rjsf/utils";

function App() {
  const { data: form, isLoading, error } = useGetForm();
  const [submit, { data: submitData }] = useSubmitForm();

  const schema = form?.schema;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleFormSubmit(data: IChangeEvent<any, RJSFSchema, any>) {
    console.log(data.formData);

    if (!schema?.id) throw new Error("Schema ID not found");

    await submit({ content: data.formData, schemaId: schema?.id });
  }

  const content = schema?.content;
  const isSubmitted = submitData !== undefined;

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {content && (
        <div>
          <Form
            onSubmit={handleFormSubmit}
            schema={content}
            validator={validator}
          />
        </div>
      )}
      {isSubmitted && <p>Form submitted!</p>}
    </section>
  );
}

export default App;
