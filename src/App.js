import React from 'react';
import './App.css';
import GameBoard from './components/gameBoard';

// To Do:

// generate random layouts for ships
// set up gameplay loop between ai and human player
// hook up whole thing to a dom so we can see what's happening
// write more tests
// import everything to app and execute 


// this will be a class 

function App() {
  return (
    <div className="App">
        <div className="Human">
          <Board />
        </div>
        <div className="Computer">
          <Board />
        </div>
    </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // grid
      // hits
      // misses
      // ship positions
    }
  }
}

export default App;
