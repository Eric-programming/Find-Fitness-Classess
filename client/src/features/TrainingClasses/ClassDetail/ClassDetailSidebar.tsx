import React, { Fragment } from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
// interface IProps {
//   attendees: IAttendee[];
// }
const ClassDetailSidebar = () => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        asdasdasd going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item key={1} style={{ position: "relative" }}>
            <Label
              style={{ position: "absolute" }}
              color="orange"
              ribbon="right"
            >
              Host
            </Label>
            <Image size="tiny" />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to="/">name</Link>
              </Item.Header>
              <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </Fragment>
  );
};

export default ClassDetailSidebar;
