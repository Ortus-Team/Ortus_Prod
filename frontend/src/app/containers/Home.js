import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div> HOME!!!! </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
