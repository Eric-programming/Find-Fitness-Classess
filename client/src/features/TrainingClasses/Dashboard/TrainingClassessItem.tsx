import React, { useContext } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import TrainingClassStore from "../../../app/stores/TrainingClassStore";
import { ITrainingClass } from "../../../app/_models/ITrainingClasses";
import { Item, Button, Label } from "semantic-ui-react";
import { trainingClassessLink } from "../../../app/_constantVariables/_Links";

const TrainingClassessItem: React.FC<{ TrainingClass: ITrainingClass }> = ({
  TrainingClass,
}) => {
  const { editSelectClass, deleteTrainingClass } = useContext(
    TrainingClassStore
  );
  return (
    <Item key={TrainingClass.id}>
      <Item.Content>
        <Item.Header>{TrainingClass.title}</Item.Header>
        <Item.Meta>
          Every {TrainingClass.dayOfWeek} at {TrainingClass.time}
        </Item.Meta>
        <Item.Description>
          <div>{TrainingClass.description}</div>
          <div>
            {TrainingClass.address} {TrainingClass.city},{" "}
            {TrainingClass.country} {TrainingClass.postalCode}
          </div>
        </Item.Description>
        <Item.Extra>
          <Button
            floated="right"
            content="Delete"
            color="red"
            onClick={() => deleteTrainingClass(TrainingClass.id)}
          />
          <Button
            floated="right"
            content="View"
            color="blue"
            as={Link}
            to={trainingClassessLink + `/${TrainingClass.id}`}
            onClick={() => editSelectClass(TrainingClass.id)}
          />

          <Label basic content={TrainingClass.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default TrainingClassessItem;
