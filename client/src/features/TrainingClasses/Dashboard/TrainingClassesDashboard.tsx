import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { ITrainingClass } from "../../../Interfaces/ITrainingClasses";
import TrainingClassessList from "./TrainingClassessList";
import ClassDetail from "../ClassDetail/ClassDetail";
import ClassForm from "../Form/ClassForm";

interface IProps {
  trainingClassess: ITrainingClass[];
}
//Functional Component Type
const TrainingClassesDashboard: React.FC<IProps> = ({ trainingClassess }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <TrainingClassessList trainingClassess={trainingClassess} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ClassDetail />
        <ClassForm />
      </Grid.Column>
    </Grid>
  );
};

export default TrainingClassesDashboard;
