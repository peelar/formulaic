import Form, { IChangeEvent } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import "./App.css";
import { useGetForm } from "./useGetForm";
import { useSubmitForm } from "./useSubmitForm";
import { RJSFSchema } from "@rjsf/utils";

function App() {
  const { data: form, isLoading, error } = useGetForm();
  const [submit, { data: submitData }] = useSubmitForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleFormSubmit(data: IChangeEvent<any, RJSFSchema, any>) {
    console.log(data.formData);

    if (!form?.id) throw new Error("Form ID not found");

    await submit({ content: data.formData, formId: form?.id });
  }

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {form?.schema.content && (
        <div>
          <Form
            onSubmit={handleFormSubmit}
            schema={form.schema.content}
            validator={validator}
          />
        </div>
      )}
      {submitData && <p>Form submitted!</p>}
    </section>
  );
}

export default App;
