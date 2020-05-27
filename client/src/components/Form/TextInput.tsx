import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLInputElement>,
    FormFieldProps {}
const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <label
        style={{
          float: "left",
        }}
      >
        {placeholder}
      </label>
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <Label
          basic
          color="red"
          style={{
            float: "left",
          }}
        >
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
