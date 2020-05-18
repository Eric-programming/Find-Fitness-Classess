import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { ITrainingClass } from "../Interfaces/ITrainingClasses";
import Navbar from "../features/Nav/Navbar";
import TrainingClassesDashboard from "../features/TrainingClasses/Dashboard/TrainingClassesDashboard";
import agent from "./api/agent";
import LoadingComponent from "../components/LoadingComponent";
interface Loading {
  isLoading: boolean;
  text: string;
}
function App() {
  const [Classess, setClassess] = useState<ITrainingClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<ITrainingClass | null>(
    null
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<Loading>({
    isLoading: false,
    text: "",
  });

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
    setLoading({
      ...loading,
      isLoading: true,
    });
    agent.TrainingClass.createClass(trainingclass)
      .then(() => {
        reset();
        setClassess([...Classess, trainingclass]);
      })
      .then(() =>
        setLoading({
          ...loading,
          isLoading: false,
        })
      );
  };
  const handleEditClass = (trainingclass: ITrainingClass) => {
    setLoading({
      ...loading,
      isLoading: true,
      text: "Saving...",
    });
    agent.TrainingClass.updateClass(trainingclass)
      .then(() => {
        reset();
        setClassess([
          ...Classess.filter((x) => x.id !== trainingclass.id),
          trainingclass,
        ]);
      })
      .then(() =>
        setLoading({
          ...loading,
          isLoading: false,
        })
      );
  };
  const handleDeleteClass = (id: string) => {
    setLoading({
      ...loading,
      isLoading: true,
      text: "Saving...",
    });
    agent.TrainingClass.deleteClass(id)
      .then(() => {
        reset();
        setClassess([...Classess.filter((x) => x.id !== id)]);
      })
      .then(() =>
        setLoading({
          ...loading,
          isLoading: false,
        })
      );
  };
  ////////////////////////////////////////////////////
  useEffect(() => {
    setLoading({
      ...loading,
      isLoading: true,
    });
    agent.TrainingClass.list()
      .then((res) => {
        setClassess(res);
      })
      .then(() =>
        setLoading({
          ...loading,
          isLoading: false,
        })
      );
  }, []);
  return (
    <>
      {loading.isLoading ? (
        <LoadingComponent />
      ) : (
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
      )}
    </>
  );
}

export default App;
