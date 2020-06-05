import React, { useContext } from "react";
import {
  Segment,
  Item,
  Header,
  Button,
  Grid,
  Statistic,
  Divider,
} from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { IProfile } from "../../app/_models/IProfile";
import { RootStoreContext } from "../../app/stores/RootStore";

interface IProps {
  profile: IProfile;
}

const ProfileHeader: React.FC<IProps> = ({ profile }) => {
  const RootStore = useContext(RootStoreContext);
  const {
    deletePhoto,
    unfollow,
    follow,
    isCurrentUser,
  } = RootStore.profileStore;
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile?.image || "/assets/user.jpg"}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1">{profile?.fullName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followings" value={profile.followingCount} />
            <Statistic label="Followers" value={profile.followersCount} />
          </Statistic.Group>
          <Divider />

          {!isCurrentUser ? (
            <>
              <Button
                fluid
                color={!profile.isFollowed ? "teal" : "red"}
                content={profile.isFollowed ? "UnFollow" : "Follow"}
                onClick={() =>
                  profile.isFollowed
                    ? unfollow(profile.username)
                    : follow(profile.username)
                }
              />
            </>
          ) : null}
          {profile.image !== null ? (
            <Button
              style={{ marginTop: "1%" }}
              onClick={() => deletePhoto()}
              fluid
              basic
              color="red"
              content="Delete Photo"
            />
          ) : null}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
