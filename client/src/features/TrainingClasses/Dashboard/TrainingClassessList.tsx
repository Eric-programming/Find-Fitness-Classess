import React from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { ITrainingClass } from "../../../Interfaces/ITrainingClasses";
interface IProps {
  trainingClassess: ITrainingClass[];
}
const TrainingClassessList: React.FC<IProps> = ({ trainingClassess }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {trainingClassess &&
          trainingClassess.map((e: ITrainingClass) => {
            return (
              <Item key={e.id}>
                <Item.Content>
                  <Item.Header as="a">{e.title}</Item.Header>
                  <Item.Meta>
                    Every {e.dayOfWeek} at {e.hr}:{e.min}
                  </Item.Meta>
                  <Item.Description>
                    <div>{e.description}</div>
                    <div>
                      {e.address} {e.city}, {e.country} {e.postalCode}
                    </div>
                    {/* <Image src='../../../../public/assets/user.png' /> */}
                  </Item.Description>
                  <Item.Extra>
                    <Button floated="right" content="View" color="blue" />
                    <Label basic content={e.category} />
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
      </Item.Group>
    </Segment>
  );
};

export default TrainingClassessList;
