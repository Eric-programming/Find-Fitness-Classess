import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import TrainingClassStore from "../../app/stores/TrainingClassStore";
import { observer } from "mobx-react-lite";

const Navbar = () => {
  const trainingClassStore = useContext(TrainingClassStore);
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
              trainingClassStore.reset();
              trainingClassStore.editEditMode(true);
            }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
