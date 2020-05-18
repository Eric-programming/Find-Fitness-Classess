import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { ITrainingClass } from "../../../Interfaces/ITrainingClasses";
import TrainingClassessList from "./TrainingClassessList";
import ClassDetail from "../ClassDetail/ClassDetail";
import ClassForm from "../Form/ClassForm";

interface IProps {
  trainingClassess: ITrainingClass[];
  handleSelectClass: (id: string) => void;
  selectedClass: ITrainingClass | null;
  editMode: boolean;
  handleEditMode: (editMode: boolean) => void;
  reset: () => void;
  handleDeleteClass: (id: string) => void;
  handleEditClass: (trainingClass: ITrainingClass) => void;
  handleCreateClass: (trainingClass: ITrainingClass) => void;
}
//Functional Component Type
const TrainingClassesDashboard: React.FC<IProps> = ({
  trainingClassess,
  handleSelectClass,
  selectedClass,
  editMode,
  handleEditMode,
  handleEditClass,
  handleCreateClass,
  reset,
  handleDeleteClass,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <TrainingClassessList
          trainingClassess={trainingClassess}
          handleSelectClass={handleSelectClass}
          handleDeleteClass={handleDeleteClass}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {!editMode ? (
          <ClassDetail
            selectedClass={selectedClass}
            handleEditMode={handleEditMode}
            editMode={editMode}
            reset={reset}
          />
        ) : null}
        {editMode ? (
          <ClassForm
            key={(selectedClass && selectedClass.id) || 0}
            handleEditMode={handleEditMode}
            editMode={editMode}
            selectedClass={selectedClass}
            handleEditClass={handleEditClass}
            handleCreateClass={handleCreateClass}
          />
        ) : null}
      </Grid.Column>
    </Grid>
  );
};

export default TrainingClassesDashboard;
