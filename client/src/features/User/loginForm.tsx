import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../app/stores/RootStore";
import { IUserFormValues } from "../../app/_models/IUser";
import TextInput from "../../components/Form/TextInput";
import { observer } from "mobx-react-lite";

const validate = combineValidators({
  email: isRequired("Email"),
  password: isRequired("Password"),
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => login(values)}
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as="h2" content="Login" color="teal" textAlign="center" />
          <br />
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
            content="Login"
            fluid
          />
          {/* <Divider horizontal>Or</Divider>
          <SocialLogin loading={loading} fbCallback={fbLogin} /> */}
        </Form>
      )}
    />
  );
};

export default observer(LoginForm);
