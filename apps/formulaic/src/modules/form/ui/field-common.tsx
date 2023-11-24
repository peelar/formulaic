import { Input } from "../../../@/components/ui/input";
import { Textarea } from "../../../@/components/ui/textarea";
import { FieldProps } from "../fields-schema";
import { FieldPrimitive } from "./field-primitive";

const Title = ({
  value,
  onChange,
  placeholder,
  helperText,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  helperText?: string;
}) => {
  return (
    <FieldPrimitive.Label label="Field title" helperText={helperText}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        name="title"
        placeholder={placeholder}
      />
    </FieldPrimitive.Label>
  );
};

const Description = ({
  value,
  onChange,
  placeholder,
  helperText,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  helperText?: string;
}) => {
  return (
    <FieldPrimitive.Label label="Field description" helperText={helperText}>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name="description"
        placeholder={placeholder}
      />
    </FieldPrimitive.Label>
  );
};

export const CommonFieldsWrapper = ({
  field,
  updateField,
  titlePlaceholder,
  descriptionPlaceholder,
  children,
}: {
  field: FieldProps;
  updateField: (field: FieldProps) => void;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  children?: React.ReactNode;
}) => {
  return (
    <FieldPrimitive.FieldWrapper>
      <Title
        value={field.title}
        onChange={(value) => updateField({ ...field, title: value })}
        placeholder={titlePlaceholder}
      />
      <Description
        value={field.description ?? ""}
        onChange={(value) => updateField({ ...field, description: value })}
        placeholder={descriptionPlaceholder}
      />
      {children}
    </FieldPrimitive.FieldWrapper>
  );
};
