import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { ITrainingClass } from "../../Interfaces/ITrainingClasses";
import agent from "../api/agent";
import _getTime from "../_helper/_getTimes";
import _getSeconds from "../_helper/_getSeconds";

class TrainingClassStore {
  @observable trainingClassess: ITrainingClass[] = [];
  @observable loading: boolean = false;
  @observable selectedClass: ITrainingClass | null = null;
  @observable editMode: boolean = false;

  @action loadingTrainingClassess = async () => {
    this.loading = true;
    try {
      const trainingClassess = await agent.TrainingClass.list();
      this.trainingClassess = trainingClassess;
    } catch (error) {
      console.log("Error loading training classes::::", error);
    }
    this.loading = false;
  };
  @computed get SortActivity() {
    return this.trainingClassess.sort((a, b) => {
      const ahms = _getSeconds(_getTime(a.time).hr, _getTime(a.time).min);
      const bhms = _getSeconds(_getTime(b.time).hr, _getTime(b.time).min);
      return ahms - bhms;
    });
  }
  @action getTrainingClass = async (id: string) => {
    this.loading = true;
    try {
      const tc = await agent.TrainingClass.details(id);
      this.selectedClass = tc;
    } catch (error) {
      this.selectedClass = null;
    }
    this.loading = false;
  };
  @action deleteTrainingClass = async (id: string) => {
    this.loading = true;
    try {
      await agent.TrainingClass.deleteClass(id);
      this.trainingClassess = this.trainingClassess.filter((x) => x.id !== id);
      this.selectedClass = null;
    } catch (error) {
      console.log("error for deleting training class", error);
    }
    this.loading = false;
  };
  @action editTrainingClass = async (trainingclass: ITrainingClass) => {
    this.loading = true;
    try {
      await agent.TrainingClass.updateClass(trainingclass);
      this.trainingClassess = this.trainingClassess.filter(
        (x) => x.id !== trainingclass.id
      );
      this.trainingClassess.unshift(trainingclass);
      this.editEditMode(false);
      this.editSelectClass(trainingclass.id);
    } catch (error) {
      console.log("error", error);
    }
    this.loading = false;
  };
  @action createTrainingClass = async (trainingclass: ITrainingClass) => {
    this.loading = true;
    try {
      await agent.TrainingClass.createClass(trainingclass);
      this.trainingClassess.unshift(trainingclass);
      this.editEditMode(false);
      this.editSelectClass(trainingclass.id);
    } catch (error) {
      console.log("error for creating training class", error);
    }
    this.loading = false;
  };
  @action reset = () => {
    this.editMode = false;
    this.selectedClass = null;
    console.log("this.selectedClass", this.selectedClass);
  };
  @action editSelectClass = (id: string) =>
    (this.selectedClass = this.trainingClassess.filter((x) => x.id === id)[0]);
  @action editEditMode = (editMode: boolean) => (this.editMode = editMode);
}
export default createContext(new TrainingClassStore());
