import React, { useState, useEffect } from "react";
import { Button, Container } from "semantic-ui-react";
import axios from "axios";
import { ITrainingClass } from "../Interfaces/ITrainingClasses";
import Navbar from "../features/Nav/Navbar";
import Landing from "../features/Nav/Landing";
import TrainingClassesDashboard from "../features/TrainingClasses/Dashboard/TrainingClassesDashboard";
const http = "http://localhost:4000/api/trainingclass";

function App() {
  const [value, setValue] = useState<ITrainingClass[]>([]);
  useEffect(() => {
    axios.get(http).then((res) => {
      setValue(res.data);
      console.log("res.data", res.data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <TrainingClassesDashboard trainingClassess={value} />
      </Container>
    </>
  );
}

export default App;
