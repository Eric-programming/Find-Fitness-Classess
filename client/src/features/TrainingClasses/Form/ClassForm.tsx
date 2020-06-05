import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import { ITrainingClass } from "../../../app/_models/ITrainingClasses";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { DetailParams } from "../../../app/_models/_IDetailParams";
import { trainingClassessLink } from "../../../app/_constantVariables/_Links";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../components/Form/TextInput";
import TextAreaInput from "../../../components/Form/TextAreaInput";
import SelectInput from "../../../components/Form/SelectInput";
import { dayOfWeekOptions } from "../../../options/dayOfWeekOptions";
import { categoryOptions } from "../../../options/categoryOptions";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/RootStore";
const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  postalCode: isRequired("Postal Code"),
  address: isRequired("Address"),
  dayOfWeek: isRequired("Day of Week"),
  totalSpots: isRequired("Total Spot"),
  province: isRequired("Province"),
  country: isRequired("Country"),
  city: isRequired("City"),
  time: isRequired("Time"),
});
const defaultInput = {
  id: "",
  address: "16932 71 ave",
  category: "bodybuilding",
  city: "surrey",
  country: "Canada",
  dayOfWeek: 0,
  description: "Hello this is a group training class",
  time: "",
  postalCode: "V4NDL3",
  province: "BC",
  title: "TITLE",
  totalSpots: 0,
};
const ClassForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const TrainingClassess = useContext(RootStoreContext).trainingClassessStore;
  const {
    getTrainingClass,
    reset,
    createTrainingClass,
    editTrainingClass,
  } = TrainingClassess;

  const [form, setForm] = useState<any>(defaultInput);
  useEffect(() => {
    if (match.params.id && form.id.length === 0) {
      getTrainingClass(match.params.id).then(
        (res: ITrainingClass | undefined) => {
          setForm(res ? res : defaultInput);
        }
      );
    }
    return () => {
      reset();
    };
  }, [reset, getTrainingClass, match.params.id, form.id]);
  const handleFinalFormSubmit = async (value: any) => {
    value.totalSpots = parseInt(value.totalSpots);
    if (value.id.length === 0) {
      const newId = uuidv4();
      createTrainingClass({
        ...value,
        id: newId,
      }).then(() => {
        history.push(trainingClassessLink + `/${newId}`);
      });
    } else {
      editTrainingClass(value).then(() => {
        history.push(trainingClassessLink + `/${value.id}`);
      });
    }
  };
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={form}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={form?.title}
                  component={TextInput}
                />
                <Field
                  name="category"
                  placeholder="Category"
                  value={form?.category}
                  component={SelectInput}
                  option={categoryOptions}
                />
                <Field
                  placeholder="City"
                  name="city"
                  value={form?.city}
                  component={TextInput}
                />
                <Field
                  name="country"
                  placeholder="Country"
                  value={form?.country}
                  component={TextInput}
                />
                <Field
                  placeholder="Province"
                  name="province"
                  component={TextInput}
                  value={form?.province}
                />
                <Field
                  placeholder="Address"
                  name="address"
                  value={form?.address}
                  component={TextInput}
                />
                <Field
                  placeholder="Postal Code"
                  name="postalCode"
                  value={form?.postalCode}
                  component={TextInput}
                />
                <Field
                  placeholder="Day of Week"
                  name="dayOfWeek"
                  option={dayOfWeekOptions}
                  component={SelectInput}
                  value={form?.dayOfWeek}
                />
                <Field
                  rows={2}
                  placeholder="Description"
                  name="description"
                  value={form?.description}
                  component={TextAreaInput}
                />
                <Field
                  type="time"
                  placeholder="time"
                  name="time"
                  value={form?.time}
                  component={TextInput}
                />

                <Field
                  placeholder="Total Spots"
                  name="totalSpots"
                  component={TextInput}
                  type="number"
                  value={form?.totalSpots.toString()}
                />
                <Button
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  disabled={invalid || pristine}
                />
                <Button
                  floated="right"
                  type="button"
                  content="Cancel"
                  onClick={() =>
                    history.push(`${trainingClassessLink}/${form.id}`)
                  }
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ClassForm);
