import { observable, action } from "mobx";
import { createContext } from "react";
import { ITrainingClass } from "../_models/ITrainingClasses";
import agent from "../api/agent";
import _getTime from "../_helper/_getTimes";
import _getSeconds from "../_helper/_getSeconds";

class TrainingClassStore {
  @observable trainingClassess: ITrainingClass[] = [];
  @observable loading: boolean = false;
  @observable selectedClass: ITrainingClass | null = null;

  @action loadingTrainingClassess = async () => {
    this.loading = true;
    try {
      this.trainingClassess = await agent.TrainingClass.list();
    } catch (error) {
      console.log("Error loading training classes::::", error);
    }
    this.loading = false;
  };

  @action GroupClassess(
    trainingClassess: ITrainingClass[],
    isDescending: boolean
  ) {
    trainingClassess = trainingClassess.sort(
      (a: ITrainingClass, b: ITrainingClass) => {
        const ahms = _getSeconds(_getTime(a.time).hr, _getTime(a.time).min);
        const bhms = _getSeconds(_getTime(b.time).hr, _getTime(b.time).min);
        return isDescending ? bhms - ahms : ahms - bhms;
      }
    );
    let finalArr = [];
    let tempArr = [];
    for (let index = 0; index < trainingClassess.length; index++) {
      if (
        tempArr.length !== 0 &&
        _getTime(tempArr[tempArr.length - 1].time).hr !==
          _getTime(trainingClassess[index].time).hr
      ) {
        finalArr.push(tempArr);
        tempArr = [];
      }
      tempArr.push(trainingClassess[index]);
      if (index === trainingClassess.length - 1) {
        finalArr.push(tempArr);
      }
    }
    return finalArr;
  }
  @action getTrainingClass = async (id: string) => {
    let trainingclass = this.trainingClassess.filter((x) => x.id === id)[0];
    if (trainingclass) {
      this.selectedClass = trainingclass;
      return trainingclass;
    } else {
      this.loading = true;
      try {
        trainingclass = await agent.TrainingClass.details(id);
        this.selectedClass = trainingclass;
      } catch (error) {
        console.log(error);
        this.selectedClass = null;
      }
      this.loading = false;
      return this.selectedClass;
    }
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
      this.editSelectClass(trainingclass.id);
    } catch (error) {
      console.log("error for creating training class", error);
    }
    this.loading = false;
  };
  @action reset = () => {
    this.selectedClass = null;
  };
  @action editSelectClass = (id: string) =>
    (this.selectedClass = this.trainingClassess.filter((x) => x.id === id)[0]);
}
export default createContext(new TrainingClassStore());
