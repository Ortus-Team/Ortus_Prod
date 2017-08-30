var React = require('react');
var ReactDOM = require('react-dom');

import { Navbar } from './components/Navbar/Navbar';
import { DynamicContent } from './components/DynamicContent/DynamicContent';
import { UpcomingEvents } from './components/UpcomingEvents/UpcomingEvents';
import { FeaturedGroups } from './components/FeaturedGroups/FeaturedGroups';
import { GetInvolved } from './components/GetInvolved/GetInvolved';

/*
Home
  NavBar
  Content
    Dynamic Content
    Upcoming Events
    Featured Student Groups
    Get Involved
*/

export default class Home extends React.Component {
  render() {
    const h1Style = {
      backgroundColor: 'red'
    }
    
    return (
        <div>
          <Navbar />
          <h1>Home Page!!</h1>
            asdfasdf
        </div>
    );
  }
};