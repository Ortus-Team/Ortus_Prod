var React = require('react');
var ReactDOM = require('react-dom');

/*
NavBar (On all pages)
  Logo (link: Home)
  Search
  Student Group Directory
  Events
  Login
  Translate
*/

export class FeaturedGroups extends React.Component {
  render() {
    const dc = {
        color: 'red'
    }

    return (
        <div styles={dc}>
            
            <h1 styles={dc}>Featured Groups</h1>
        </div>
    );
  }
};