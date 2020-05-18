import React from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { ITrainingClass } from "../../../Interfaces/ITrainingClasses";
interface IProps {
  selectedClass: ITrainingClass | null;
  handleEditMode: (editMode: boolean) => void;
  editMode: boolean;
  reset: () => void;
}
const ClassDetail: React.FC<IProps> = ({
  selectedClass,
  handleEditMode,
  editMode,
  reset,
}) => {
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
                Every {selectedClass.dayOfWeek} at {selectedClass.hr} :{" "}
                {selectedClass.min}
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
                  handleEditMode(!editMode);
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

export default ClassDetail;
