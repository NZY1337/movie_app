import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../../services/authService";

/*
    the logic:
    - return the Route Component with its params {...rest} and the render function

*/

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getUser()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;

/* 
    <Route
        render={(props) => {
            if (!user) return <Redirect to="/login" />
            return <MovieForm {...props} />
        }}
    /> 

*/
