import React, { Fragment } from "react";
import { Container, Segment, Image, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { trainingClassessLink } from "../../app/_constantVariables/_Links";

const HomeComponent = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <i className="fas fa-hands-helping"></i>Find Trainer
        </Header>
        {/* {isLoggedIn && user && token ? ( */}
        <Fragment>
          <Header as="h2" inverted content={`Welcome back Eric`} />
          <Button as={Link} to={trainingClassessLink} size="huge" inverted>
            Go to activities!
          </Button>
        </Fragment>
        {/* // ) : (
        //     <Fragment>
        //       <Header as='h2' inverted content={`Welcome to Reactivitities`} />
        //       <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
        //         Login
        //   </Button>
        //       <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
        //         Register
        //   </Button>
        //     </Fragment>
        //   )} */}
      </Container>
    </Segment>
  );
};

export default HomeComponent;
