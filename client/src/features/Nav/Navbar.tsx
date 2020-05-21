import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import {
  homeLink,
  trainingClassessLink,
} from "../../app/_constantVariables/_Links";

const Navbar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={Link} exact={true} to={homeLink}>
          <h1>
            <i className="fas fa-hands-helping"></i>Find Trainer
          </h1>
        </Menu.Item>
        <Menu.Item name="Trainers" />
        <Menu.Item name="Classes" as={NavLink} to={trainingClassessLink} />

        <Menu.Item>
          <Button
            positive
            content="Create a Class"
            as={NavLink}
            to="/create-class"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
