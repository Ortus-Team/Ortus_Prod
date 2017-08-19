var React = require('react');
var ReactDOM = require('react-dom');

/*
Student Group Page
  NavBar
  Content
    Main
      Cover Image
      Logo
      Title
      Follower and Member Data
      Join or Follow
    Menu
      Overview
        About Us
        Upcoming Event
        Feed
          Feed Items
            Title
            Author
            Date Posted
            Content
              Text
              Media
      Events
        Upcoming Events
          Event Items
        Past Events
          Event Items
      Officers
        Officer Items
          Name
          Position
      Gallery
        Album Items
          Cover Image
          Title
          Size (Number of Images)
      Members
        Filters
          Search
          Year
          Member Since
        Invite Member
        Member List
          Member List Items
            Profile Image
            Name
            Native Language Name (optional)
            Email
            Year in School
            Member Since
*/

export class GroupPage extends React.Component {
  render() {
    return (
        <div id={styles.thing}>
          <h1>This is the Group Page!!!!</h1>

        </div>
    );
  }
};