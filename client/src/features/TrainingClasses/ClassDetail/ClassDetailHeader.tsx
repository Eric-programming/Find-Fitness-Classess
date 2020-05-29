import React from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { ITrainingClass } from "../../../app/_models/ITrainingClasses";
import { Link } from "react-router-dom";
import _addHypthen from "../../../app/_helper/_addHypthen";
const trainingClassImageStyle = {
  filter: "brightness(30%)",
};

const trainingClassImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};
const ClassDetailHeader: React.FC<{ trainingClass: ITrainingClass }> = ({
  trainingClass,
}) => {
  return (
    <>
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            src={`/assets/${_addHypthen(trainingClass.category)}.jpeg`}
            fluid
            style={trainingClassImageStyle}
          />
          <Segment style={trainingClassImageTextStyle} basic>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={trainingClass.title}
                    style={{ color: "white" }}
                  />
                  <p>{trainingClass.time}</p>
                  <p>
                    Hosted by Bob
                    {/* <Link to={`/profile/${host.username}`}>
                      <strong>{host.displayName}</strong>
                    </Link> */}
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment clearing attached="bottom">
          {trainingClass.isHost ? (
            <Button
              as={Link}
              to={`/edit-class/${trainingClass.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          ) : trainingClass.isGoing ? (
            <Button>Cancel attendance</Button>
          ) : (
            <Button color="teal">Join trainingClass</Button>
          )}
        </Segment>
      </Segment.Group>
    </>
  );
};

export default ClassDetailHeader;
