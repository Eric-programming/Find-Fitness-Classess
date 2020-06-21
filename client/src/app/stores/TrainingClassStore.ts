import { IUserTrainingClass } from "./../_models/IUserTrainingClasses";
import { ITrainingClass } from "./../_models/ITrainingClasses";
import { _printError } from "./../_helper/_printError";
import { _store_take } from "./../_constantVariables/_store";
import { chatUrl } from "./../_constantVariables/_base";
import { _createAttendee } from "./../_helper/_createAttendee";
import { _setTrainingClass } from "./../_helper/_setTrainingClass";
import { observable, action, computed } from "mobx";
import agent from "../api/agent";
import _getTime from "../_helper/_getTimes";
import { RootStore } from "./RootStore";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

export default class TrainingClassStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable trainingClassess: ITrainingClass[] = [];
  @observable loading: boolean = false;
  @observable selectedClass: ITrainingClass | null = null;
  @observable.ref hubConnection: HubConnection | null | undefined; //Only after the training class is loaded
  @observable totalItems: number = 0;
  @observable currentPage: number = 0;
  @observable predicate = new Map();
  @computed get totalPages() {
    return Math.ceil(this.totalItems / _store_take);
  }
  @action resetTC = () => {
    this.trainingClassess = [];
    this.selectedClass = null;
    this.loading = false;
    this.totalItems = 0;
    this.currentPage = 0;
  };
  @action setPredicate = (predicate: string, value: string | Date) => {
    this.predicate.clear();
    if (predicate !== "all") {
      this.predicate.set(predicate, value);
    }
    this.resetFilter();
  };
  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append("take", String(_store_take));
    params.append(
      "skip",
      `${this.currentPage ? this.currentPage * _store_take : 0}`
    );
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }
  @action resetFilter = () => {
    this.currentPage = 0;
    this.trainingClassess = [];
    this.loadingTrainingClassess();
  };
  @action setCurrentPage = (page: number) => (this.currentPage = page);
  @action createHubConnection = (tcId: string) => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(chatUrl, {
        accessTokenFactory: () => this.rootStore.utilStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .then(() => {
        console.log("Attemping to join group");
        this.hubConnection!.invoke("AddToGroup", tcId);
      })
      .catch((error) => console.log("Error establishing connection: ", error));

    this.hubConnection.on("ReceiveComment", (comment) => {
      this.selectedClass?.comments.push(comment);
    });
  };
  @action stopHubConnection = () => {
    this.hubConnection!.invoke("RemoveFromGroup", this.selectedClass?.id)
      .then(() => {
        this.hubConnection!.stop();
      })
      .catch((err) => console.log(err));
  };
  @action addComment = async (values: any) => {
    values.trainingClassesId = this.selectedClass!.id;
    try {
      await this.hubConnection!.invoke("SendComment", values); //Call the method direct to the Chat Hub
    } catch (error) {
      _printError(error, "Add Comment");
    }
  };
  @action loadingTrainingClassess = async () => {
    this.loading = true;
    const { user } = this.rootStore.userStore;
    try {
      const { trainingClasses, totalCount } = await agent.TrainingClass.list(
        this.axiosParams
      );
      const newTC = trainingClasses;
      this.totalItems = totalCount;
      this.trainingClassess.push(
        ...newTC.filter((e) => {
          const dup = this.trainingClassess.some((x) => x.id === e.id);
          if (!dup || this.trainingClassess.length === 0) {
            return _setTrainingClass(e, user!);
          }
        })
      );
      this.loading = false;
    } catch (error) {
      _printError(error, "Loading Training Classess");
      this.loading = false;
    }
  };

  @action GroupClassess(trainingClassess: ITrainingClass[]) {
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
        _printError(error, "Get Training Classess");
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
      this.loading = false;
    } catch (error) {
      _printError(error, "Delete Training Classess");
      this.loading = false;
    }
  };
  @action editTrainingClass = async (trainingclass: ITrainingClass) => {
    const { user } = this.rootStore.userStore;
    this.loading = true;
    try {
      await agent.TrainingClass.updateClass(trainingclass);
      this.trainingClassess = this.trainingClassess.filter(
        (x) => x.id !== trainingclass.id
      );
      this.trainingClassess.unshift(_setTrainingClass(trainingclass, user!));
      this.editSelectClass(trainingclass.id);
      this.loading = false;
    } catch (error) {
      _printError(error, "Edit Training Classess");
      this.loading = false;
    }
  };
  @action createTrainingClass = async (trainingclass: ITrainingClass) => {
    const { user } = this.rootStore.userStore;
    this.loading = true;
    try {
      await agent.TrainingClass.createClass(trainingclass);
      //Create Attendee
      const attendee = _createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      //Create Comments
      trainingclass.comments = [];
      trainingclass.userTrainingClasses = attendees;
      trainingclass.isHost = true;

      this.trainingClassess.unshift(_setTrainingClass(trainingclass, user!));
      // this.trainingClassess.sort((a,b)=>_getTime(a.time).hr - _getTime(b.time).hr)
      this.trainingClassess = this.trainingClassess.sort(
        (a, b) => _getTime(a.time).hr - _getTime(b.time).hr
      );
      this.editSelectClass(trainingclass.id);
      this.loading = false;
    } catch (error) {
      _printError(error, "Create Training Classess");
      this.loading = false;
    }
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
      _printError(error, "Attend Training Classess");
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
      _printError(error, "Cancel attending Training Classess");
    }
  };
  @action changeImage = (imageUrl: string | null, userName: string) => {
    this.trainingClassess = this.trainingClassess.map((e: ITrainingClass) => {
      let isHost = false;
      const ut = e.userTrainingClasses.map((y: IUserTrainingClass) => {
        if (y.userName === userName) {
          y.image = imageUrl;
          if (y.isHost) {
            isHost = true;
          }
        }
        return y;
      });
      e.userTrainingClasses = ut;
      if (isHost) {
        e.hostImage = imageUrl;
      }
      return e;
    });
  };
}
