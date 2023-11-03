import React from "react";
import "./App.css";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/core";
import type { RJSFSchema } from "@rjsf/utils";

function App() {
  const [schema, setSchema] = React.useState<RJSFSchema>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  async function fetchSchema(id: string) {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/schema/" + id);
      const data = (await response.json()) as unknown as RJSFSchema;

      setIsLoading(false);
      setSchema(data);
    } catch (e) {
      const nextError = e instanceof Error ? e : new Error("Unknown error");
      setError(nextError);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    fetchSchema("1");
  }, []);

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {schema && <Form schema={schema} validator={validator} />}
    </section>
  );
}

export default App;
