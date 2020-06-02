import { IProfileEdit } from "./../_models/IProfile";
import { RootStore } from "./RootStore";
import { observable, action, computed } from "mobx";
import agent from "../api/agent";
import { IProfile } from "../_models/IProfile";

export default class ProfileStore {
  rootStore: RootStore;
  @observable uploadingPhoto: boolean = false;
  @observable profile: IProfile | null = null;
  @observable loadingProfile: boolean = true;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    // reaction(
    //   () => this.activeTab,
    //   (activeTab) => {
    //     if (activeTab === 3 || activeTab === 4) {
    //       const predicate = activeTab === 3 ? "followers" : "following";
    //       this.loadFollowings(predicate);
    //     } else {
    //       this.followings = [];
    //     }
    //   }
    // );
  }
  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profile.addPhoto(file);
      if (this.profile) {
        this.profile.image = photo.url;
        if (this.rootStore.userStore.user) {
          this.rootStore.userStore.user.image = photo.url;
        }
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
      this.loadingProfile = false;
      alert("Problem deleting photo");
    }
  };

  //   @observable uploadingPhoto = false;
  //   @observable loading = false;
  //   @observable followings: IProfile[] = [];
  //   @observable activeTab: number = 0;
  //   @observable userActivities: IUserActivity[] = [];
  //   @observable loadingActivities = false;

  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.userName === this.profile.username;
    }
    return false;
  }

  //   @action loadUserActivities = async (username: string, predicate?: string) => {
  //     this.loadingActivities = true;
  //     try {
  //       const activities = await agent.Profiles.listActivities(
  //         username,
  //         predicate!
  //       );
  //       runInAction(() => {
  //         this.userActivities = activities;
  //         this.loadingActivities = false;
  //       });
  //     } catch (error) {
  //       toast.error("Problem loading activities");
  //       runInAction(() => {
  //         this.loadingActivities = false;
  //       });
  //     }
  //   };

  //   @action setActiveTab = (activeIndex: number) => {
  //     this.activeTab = activeIndex;
  //   };

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profile.getProfile(username);
      this.profile = profile;
      this.loadingProfile = false;
    } catch (error) {
      this.loadingProfile = false;
      console.log(error);
    }
  };

  //   @action uploadPhoto = async (file: Blob) => {
  //     this.uploadingPhoto = true;
  //     try {
  //       const photo = await agent.Profiles.uploadPhoto(file);
  //       runInAction(() => {
  //         if (this.profile) {
  //           this.profile.photos.push(photo);
  //           if (photo.isMain && this.rootStore.userStore.user) {
  //             this.rootStore.userStore.user.image = photo.url;
  //             this.profile.image = photo.url;
  //           }
  //         }
  //         this.uploadingPhoto = false;
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Problem uploading photo");
  //       runInAction(() => {
  //         this.uploadingPhoto = false;
  //       });
  //     }
  //   };

  @action updateProfile = async (profile: IProfileEdit) => {
    console.log("profile", profile);
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

  //   @action follow = async (username: string) => {
  //     this.loading = true;
  //     try {
  //       await agent.Profiles.follow(username);
  //       runInAction(() => {
  //         this.profile!.following = true;
  //         this.profile!.followersCount++;
  //         this.loading = false;
  //       });
  //     } catch (error) {
  //       toast.error("Problem following user");
  //       runInAction(() => {
  //         this.loading = false;
  //       });
  //     }
  //   };

  //   @action unfollow = async (username: string) => {
  //     this.loading = true;
  //     try {
  //       await agent.Profiles.unfollow(username);
  //       runInAction(() => {
  //         this.profile!.following = false;
  //         this.profile!.followersCount--;
  //         this.loading = false;
  //       });
  //     } catch (error) {
  //       toast.error("Problem unfollowing user");
  //       runInAction(() => {
  //         this.loading = false;
  //       });
  //     }
  //   };

  //   @action loadFollowings = async (predicate: string) => {
  //     this.loading = true;
  //     try {
  //       const profiles = await agent.Profiles.listFollowings(
  //         this.profile!.username,
  //         predicate
  //       );
  //       runInAction(() => {
  //         this.followings = profiles;
  //         this.loading = false;
  //       });
  //     } catch (error) {
  //       toast.error("Problem loading followings");
  //       runInAction(() => {
  //         this.loading = false;
  //       });
  //     }
  //   };
}
