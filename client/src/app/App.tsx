import React, { useEffect, useContext } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../features/Nav/Navbar";
import TrainingClassesDashboard from "../features/TrainingClasses/Dashboard/TrainingClassesDashboard";
import LoadingComponent from "../components/LoadingComponent";
import TrainingClassStore from "./stores/TrainingClassStore";
import { observer } from "mobx-react-lite";
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
            <TrainingClassesDashboard />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
