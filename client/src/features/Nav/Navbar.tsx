import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
interface IProps {
  handleEditMode: (editMode: boolean) => void;
  reset: () => void;
}
const Navbar: React.FC<IProps> = ({ handleEditMode, reset }) => {
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
          <Button
            positive
            content="Create a Class"
            onClick={() => {
              reset();
              handleEditMode(true);
            }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
