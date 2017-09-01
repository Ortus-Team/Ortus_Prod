/* import React from 'react'
import ReactDom from 'react-dom'

*/
import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import routes from "./routes";
import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";


ReactDom.render((
  <Router history={browserHistory} routes={routes} />
), document.getElementById("react-app"));

// ReactDom.render(<Home />, document.getElementById('react-app'));

// ReactDom.render(<Home />, document.getElementById('react-app'))

import { Home } from "./modules/Home/Home";

const OrtusMain = React.createClass({
  render() {
    const ortusAppStyle = {
      backgroundColor: "ffffff",
      color: "#333",
      padding: 20,
      width: 550,
      margin: "0 auto",
      fontFamily: "Georgia",
      fontSize: 66,
      fontWeight: "bold",
    };

    return (<div style={ortusAppStyle}><p>Ortus project uses React and DRF!</p></div>);
  },
});


const OrtusMember = React.createClass({
  loadMemberFromServer() {
    $.ajax({
      url: this.props.url,
      datatype: "json",
      cache: false,
      success: function (data) {
        this.setState({ data });
      }.bind(this),
    });
  },

  getInitialState() {
    return { data: [] };
  },

  componentDidMount() {
    this.loadMemberFromServer();
    setInterval(this.loadMemberFromServer,
      this.props.pollInterval);
  },
  render() {
    if (this.state.data) {
      console.log("DATA!");
      var memberNodes = this.state.data.map(member => (<li> {member.username} <li>{member.first_name}</li></li>
      ));
    }
    return (
      <div>
        <h1>Ortus Member</h1>
        <ul>
          {memberNodes}
        </ul>
      </div>
    );
  },
});

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Ortus Member</h1>
        <ul>
          <li>members should be here....</li>
        </ul>
      </div>
    );
  }
}

// ReactDom.render(<Main url='http://127.0.0.1:8000/members' pollInterval={1000} />, document.getElementById('react-app'))

/* ReactDom.render(<OrtusMember url='http://127.0.0.1:8000/members/' pollInterval={1000} />, document.getElementById('react-app'))
*/
/* ReactDom.render(<OrtusMain />, document.getElementById('react-app')) */

