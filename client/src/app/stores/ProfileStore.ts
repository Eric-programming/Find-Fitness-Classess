import { IProfileEdit, IProfileTrainingClass } from "./../_models/IProfile";
import { RootStore } from "./RootStore";
import { observable, action, computed } from "mobx";
import agent from "../api/agent";
import { IProfile } from "../_models/IProfile";

export default class ProfileStore {
  rootStore: RootStore;
  @observable uploadingPhoto: boolean = false;
  @observable profile: IProfile | null = null;
  @observable loadingProfile: boolean = true;
  @observable follows: IProfile[] = [];
  @observable activeTab: number = 0;
  @observable userTrainingClassess: IProfileTrainingClass[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profile.addPhoto(file);
      if (this.profile) {
        this.profile.image = photo.url;
        const { user } = this.rootStore.userStore;
        this.rootStore.trainingClassessStore.changeImage(
          photo.url,
          user!.userName!
        );
        this.rootStore.userStore.changeImage(photo.url);
      }
      this.uploadingPhoto = false;
    } catch (error) {
      console.log(error);
      alert(error);
      this.uploadingPhoto = false;
    }
  };
  @action deletePhoto = async () => {
    this.loadingProfile = true;
    try {
      await agent.Profile.deletePhoto(this.rootStore.userStore.user?.userName!);
      this.profile!.image = null;
      this.loadingProfile = false;
    } catch (error) {
      console.log("error", error);
      alert("Problem deleting photo");
      this.loadingProfile = false;
    }
  };

  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.userName === this.profile.username;
    }
    return false;
  }

  @action setActiveTab = (activeIndex: any) => {
    this.activeTab = activeIndex;
  };

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profile.getProfile(username);
      this.profile = profile;
      this.loadingProfile = false;
    } catch (error) {
      alert("Fail load profile");
      this.loadingProfile = false;
      console.log(error);
    }
  };

  @action updateProfile = async (profile: IProfileEdit) => {
    try {
      const updatedProfile = await agent.Profile.editProfile(profile);
      if (this.rootStore.userStore.user!.userName) {
        this.rootStore.userStore.user!.fullName = profile.fullName!;
      }
      this.profile = { ...this.profile!, ...updatedProfile };
    } catch (error) {
      alert("Problem updating profile");
    }
  };

  @action follow = async (username: string) => {
    this.loadingProfile = true;
    try {
      await agent.Profile.follow(username);
      this.profile!.isFollowed = true;
      this.profile!.followersCount++;
      this.loadingProfile = false;
    } catch (error) {
      alert("Problem following user");
      this.loadingProfile = false;
    }
  };

  @action unfollow = async (username: string) => {
    this.loadingProfile = true;
    try {
      await agent.Profile.unfollow(username);
      this.profile!.isFollowed = false;
      this.profile!.followersCount--;
      this.loadingProfile = false;
    } catch (error) {
      alert("Problem unfollowing user");
      this.loadingProfile = false;
    }
  };
  @action loadFollowings = async (isFollower: boolean) => {
    try {
      const profiles = await agent.Profile.listFollowings(
        this.profile!.username,
        isFollower
      );
      this.follows = profiles;
      this.loadingProfile = false;
    } catch (error) {
      alert("Problem loading followings");
      this.loadingProfile = false;
    }
  };
  @action loadProfileTrainingClassess = async (
    username: string,
    isHost: boolean
  ) => {
    try {
      const ut = await agent.Profile.getProfileTrainingClassess(
        username,
        isHost
      );
      this.userTrainingClassess = ut;
      this.loadingProfile = false;
    } catch (error) {
      alert("Problem loading activities");
      this.loadingProfile = false;
    }
  };
}
