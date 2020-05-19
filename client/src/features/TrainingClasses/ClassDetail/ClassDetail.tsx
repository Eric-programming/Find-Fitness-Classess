import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import TrainingClassStore from "../../../app/stores/TrainingClassStore";
import { observer } from "mobx-react-lite";

const ClassDetail = () => {
  const { selectedClass, editEditMode, reset, editMode } = useContext(
    TrainingClassStore
  );
  return (
    <>
      {selectedClass != null ? (
        <Card fluid>
          <Image
            src={`/assets/${selectedClass.category}.jpeg`}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{selectedClass.title}</Card.Header>
            <Card.Meta>
              <span className="date">
                Every {selectedClass.dayOfWeek} at {selectedClass.time}
              </span>
            </Card.Meta>
            <Card.Description>{selectedClass.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button.Group widths={2}>
              <Button
                basic
                color="blue"
                content="Edit"
                onClick={() => {
                  editEditMode(!editMode);
                }}
              />
              <Button
                basic
                color="grey"
                content="Cancel"
                onClick={() => reset()}
              />
            </Button.Group>
          </Card.Content>
        </Card>
      ) : null}
    </>
  );
};

export default observer(ClassDetail);
