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
      <div className="boards">
        <div> Player 1 
          <Board />
        </div>
        <div> Player 2 (ai)
          <Board />
        </div>
      </div>
    </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  square(Xcoord, Ycoord) {
    return <div className="square" key={[Xcoord, Ycoord]}> {Xcoord} {Ycoord} </div>
  }

  buildSquares(props) {
    let gameGrid = [];

    for (let i = 0; i < props; i++) {
      for (let j = 0; j < props; j++) {
        gameGrid.push(this.square(i, j));
      }
    }
    return gameGrid;
  }

  render() {
    return <div className="board">
      {this.buildSquares(8)}
     </div>
  }
}


export default App;
