const React = require("react");
const ReactDOM = require("react-dom");

/*
NavBar (On all pages)
  Logo (link: Home)
  Search
  Student Group Directory
  Events
  Login
  Translate
*/

export class DynamicContent extends React.Component {
  render() {
    const dc = {
      color: "red",
    };

    return (
      <div styles={dc}>

        <h1 styles={dc}>Dynamic Content</h1>
      </div>
    );
  }
}
