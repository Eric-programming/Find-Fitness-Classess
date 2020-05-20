import React, { useEffect, useContext } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../features/Nav/Navbar";
import TrainingClassesDashboard from "../features/TrainingClasses/Dashboard/TrainingClassesDashboard";
import LoadingComponent from "../components/LoadingComponent";
import TrainingClassStore from "./stores/TrainingClassStore";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomeComponent from "../features/Home/HomeComponent";
import ClassForm from "../features/TrainingClasses/Form/ClassForm";
import ClassDetail from "../features/TrainingClasses/ClassDetail/ClassDetail";
function App() {
  const TrainingClassess = useContext(TrainingClassStore);
  const { loadingTrainingClassess, loading } = TrainingClassess;
  useEffect(() => {
    loadingTrainingClassess();
  }, [TrainingClassess]);
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Navbar />
          <Container style={{ marginTop: "7em" }}>
            <Route exact={true} path="/" component={HomeComponent} />
            <Route
              exact={true}
              path="/trainingClassess"
              component={TrainingClassesDashboard}
            />
            <Route path="/trainingClassess/:id" component={ClassDetail} />
            <Route
              path={["/create-class", "/edit-class/:id"]}
              component={ClassForm}
            />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
