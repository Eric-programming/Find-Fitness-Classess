import React, { useContext } from "react";
import {
  Segment,
  Item,
  Header,
  Button,
  Grid,
  Statistic,
  Divider,
  Reveal,
} from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { IProfile } from "../../app/_models/IProfile";
import { RootStoreContext } from "../../app/stores/RootStore";

interface IProps {
  profile: IProfile;
  //   loading: boolean;
  //   follow: (username: string) => void;
  //   unfollow: (username: string) => void;
}

const ProfileHeader: React.FC<IProps> = ({
  profile,
  //   loading,
  //   follow,
  //   unfollow,
}) => {
  const RootStore = useContext(RootStoreContext);
  const { deletePhoto } = RootStore.profileStore;
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
            <Statistic label="Like" value={140} />
            <Statistic label="Dislike" value={100} />
          </Statistic.Group>
          <Divider />

          <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="teal" content={false ? "Like" : "Unlike"} />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Button
                //   loading={loading}
                fluid
                basic
                color={false ? "red" : "green"}
                content={true ? "Like" : "Unlike"}
              />
            </Reveal.Content>
          </Reveal>
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
