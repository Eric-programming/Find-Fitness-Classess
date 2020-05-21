import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { trainingClassessLink } from "../../app/_constantVariables/_Links";

const HomeComponent = () => {
  return (
    <Container style={{ marginTop: "7em" }}>
      <h1>Home page</h1>
      <Link to={trainingClassessLink}>Go to list</Link>
    </Container>
  );
};

export default HomeComponent;
