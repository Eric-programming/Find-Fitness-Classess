import React, { useContext, useState } from "react";
import { Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/RootStore";
import PhotoUploadWidget from "../../components/PhotoUpload/PhotoUploadWidget";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    // profile,
    // isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    // setMainPhoto,
    // deletePhoto,
    // loading,
  } = rootStore.profileStore;
  const [] = useState(false);
  const [] = useState<string | undefined>(undefined);
  const [] = useState<string | undefined>(undefined);

  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo);
  };

  return (
    <Tab.Pane>
      <PhotoUploadWidget
        loading={uploadingPhoto}
        uploadPhoto={handleUploadImage}
      />
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
