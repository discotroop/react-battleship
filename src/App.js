import React from 'react';
import './App.css';
import GameBoard from './components/gameBoard';

// To Do:

// generate random layouts for ships
  // lay ships on field
  // start static
// set up gameplay loop between ai and human player
// hook up whole thing to a dom so we can see what's happening
// write more tests
// import everything to app and execute 

function App() {
  return (
    <div className="App">
      <div className="boards">
        <div> Player 1 
          <Board player="player1" />
        </div>
        <div> Player 2 (ai)
          <Board player="player2"/>
        </div>
      </div>
    </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: props.player,
      boardData: GameBoard(),
    }
  }
  squareClicked(e) {
    let x = e.target.attributes.data.value[0] * 1;
    let y = e.target.attributes.data.value[2] * 1;
    this.state.boardData.placeShip(1, 1, "down", 1)
    console.log(e.target)

    this.state.boardData.recievedAttack(x, y);
    console.log(this.state.boardData.board)
  }

  square(Xcoord, Ycoord, someValue) {
    return <div className="square" value={someValue} onClick={(e) => 
      this.squareClicked(e)} 
      key={[Xcoord, Ycoord]} 
      data={[Xcoord,Ycoord]}>
         {Xcoord} {Ycoord} 
      </div>
  }

  buildSquares(props) {
    let gameGrid = []
    let homeArray = this.state.boardData.board;
    console.log(homeArray);

    for (let i = 0; i < homeArray.length; i++) {
      for (let j = 0; j < homeArray[i].length; j++) {
        gameGrid.push(this.square(i, j, homeArray[i][j]));
      }
    }
    return gameGrid;
  }

  // square(Xcoord, Ycoord) {
  //   return <div className="square" onClick={(e) => this.squareClicked(e)} key={[Xcoord, Ycoord]} data={[Xcoord,Ycoord]} > {Xcoord} {Ycoord} </div>
  // }

  // buildSquares(props) {
  //   let gameGrid = [];

  //   for (let i = 0; i < props; i++) {
  //     for (let j = 0; j < props; j++) {
  //       gameGrid.push(this.square(i, j));
  //     }
  //   }
  //   return gameGrid;
  // }

  buildShip(x, y) {
    window.addEventListener("load",function() {
      let selected = document.querySelector(`.square[data="${x},${y}"]`);
      selected.className = "ship";
    });  
    this.state.boardData.setShip(x, y)
    // console.log(this.state.boardData.board)
  }

  buildShips() {
    this.buildShip(0, 1) 
  }

  render() {
    return <div className="board" >
      {this.buildSquares(8)}
      {this.buildShips()}
     </div>
  }
}

export default App;
