import React, { Fragment, useContext } from "react";
import { Menu, Header, Form, Button, Card } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/RootStore";
import TextInput from "../../../components/Form/TextInput";
const startTime = "startTime";
const TrainingClassFilter = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.trainingClassessStore;

  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%", marginTop: 50 }}>
        <Header icon={"filter"} attached color={"teal"} content={"Filters"} />
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          content={"All Activities"}
        />
        <Menu.Item
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
          color={"blue"}
          name={"username"}
          content={"I'm Going"}
        />
        <Menu.Item
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
          color={"blue"}
          name={"host"}
          content={"I'm hosting"}
        />
      </Menu>
      {/* #2 */}
      <Card style={{ width: "100%" }}>
        <Header
          icon={"calendar"}
          attached
          color={"teal"}
          content={"Select Day & Time"}
        />
        <FinalForm
          onSubmit={(v) => setPredicate(startTime, v[startTime])}
          render={({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              style={{ padding: "2%", marginTop: "2%" }}
            >
              {/* Only One field would sync */}
              {/* <Field
                placeholder="Day of Week"
                name="dayOfWeek"
                option={dayOfWeekOptions}
                component={SelectInput}
              /> */}
              <Field
                type="time"
                placeholder="Time"
                name="startTime"
                component={TextInput}
              />
              <Button
                style={{ width: "100%" }}
                floated="left"
                positive
                type="submit"
                content="Search"
              />
            </Form>
          )}
        />
      </Card>
    </Fragment>
  );
};

export default observer(TrainingClassFilter);
