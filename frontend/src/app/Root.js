import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";

import configureStore from "../app/configureStore";
import history from "../app/history";
import urls from "../app/urls";

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <div> ASDFASDFDSAF
      </div>
    );
  }
}

export default Root;
