import React from "react";
import { Segment, Form } from "semantic-ui-react";

const ClassForm = () => {
  return (
    <Segment>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.Input placeholder="Category" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Country" />
        <Form.Input placeholder="Province" />
        <Form.Input placeholder="Address" />
        <Form.Input placeholder="Postal Code" />
        <Form.Input placeholder="Day of Week" />
        <Form.TextArea rows={2} placeholder="Description" />
        <Form.Input type="time" placeholder="Hour" />
        <Form.Input placeholder="Min" />
        <Form.Input placeholder="Total Spots" />
      </Form>
    </Segment>
  );
};

export default ClassForm;
