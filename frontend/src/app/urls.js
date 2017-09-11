import React from "react";
import { IndexRedirect, Route } from "react-router";

import RouteNotFound from "../app/components/RouteNotFound";
import Home from "./containers/Home";


const urls = (
  <Route path="/">
    <IndexRedirect to="home" />
    <Route component={Home} path="home" />
    <Route path="*" component={RouteNotFound} />
  </Route>
);

export default urls;
