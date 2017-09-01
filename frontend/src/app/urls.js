import React from "react";
import { IndexRedirect, Route } from "react-router";

import RouteNotFound from "../app/components/RouteNotFound";


const urls = (
  <Route path="/">
    <IndexRedirect to="admin/users" />
    <Route path="*" component={RouteNotFound} />
  </Route>
);

export default urls;
