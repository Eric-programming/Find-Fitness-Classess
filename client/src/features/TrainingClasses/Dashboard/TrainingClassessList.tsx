import React, { useContext, Fragment } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { ITrainingClass } from "../../../app/_models/ITrainingClasses";
import TrainingClassStore from "../../../app/stores/TrainingClassStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { trainingClassessLink } from "../../../app/_constantVariables/_Links";
import TrainingClassessItem from "./TrainingClassessItem";
import _getTime from "../../../app/_helper/_getTimes";

const TrainingClassessList = () => {
  const { trainingClassess, GroupClassess } = useContext(TrainingClassStore);
  if (trainingClassess.length === 0) {
    return null;
  } else {
    return (
      <>
        {GroupClassess(trainingClassess, false).map(
          (trainingClassess, index) => {
            const { hr, meridiem } = _getTime(trainingClassess[0].time);
            return (
              <Fragment key={index}>
                <Label size="large" color="blue">
                  {hr} {meridiem}
                </Label>
                <Item.Group divided>
                  {trainingClassess &&
                    trainingClassess.map((e: ITrainingClass) => {
                      return (
                        <TrainingClassessItem TrainingClass={e} key={e.id} />
                      );
                    })}
                </Item.Group>
              </Fragment>
            );
          }
        )}
      </>
    );
  }
};

export default observer(TrainingClassessList);
