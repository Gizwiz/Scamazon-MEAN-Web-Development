import React, {Component} from 'react';
import Participants from './Participants.js';


class Main extends Component{
      render() {
    return (
        <div>
        <h2 id='participants'>List of participants</h2>
        <Participants />
        </div>
    );
  }
}
export default Main;