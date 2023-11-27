import React from "react";
import { getForm } from "../../src/modules/form/form-actions";
import { FormPageTabs } from "../../src/modules/form/ui/form-page-tabs";
import { FormHeader } from "../../src/modules/form/ui/form-header";

const FormLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const slug = params.slug;
  const form = await getForm({ slug });

  return (
    <>
      <FormHeader form={form} />
      <FormPageTabs form={form} />
      {children}
    </>
  );
};

export default FormLayout;
