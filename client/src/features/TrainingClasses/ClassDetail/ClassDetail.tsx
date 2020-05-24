import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import TrainingClassStore from "../../../app/stores/TrainingClassStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { DetailParams } from "../../../app/_models/_IDetailParams";
import ClassDetailHeader from "./ClassDetailHeader";
import ClassDetailInfo from "./ClassDetailInfo";
import ClassDetailChat from "./ClassDetailChat";
import ClassDetailSidebar from "./ClassDetailSidebar";

const ClassDetail: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const { selectedClass, getTrainingClass } = useContext(TrainingClassStore);
  useEffect(() => {
    getTrainingClass(match.params.id);
  }, [match, getTrainingClass]);
  if (selectedClass === null) {
    return <h2>Class not found</h2>;
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <ClassDetailHeader trainingClass={selectedClass} />
        <ClassDetailInfo trainingClass={selectedClass} />
        <ClassDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ClassDetailSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ClassDetail);
