import React, { useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { ITrainingClass } from "../../../Interfaces/ITrainingClasses";
import TrainingClassStore from "../../../app/stores/TrainingClassStore";
import { observer } from "mobx-react-lite";

const TrainingClassessList = () => {
  const { trainingClassess, editSelectClass, deleteTrainingClass } = useContext(
    TrainingClassStore
  );
  if (trainingClassess.length === 0) {
    return null;
  } else {
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
                      Every {e.dayOfWeek} at {e.time}
                    </Item.Meta>
                    <Item.Description>
                      <div>{e.description}</div>
                      <div>
                        {e.address} {e.city}, {e.country} {e.postalCode}
                      </div>
                      {/* <Image src='../../../../public/assets/user.png' /> */}
                    </Item.Description>
                    <Item.Extra>
                      <Button
                        floated="right"
                        content="Delete"
                        color="red"
                        onClick={() => deleteTrainingClass(e.id)}
                      />
                      <Button
                        floated="right"
                        content="View"
                        color="blue"
                        onClick={() => editSelectClass(e.id)}
                      />

                      <Label basic content={e.category} />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              );
            })}
        </Item.Group>
      </Segment>
    );
  }
};

export default observer(TrainingClassessList);
