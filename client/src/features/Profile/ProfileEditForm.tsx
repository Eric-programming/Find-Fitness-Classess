import { IProfileEdit } from "../../app/_models/IProfile";
import { combineValidators, isRequired } from "revalidate";
import React, { useContext } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import TextInput from "../../components/Form/TextInput";
import { Button, Form } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/RootStore";
import TextAreaInput from "../../components/Form/TextAreaInput";

const validate = combineValidators({
  fullName: isRequired("Full Name"),
  bio: isRequired("Bio"),
});

interface IProps {
  setEditMode: (mode: boolean) => void;
}
const ProfileEditForm: React.FC<IProps> = ({ setEditMode }) => {
  const rootStore = useContext(RootStoreContext);
  const { updateProfile, profile } = rootStore.profileStore;
  const defaultVal: IProfileEdit = {
    fullName: profile!.fullName,
    bio: profile!.bio,
  };
  return (
    <FinalForm
      initialValues={defaultVal}
      onSubmit={(values: IProfileEdit) => {
        updateProfile(values);
        setEditMode(false);
      }}
      validate={validate}
      render={({ handleSubmit, submitting, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="fullName"
            component={TextInput}
            placeholder="Full Name"
          />
          <Field
            name="bio"
            rows={2}
            component={TextAreaInput}
            placeholder="Bio"
          />
          {console.log(invalid)}
          <Button
            disabled={invalid || pristine}
            loading={submitting}
            color="teal"
            content="Save"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default observer(ProfileEditForm);
