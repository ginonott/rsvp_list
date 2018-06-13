import React, { Component } from 'react';
import './App.css';
import RSVPListGetter from './RSVPListGetter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossOrigin="anonymous"/>
        {Date(Date.now()) >= new Date('06/14/2018') && new Date(Date.now()) <= new Date('06/15/2018') ?
          <div className="happy-birthday">
            <div className="bday-pic">
              <img src="/happy_birthday.png"/>
            </div>
            <div className="bday-msg">
              <span className="filler"/>
              <h1> Happy Birthday, Racheal! </h1>
              <span className="filler"/>
            </div>
          </div>
        : null}
        <h1> Guest List So Far </h1>
        <RSVPListGetter/>
      </div>
    );
  }
}

export default App;
