import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({ component: C, props, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        props.isAuthenticated
          ? <C {...props} {...props} />
          : <Redirect to="/" />}
    />
  );
}