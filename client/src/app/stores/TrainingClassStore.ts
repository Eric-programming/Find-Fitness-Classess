import { chatUrl } from "./../_constantVariables/_base";
import { _createAttendee } from "./../_helper/_createAttendee";
import { _setTrainingClass } from "./../_helper/_setTrainingClass";
import { observable, action } from "mobx";
import { ITrainingClass } from "../_models/ITrainingClasses";
import agent from "../api/agent";
import _getTime from "../_helper/_getTimes";
import _getSeconds from "../_helper/_getSeconds";
import { RootStore } from "./RootStore";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { base } from "../_constantVariables/_base";

export default class TrainingClassStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable trainingClassess: ITrainingClass[] = [];
  @observable loading: boolean = false;
  @observable selectedClass: ITrainingClass | null = null;
  @observable.ref hubConnection: HubConnection | null | undefined; //Only after the training class is loaded

  @action createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(chatUrl, {
        accessTokenFactory: () => this.rootStore.utilStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .catch((error) => console.log("Error establishing connection: ", error));

    this.hubConnection.on("ReceiveComment", (comment) => {
      this.selectedClass?.comments.push(comment);
    });
  };
  @action stopHubConnection = () => {
    this.hubConnection!.stop();
  };
  @action addComment = async (values: any) => {
    values.trainingClassesId = this.selectedClass!.id;
    try {
      await this.hubConnection!.invoke("SendComment", values); //Call the method direct to the Chat Hub
    } catch (error) {
      console.log(error);
    }
  };
  @action loadingTrainingClassess = async () => {
    this.loading = true;
    const { user } = this.rootStore.userStore;
    try {
      const tc = await agent.TrainingClass.list();
      this.trainingClassess = tc.map((e) => _setTrainingClass(e, user!));
      this.loading = false;
    } catch (error) {
      console.log("Error loading training classes::::", error);
      this.loading = false;
    }
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
        const { user } = this.rootStore.userStore;
        trainingclass = await agent.TrainingClass.details(id);
        this.selectedClass = _setTrainingClass(trainingclass, user!);
        this.loading = false;
        return trainingclass;
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.selectedClass = null;
      }
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
      const attendee = _createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      trainingclass.userTrainingClasses = attendees;
      trainingclass.isHost = true;

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

  @action attendActivity = async () => {
    this.loading = true;

    try {
      await agent.TrainingClass.attend(this.selectedClass!.id);
      if (this.selectedClass) {
        const attendee = _createAttendee(this.rootStore.userStore.user!);
        this.selectedClass.userTrainingClasses.push(attendee);
        this.selectedClass.isGoing = true;
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
      alert("Problem signing up to activity");
    }
  };

  @action cancelAttendance = async () => {
    this.loading = true;
    try {
      await agent.TrainingClass.unAttend(this.selectedClass!.id);
      if (this.selectedClass) {
        this.selectedClass.userTrainingClasses = this.selectedClass.userTrainingClasses.filter(
          (a) => a.userName !== this.rootStore.userStore.user!.userName
        );
        this.selectedClass.isGoing = false;
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
      alert("Problem cancelling attendance");
    }
  };
}
