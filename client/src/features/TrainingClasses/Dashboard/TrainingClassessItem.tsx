import React, { useContext } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import TrainingClassStore from "../../../app/stores/TrainingClassStore";
import { ITrainingClass } from "../../../app/_models/ITrainingClasses";
import {
  Item,
  Button,
  Label,
  Segment,
  Icon,
  ItemGroup,
} from "semantic-ui-react";
import { trainingClassessLink } from "../../../app/_constantVariables/_Links";

const TrainingClassessItem: React.FC<{ TrainingClass: ITrainingClass }> = ({
  TrainingClass,
}) => {
  const { editSelectClass, deleteTrainingClass } = useContext(
    TrainingClassStore
  );
  return (
    <Segment.Group>
      <Segment>
        <ItemGroup>
          <Item key={TrainingClass.id}>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header>{TrainingClass.title}</Item.Header>
              <Item.Description>Hosted By Bob</Item.Description>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <Icon name="clock" /> Every {TrainingClass.dayOfWeek} at{" "}
        {TrainingClass.time}
        <Icon name="marker" /> {TrainingClass.address} {TrainingClass.city},{" "}
        {TrainingClass.country} {TrainingClass.postalCode}
      </Segment>
      <Segment secondary>Attendees will go here</Segment>
      <Segment clearing>
        <span>{TrainingClass.description}</span>
        <Button
          floated="right"
          content="View"
          color="blue"
          as={Link}
          to={trainingClassessLink + `/${TrainingClass.id}`}
          onClick={() => editSelectClass(TrainingClass.id)}
        />
        <Button
          floated="right"
          content="Delete"
          color="red"
          onClick={() => deleteTrainingClass(TrainingClass.id)}
        />
      </Segment>
    </Segment.Group>
  );
};

export default TrainingClassessItem;
{
  /* <Label basic content={TrainingClass.category} /> */
}
