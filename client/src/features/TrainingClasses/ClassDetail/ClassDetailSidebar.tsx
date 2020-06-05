import React from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IUserTrainingClass } from "../../../app/_models/IUserTrainingClasses";
import { observer } from "mobx-react-lite";
interface IProps {
  attendees: IUserTrainingClass[];
}
const ClassDetailSidebar: React.FC<IProps> = ({ attendees }) => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} people are going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((e) => (
            <Item key={e.userName} style={{ position: "relative" }}>
              {e.isHost && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
              )}
              <Image size="tiny" src={e.image || "/assets/user.jpg"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profile/${e.userName}`}>{e.fullName}</Link>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
};

export default observer(ClassDetailSidebar);
