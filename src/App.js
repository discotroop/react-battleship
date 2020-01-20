import React from 'react';
import './App.css';
import GameBoard from './components/gameBoard';

// To Do:

// generate ship layouts
// block view of ai from user
  // generate random layouts for ships
  // lay ships on field
  // start static
// set up gameplay loop between ai and human player
// import everything to app and execute 

// fix x-y direction on placing ships

function App() {
  return (
    <div className="App">
      <div className="boards">
        <div> Player 1 
          <Board player="human" />
        </div>
        <div> Player 2 (ai)
          <Board player="ai"/>
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

  // buildShip(x, y) {
  //   let that = this;
  //   window.addEventListener("load",function() {
  //     let selected = document.querySelector(`.square[data="${x},${y}"]`);
  //     if (that.state.player === "ai") {
  //       selected.className = "aiship"
  //     } else {
  //     selected.className = "ship";
  //     }
  //   });  
  //   this.state.boardData.setShip(x, y)
  // }

  initShips() {
    if (this.state.player === "human") {
      this.state.boardData.placeShip(1, 1, "right", 5) // right
      this.state.boardData.placeShip(3, 1, "right", 4) // right
      this.state.boardData.placeShip(6, 1, "left", 3) // left
      this.state.boardData.placeShip(7, 7, "up", 2) // up
      this.state.boardData.placeShip(4, 6, "down", 2) // down
    } else {
      this.state.boardData.placeShip(1, 1, "down", 5)
      this.state.boardData.placeShip(7, 7, "up", 2)
    }
  }

  // buildShips() {
  //   this.buildShip(5, 5) 
  // }

  square(Xcoord, Ycoord, someValue) {
    return <div className="square" value={someValue} onClick={(e) => 
      this.squareClicked(e)} 
      key={[Xcoord, Ycoord]} 
      data={[Xcoord,Ycoord]}>
         {Xcoord} {Ycoord} 
      </div>
  }

  shipSquare(Xcoord, Ycoord, someValue) {
    return <div className="ship" value={someValue} onClick={(e) => 
      this.squareClicked(e)} 
      key={[Xcoord, Ycoord]} 
      data={[Xcoord,Ycoord]}>
         {Xcoord} {Ycoord} 
      </div>
  }

  aiShipSquare(Xcoord, Ycoord, someValue) {
    return <div className="aiship" value={someValue} onClick={(e) => 
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
    let that = this;

    for (let i = 0; i < homeArray.length; i++) {
      for (let j = 0; j < homeArray[i].length; j++) {
        if (homeArray[i][j] === "s" && that.state.player === "human") {
          gameGrid.push(this.shipSquare(i, j, homeArray[i][j]));
        } else if (homeArray[i][j] === "s" && that.state.player === "ai") {
          gameGrid.push(this.aiShipSquare(i, j, homeArray[i][j]))
        } else {
        gameGrid.push(this.square(i, j, homeArray[i][j]));
        }
      }
    }
    return gameGrid;
  }

  squareClicked(e) {
    let x = e.target.attributes.data.value[0] * 1;
    let y = e.target.attributes.data.value[2] * 1;
    console.log(e.target)
    console.log(this.state.boardData.board)
    if (e.target.className === "ship") {
      this.state.boardData.recievedAttack(x, y);
      e.target.className = "hit";
    } else if (e.target.className === "square") {
      this.state.boardData.recievedAttack(x, y);
      e.target.className = "miss";
    }
  }

  render() {
    return <div className="board" >
      {this.initShips()}
      {this.buildSquares(8)}
      {/* {this.buildShips()} */}
     </div>
  }
}

export default App;
