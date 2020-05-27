import React, { useContext } from "react";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import {
  homeLink,
  trainingClassessLink,
} from "../../app/_constantVariables/_Links";
import { RootStoreContext } from "../../app/stores/RootStore";

const Navbar = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
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
        {user && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={"/assets/user.jpg"} />
            <Dropdown pointing="top left" text={user.fullName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.userName}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
