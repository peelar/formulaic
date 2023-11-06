import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import "./App.css";
import { useFormulaic } from "./useFormulaic";

function App() {
  const { data: schema, isLoading, error } = useFormulaic();

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
