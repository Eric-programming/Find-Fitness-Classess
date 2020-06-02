import React, { useContext } from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileDescription from "./ProfileDescription";
import ProfileLikes from "./ProfileLikes";
import ProfileClassess from "./ProfileClassess";
import { RootStoreContext } from "../../app/stores/RootStore";

const EditPhoto = "Edit Photo";
const panes = [
  { menuItem: "About", render: () => <ProfileDescription /> },
  { menuItem: EditPhoto, render: () => <ProfilePhotos /> },
  {
    menuItem: "Activities",
    render: () => <ProfileClassess />,
  },
  { menuItem: "Likes", render: () => <ProfileLikes /> },
  { menuItem: "Unlikes", render: () => <ProfileLikes /> },
];

// interface IProps {
//     setActiveTab: (activeIndex: any) => void;
// }

const ProfileContent =
  // : React.FC<IProps>
  () =>
    // { setActiveTab }
    {
      const rootStore = useContext(RootStoreContext);
      const { isCurrentUser } = rootStore.profileStore;
      return (
        <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition="right"
          panes={
            !isCurrentUser
              ? panes.filter((e) => e.menuItem !== EditPhoto)
              : panes
          }
          // onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
      );
    };

export default ProfileContent;
