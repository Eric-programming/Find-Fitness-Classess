import React, { Fragment } from "react";
import {
  Segment,
  Header,
  Comment,
  Form,
  TextArea,
  Button,
} from "semantic-ui-react";

const ClassDetailChat = () => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar />
            <Comment.Content>
              <Comment.Author>adasdasd</Comment.Author>
              <Comment.Metadata>
                <div>asd/asasdasd/asdasdasd</div>
              </Comment.Metadata>
              <Comment.Text>asdasdasdasdasd</Comment.Text>
            </Comment.Content>
          </Comment>

          <Form>
            <TextArea name="body" rows={2} placeholder="Add your comment" />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default ClassDetailChat;
