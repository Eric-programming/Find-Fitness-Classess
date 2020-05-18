import React, { useState, useEffect, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import { ITrainingClass } from "../../../Interfaces/ITrainingClasses";
interface IProps {
  handleEditMode: (editMode: boolean) => void;
  editMode: boolean;
  selectedClass: ITrainingClass | null;
  handleEditClass: (trainingClass: ITrainingClass) => void;
  handleCreateClass: (trainingClass: ITrainingClass) => void;
}
const ClassForm: React.FC<IProps> = ({
  handleEditMode,
  editMode,
  selectedClass: initialFormState,
  handleCreateClass,
  handleEditClass,
}) => {
  const initialForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        address: "",
        category: "",
        city: "",
        country: "",
        dayOfWeek: 0,
        description: "",
        hr: 0,
        min: 0,
        postalCode: "",
        province: "",
        title: "",
        totalSpots: 0,
      };
    }
  };
  const [form, setForm] = useState<ITrainingClass>(initialForm);
  const onChangeInput = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    const data = { ...form, [name]: value };
    setForm(data);
  };
  const onSubmit = () => {
    if (form.id.length === 0) {
      handleCreateClass({
        ...form,
        id: uuidv4(),
      });
    } else {
      handleEditClass(form);
    }
  };
  return (
    <Segment clearing>
      <Form onSubmit={onSubmit}>
        <Form.Input
          name="title"
          placeholder="Title"
          value={form?.title}
          onChange={onChangeInput}
        />
        <Form.Input
          name="category"
          placeholder="Category"
          value={form?.category}
          onChange={onChangeInput}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={form?.city}
          onChange={onChangeInput}
        />
        <Form.Input
          name="country"
          placeholder="Country"
          value={form?.country}
          onChange={onChangeInput}
        />
        <Form.Input
          placeholder="Province"
          name="province"
          onChange={onChangeInput}
          value={form?.province}
        />
        <Form.Input
          placeholder="Address"
          name="address"
          value={form?.address}
          onChange={onChangeInput}
        />
        <Form.Input
          placeholder="Postal Code"
          name="postalCode"
          value={form?.postalCode}
          onChange={onChangeInput}
        />
        <Form.Input
          placeholder="Day of Week"
          name="dayOfWeek"
          onChange={onChangeInput}
          value={form?.dayOfWeek}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="description"
          value={form?.description}
          onChange={onChangeInput}
        />
        <Form.Input
          type="time"
          placeholder="Hour"
          name="hr"
          value={form?.hr}
          onChange={onChangeInput}
        />
        <Form.Input
          placeholder="Min"
          name="min"
          value={form?.min}
          onChange={onChangeInput}
        />
        <Form.Input
          placeholder="Total Spots"
          name="totalSpots"
          onChange={onChangeInput}
          value={form?.totalSpots}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => handleEditMode(!editMode)}
        />
      </Form>
    </Segment>
  );
};

export default ClassForm;
