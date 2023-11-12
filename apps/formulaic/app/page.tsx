import { FormCreator } from "../modules/form/ui/form-creator";

export default function Page(): JSX.Element {
  return (
    <main>
      <div className="flex items-center justify-center my-[25vh]">
        <div className="min-w-[480px]">
          <FormCreator />
        </div>
      </div>
    </main>
  );
}
