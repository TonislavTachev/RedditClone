import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../actions/user";
import { useJwt } from "react-jwt";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  getUser,
  ...rest
}) => {
  const [isLoaded, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (
      localStorage.getItem("token") !== null ||
      localStorage.getItem("token") !== ""
    ) {
      getUser(localStorage.getItem("token"));
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("token") && isLoaded ? (
          <Redirect to="/login" />
        ) : (
          <Component {...rest} />
        )
      }
    ></Route>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isLoaded,
});

export default connect(mapStateToProps, { getUser })(PrivateRoute);
