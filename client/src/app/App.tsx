import React, { useState, useEffect } from "react";
import { Button, Container } from "semantic-ui-react";
import axios from "axios";
import { ITrainingClass } from "../Interfaces/ITrainingClasses";
import Navbar from "../features/Nav/Navbar";
import Landing from "../features/Nav/Landing";
import TrainingClassesDashboard from "../features/TrainingClasses/Dashboard/TrainingClassesDashboard";
const http = "http://localhost:4000/api/trainingclass";

function App() {
  const [Classess, setClassess] = useState<ITrainingClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<ITrainingClass | null>(
    null
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  //////////////////////////////////////////////////
  const handleSelectClass = (id: string) => {
    reset();
    setSelectedClass(Classess.filter((x) => x.id == id)[0]);
  };
  const handleEditMode = (editMode: boolean) => {
    setEditMode(editMode);
  };
  const reset = () => {
    setEditMode(false);
    setSelectedClass(null);
  };
  const handleCreateClass = (trainingclass: ITrainingClass) => {
    setClassess([...Classess, trainingclass]);
    setEditMode(false);
  };
  const handleEditClass = (trainingclass: ITrainingClass) => {
    setClassess([
      ...Classess.filter((x) => x.id != trainingclass.id),
      trainingclass,
    ]);
    setEditMode(false);
  };
  const handleDeleteClass = (id: string) => {
    setClassess([...Classess.filter((x) => x.id !== id)]);
  };
  ////////////////////////////////////////////////////
  useEffect(() => {
    axios.get(http).then((res) => {
      setClassess(res.data);
    });
  }, []);
  return (
    <>
      <Navbar reset={reset} handleEditMode={handleEditMode} />
      <Container style={{ marginTop: "7em" }}>
        <TrainingClassesDashboard
          trainingClassess={Classess}
          handleSelectClass={handleSelectClass}
          selectedClass={selectedClass}
          editMode={editMode}
          handleEditMode={handleEditMode}
          reset={reset}
          handleEditClass={handleEditClass}
          handleCreateClass={handleCreateClass}
          handleDeleteClass={handleDeleteClass}
        />
      </Container>
    </>
  );
}

export default App;
