import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { trainingClassessLink } from "../app/_constantVariables/_Links";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere but couldn't find this.
      </Header>
      <Segment.Inline>
        <Button as={Link} to={trainingClassessLink} primary>
          Return to Dashboard page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
