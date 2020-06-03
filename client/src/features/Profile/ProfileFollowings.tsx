import React, { useContext, useEffect } from "react";
import { TabPane, Tab, Grid, Header, Card } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/RootStore";
import { observer } from "mobx-react-lite";
import ProfileCard from "./ProfileCard";
import { IProfile } from "../../app/_models/IProfile";
interface IProps {
  isFollowers: boolean;
}
const ProfileFollowings: React.FC<IProps> = ({ isFollowers }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    follows,
    loadingProfile,
    loadFollowings,
    activeTab,
  } = rootStore.profileStore;
  useEffect(() => {
    loadFollowings(isFollowers);
  }, [loadFollowings, isFollowers]);
  return (
    <Tab.Pane loading={loadingProfile} key={activeTab}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              isFollowers === true
                ? `People following ${profile!.fullName}`
                : `People ${profile!.fullName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {follows.map((profile: IProfile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileFollowings);
