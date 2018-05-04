import React, { Component } from 'react';
import './App.css';
import RSVPListGetter from './RSVPListGetter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9" crossOrigin="anonymous"/>
        <h1> Guest List So Far </h1>
        <RSVPListGetter/>
      </div>
    );
  }
}

export default App;
