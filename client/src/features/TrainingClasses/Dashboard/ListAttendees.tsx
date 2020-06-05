import React from "react";
import { List, Image, Popup } from "semantic-ui-react";
import { IUserTrainingClass } from "../../../app/_models/IUserTrainingClasses";
import { Link } from "react-router-dom";
import { profileLink } from "../../../app/_constantVariables/_Links";

interface IProps {
  attendees: IUserTrainingClass[];
}

// const styles = {
//   borderColor: "orange",
//   borderWidth: 2,
// };

const ListAttendee: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees &&
        attendees.map((attendee) => (
          <List.Item key={attendee.userName}>
            <Popup
              header={attendee.fullName}
              trigger={
                <Image
                  size="mini"
                  circular
                  src={attendee.image || "/assets/user.jpg"}
                  bordered
                  as={Link}
                  to={profileLink + "/" + attendee.userName}
                  primary={true}
                  // style={attendee.following ? styles : null}
                />
              }
            />
          </List.Item>
        ))}
    </List>
  );
};

export default ListAttendee;
