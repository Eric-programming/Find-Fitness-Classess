import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import {
  combineValidators,
  isRequired,
  matchesPattern,
  composeValidators,
} from "revalidate";
import { RootStoreContext } from "../../app/stores/RootStore";
import { IUserFormValues } from "../../app/_models/IUser";
import TextInput from "../../components/Form/TextInput";
const validate = combineValidators({
  userName: isRequired("userName"),
  fullName: isRequired("fullName"),
  email: composeValidators(
    isRequired({ message: "Please enter the email" }),
    matchesPattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)({
      message: "Please enter a valid email",
    })
  )(),
  password: composeValidators(
    isRequired({ message: "Please enter the password" }),
    matchesPattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    )({
      message:
        "Password must be 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
    })
  )(),
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
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
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
