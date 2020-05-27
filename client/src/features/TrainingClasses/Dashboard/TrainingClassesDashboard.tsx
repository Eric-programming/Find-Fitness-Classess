import React, { useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import TrainingClassessList from "./TrainingClassessList";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/RootStore";

//Functional Component Type
const TrainingClassesDashboard = () => {
  const TrainingClassess = useContext(RootStoreContext).trainingClassessStore;
  const { loadingTrainingClassess } = TrainingClassess;
  useEffect(() => {
    loadingTrainingClassess();
  }, [loadingTrainingClassess]);
  return (
    <Grid>
      <Grid.Column width={10}>
        <TrainingClassessList />
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
};

export default observer(TrainingClassesDashboard);
