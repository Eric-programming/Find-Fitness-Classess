import React, { useContext } from "react";
import { Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/RootStore";
import PhotoUploadWidget from "../../components/PhotoUpload/PhotoUploadWidget";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const { uploadPhoto, uploadingPhoto } = rootStore.profileStore;

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
