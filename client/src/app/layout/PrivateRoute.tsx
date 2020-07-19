import React, { useContext } from "react";
import {
  RouteProps,
  RouteComponentProps,
  Route,
  Redirect,
} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../stores/RootStore";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default observer(PrivateRoute);
