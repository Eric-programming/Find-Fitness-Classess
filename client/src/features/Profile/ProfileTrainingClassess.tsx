import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/RootStore";
import { IProfileTrainingClass } from "../../app/_models/IProfile";
import { trainingClassessLink } from "../../app/_constantVariables/_Links";
import _addHypthen from "../../app/_helper/_addHypthen";
import { getDayOfWeek } from "../../app/_helper/_getDayOfWeekWords";

const panes = [
  { menuItem: "Going", pane: { key: "going" } },
  { menuItem: "Hosting", pane: { key: "hosted" } },
];

const ProfileEvents = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    loadProfileTrainingClassess,
    loadingProfile,
    userTrainingClassess,
  } = rootStore.profileStore!;

  useEffect(() => {
    loadProfileTrainingClassess(profile!.username, false);
  }, [loadProfileTrainingClassess, profile]);

  const handleTabChange = (data: TabProps) => {
    let h;
    switch (data.activeIndex) {
      case 1:
        h = true;
        break;
      default:
        h = false;
        break;
    }
    loadProfileTrainingClassess(profile!.username, h);
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Classess"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userTrainingClassess.map((tc: IProfileTrainingClass) => (
              <Card
                as={Link}
                to={`${trainingClassessLink}/${tc.id}`}
                key={tc.id}
              >
                <Image
                  src={`/assets/${_addHypthen(tc.category)}.jpeg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{tc.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>
                      Every {getDayOfWeek(tc.dayOfWeek!)} at {tc.time}
                    </div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileEvents);
