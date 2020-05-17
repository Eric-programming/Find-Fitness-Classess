import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <h1>
            <i className="fas fa-hands-helping"></i>Find Trainer
          </h1>
        </Menu.Item>
        <Menu.Item name="Trainers" />
        <Menu.Item name="Classes" />
        <Menu.Item>
          <Button positive content="Create a Class" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
