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
function drawBoard() {
  return (
    <div className="board">
      {console.log("here there be grids")}
    </div>
  )
}


function App() {

  return (
    <div className="App">
      <header className="App-header">
        battle ship
      </header>
    </div>
  );
}

export default App;
