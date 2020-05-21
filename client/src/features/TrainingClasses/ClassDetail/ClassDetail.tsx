import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import TrainingClassStore from "../../../app/stores/TrainingClassStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import { DetailParams } from "../../../app/_models/_IDetailParams";
import {
  trainingClassessLink,
  editTrainingClassLink,
} from "../../../app/_constantVariables/_Links";

const ClassDetail: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const { selectedClass, getTrainingClass } = useContext(TrainingClassStore);
  useEffect(() => {
    if (!selectedClass) {
      getTrainingClass(match.params.id);
    }
  }, [getTrainingClass, match.params.id, selectedClass]);
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
                as={Link}
                to={editTrainingClassLink + `/${selectedClass.id}`}
              />
              <Button
                basic
                color="grey"
                content="Cancel"
                onClick={() => history.push(trainingClassessLink)}
              />
            </Button.Group>
          </Card.Content>
        </Card>
      ) : null}
    </>
  );
};

export default observer(ClassDetail);
