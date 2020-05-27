import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../app/stores/RootStore";
import { IUserFormValues } from "../../app/_models/IUser";
import TextInput from "../../components/Form/TextInput";

const validate = combineValidators({
  username: isRequired("Username"),
  displayName: isRequired("DisplayName"),
  email: isRequired("Email"),
  password: isRequired("Password"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => register(values)}
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as="h2" content="Register" color="teal" textAlign="center" />
          <Field name="userName" component={TextInput} placeholder="Username" />
          <Field
            name="fullName"
            component={TextInput}
            placeholder="Full Name"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          <Button
            // disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Register"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
