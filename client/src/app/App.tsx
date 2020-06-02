import React, { useEffect, useContext } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../features/Nav/Navbar";
import TrainingClassesDashboard from "../features/TrainingClasses/Dashboard/TrainingClassesDashboard";
import LoadingComponent from "../components/LoadingComponent";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import HomeComponent from "../features/Home/HomeComponent";
import ClassForm from "../features/TrainingClasses/Form/ClassForm";
import ClassDetail from "../features/TrainingClasses/ClassDetail/ClassDetail";
import {
  homeLink,
  trainingClassessLink,
  withIdLink,
  createTrainingClassLink,
  editTrainingClassLink,
  profileLink,
  withUserNameLink,
} from "./_constantVariables/_Links";
import NotFound from "../features/NotFound";
import { RootStoreContext } from "./stores/RootStore";
import Profile from "../features/Profile/Profile";
const App: React.FC<RouteComponentProps> = ({ location }) => {
  const RootStore = useContext(RootStoreContext);
  const { AccountLoaded, setAccountLoaded, token } = RootStore.utilStore;
  const { getUser } = RootStore.userStore;
  useEffect(() => {
    if (token) {
      getUser().finally(() => setAccountLoaded(true));
    } else {
      setAccountLoaded(true);
    }
  }, [AccountLoaded, setAccountLoaded, getUser, token]);
  if (!AccountLoaded) return <LoadingComponent />;
  return (
    <>
      <Route exact={true} path={homeLink} component={HomeComponent} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  exact={true}
                  path={trainingClassessLink}
                  component={TrainingClassesDashboard}
                />
                <Route
                  path={trainingClassessLink + withIdLink}
                  component={ClassDetail}
                />
                <Route
                  path={profileLink + withUserNameLink}
                  component={Profile}
                />
                <Route
                  key={location.key}
                  path={[
                    createTrainingClassLink,
                    editTrainingClassLink + withIdLink,
                  ]}
                  component={ClassForm}
                />
                {/* <Route path={u}/> */}
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
