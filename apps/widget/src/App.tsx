import "./App.css";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import { ROOT_ID } from "./main";
import { useFetchForm } from "./useFetchForm";

function App() {
  const formId = document.getElementById(ROOT_ID)?.getAttribute("data-form-id");

  if (!formId) {
    throw new Error(
      "Missing form id. Make sure that your root element has a data-form-id attribute."
    );
  }

  const { data: schema, isLoading, error } = useFetchForm(formId);

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {schema && (
        <div>
          <Form schema={schema} validator={validator} />
        </div>
      )}
    </section>
  );
}

export default App;
