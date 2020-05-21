import React from "react";
import { ITrainingClass } from "../../../app/_models/ITrainingClasses";
import { Segment, Grid, Icon } from "semantic-ui-react";

const ClassDetailInfo: React.FC<{ trainingClass: ITrainingClass }> = ({
  trainingClass,
}) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{trainingClass.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{trainingClass.time}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {trainingClass.address} {trainingClass.city},{" "}
              {trainingClass.country} {trainingClass.postalCode}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};
export default ClassDetailInfo;
