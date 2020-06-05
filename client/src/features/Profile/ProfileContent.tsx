import React, { useContext } from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileDescription from "./ProfileDescription";
import ProfileFollowings from "./ProfileFollowings";
import { RootStoreContext } from "../../app/stores/RootStore";
import ProfileTrainingClassess from "./ProfileTrainingClassess";

const EditPhoto = "Edit Photo";
const panes = [
  { menuItem: "About", render: () => <ProfileDescription /> },
  { menuItem: EditPhoto, render: () => <ProfilePhotos /> },
  {
    menuItem: "Training Classess",
    render: () => <ProfileTrainingClassess />,
  },
  {
    menuItem: "Followers",
    render: () => <ProfileFollowings isFollowers={true} />,
  },
  {
    menuItem: "Followings",
    render: () => <ProfileFollowings isFollowers={false} />,
  },
];

// interface IProps {
//     setActiveTab: (activeIndex: any) => void;
// }

const ProfileContent = () => {
  const rootStore = useContext(RootStoreContext);
  const { isCurrentUser, setActiveTab } = rootStore.profileStore;
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      panes={
        !isCurrentUser ? panes.filter((e) => e.menuItem !== EditPhoto) : panes
      }
      // onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default ProfileContent;
