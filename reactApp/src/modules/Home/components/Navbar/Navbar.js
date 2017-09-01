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

export class Navbar extends React.Component {
  render() {
    const navbar = {
      fontFamily: "Arial",
    };

    return (
      <div styles={navbar}>
        {/* Logo */}
        {/* <div id={styles.logo} */}
        <div styles={navbar}>
          <a href="#">Logo</a>
        </div>

        {/* Search id={styles.search} */}
        <div>
          <a href="#">Search</a>
        </div>

        {/* Main links id={styles.nav} */}
        <div>
          <a href="#">Student Group Directory</a>
          <a href="#">Events</a>
          <a href="#">Login</a>
        </div>

        {/* Translate id={styles.translate} */}
        <div>
          <a href="#">Translate</a>
        </div>

      </div>
    );
  }
}
