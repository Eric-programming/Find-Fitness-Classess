import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import TrainingClassessList from "./TrainingClassessList";

import TrainingClassStore from "../../../app/stores/TrainingClassStore";
import { observer } from "mobx-react-lite";

//Functional Component Type
const TrainingClassesDashboard = () => {
  const { editMode } = useContext(TrainingClassStore);

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
