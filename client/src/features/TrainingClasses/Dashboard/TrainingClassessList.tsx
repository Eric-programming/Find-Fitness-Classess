import React, { useContext, Fragment } from "react";
import { Item, Label } from "semantic-ui-react";
import { ITrainingClass } from "../../../app/_models/ITrainingClasses";
import { observer } from "mobx-react-lite";
import TrainingClassessItem from "./TrainingClassessItem";
import _getTime from "../../../app/_helper/_getTimes";
import { RootStoreContext } from "../../../app/stores/RootStore";

const TrainingClassessList = () => {
  const TrainingClassess = useContext(RootStoreContext).trainingClassessStore;
  const { trainingClassess, GroupClassess } = TrainingClassess;
  if (trainingClassess.length === 0) {
    return null;
  } else {
    return (
      <>
        {GroupClassess(trainingClassess).map((trainingClassess, index) => {
          const { hr, meridiem } = _getTime(trainingClassess[0].time);
          return (
            <Fragment key={index}>
              <Label size="large" color="blue">
                {hr} {meridiem}
              </Label>
              <Item.Group divided>
                {trainingClassess &&
                  trainingClassess.map((e: ITrainingClass, i: number) => {
                    return <TrainingClassessItem TrainingClass={e} key={i} />;
                  })}
              </Item.Group>
            </Fragment>
          );
        })}
      </>
    );
  }
};

export default observer(TrainingClassessList);
