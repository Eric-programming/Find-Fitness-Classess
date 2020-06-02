import React, { Fragment, useContext, useState } from "react";
import {
  Container,
  Segment,
  Header,
  Button,
  Card,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { trainingClassessLink } from "../../app/_constantVariables/_Links";
import { RootStoreContext } from "../../app/stores/RootStore";
import LoginForm from "../User/loginForm";
import RegisterForm from "../User/RegisterForm";
import { _api_trainingClassess } from "../../app/_constantVariables/_apiLinks";

const HomeComponent = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const [toLogin, setToLogin] = useState(true);
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        {isLoggedIn ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user?.fullName}`}
            />
            <Button as={Link} to={trainingClassessLink} size="huge" inverted>
              Go to activities!
            </Button>
          </Fragment>
        ) : (
          <Card centered style={{ width: "40rem", height: "38rem" }}>
            <Card.Content style={{ padding: "3rem" }}>
              {toLogin ? (
                <LoginForm key="login" />
              ) : (
                <RegisterForm key="signup" />
              )}
            </Card.Content>
            <Card.Content extra onClick={() => setToLogin(!toLogin)}>
              <b>{toLogin ? "Sign up here!" : "Sign in here!"}</b>
              <Icon name="angle double right" />
            </Card.Content>
          </Card>
        )}
      </Container>
    </Segment>
  );
};

export default HomeComponent;
