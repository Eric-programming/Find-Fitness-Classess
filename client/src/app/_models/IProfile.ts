export interface IProfile {
  fullName: string;
  username: string;
  bio: string;
  image: string | null;
  isFollowed: boolean;
  followersCount: number;
  followingCount: number;
}
export interface IProfileEdit {
  fullName: string;
  bio: string;
}
export interface IProfileTrainingClass {
  id: string;
  title: string;
  category: string;
  time: string;
  dayOfWeek: number;
}
