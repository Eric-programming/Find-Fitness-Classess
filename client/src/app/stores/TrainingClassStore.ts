import { observable, action } from "mobx";
import { createContext } from "react";
import { ITrainingClass } from "../../Interfaces/ITrainingClasses";
import agent from "../api/agent";

class TrainingClassStore {
  @observable trainingClassess: ITrainingClass[] = [];
  @observable loading: boolean = false;
  @observable selectedClass: ITrainingClass | null = null;
  @observable editMode: boolean = false;

  @action loadingTrainingClassess = () => {
    this.loading = true;
    agent.TrainingClass.list()
      .then((res) => {
        this.trainingClassess = res;
      })
      .then(() => (this.loading = false));
  };
  @action deleteTrainingClass = (id: string) => {
    this.loading = true;
    agent.TrainingClass.deleteClass(id)
      .then(() => {
        this.trainingClassess = this.trainingClassess.filter(
          (x) => x.id !== id
        );
      })
      .then(() => (this.loading = false));
  };
  @action editTrainingClass = (trainingclass: ITrainingClass) => {
    this.loading = true;
    agent.TrainingClass.updateClass(trainingclass)
      .then(() => {
        this.trainingClassess.filter((x) => x.id !== trainingclass.id);
      })
      .then(() => (this.loading = false));
  };
  @action createTrainingClass = (trainingclass: ITrainingClass) => {
    this.loading = true;
    agent.TrainingClass.createClass(trainingclass)
      .then(() => {
        this.trainingClassess.push(trainingclass);
      })
      .then(() => (this.loading = false));
  };
  @action reset = () => {
    this.editMode = false;
    this.selectedClass = null;
  };
  @action editSelectClass = (id: string) =>
    (this.selectedClass = this.trainingClassess.filter((x) => x.id === id)[0]);
  @action editEditMode = (editMode: boolean) => (this.editMode = editMode);
}
export default createContext(new TrainingClassStore());
