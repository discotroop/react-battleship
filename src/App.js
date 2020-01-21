import React from 'react';
import './App.css';
import GameLogic from './components/gameBoard';

const theGame = GameLogic();
// To Do:

// go back finish game logic
// may have to scrap whole front end
// write tests

// generate ship layouts - mvp
  // make them "random"

// set up gameplay loop between ai and human player
  // should have done this earlier.... 

// recieved attack is out of wack... go back to drawing board and
// finish making the game work in a testable enviromnet.. then bring
// it up the world.

function App() {
  return (
    <div className="App">
      <div className="boards">
        <div> Player 1 (you)
          <Board player="human" data={theGame.human} />
        </div>
        <div> Player 2 (ai)
          <Board player="ai" data={theGame.ai}/>
        </div>
      </div>
      <div> 
        <Game />
      </div>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameData: theGame,
    }
  }
  checkAiPlay() {
    let targetDiv = document.querySelector(".square")
  }

  humanPlayed() {
 
    this.state.gameData.aiPlay(this.state.gameData.aiAttack(), this.state.gameData.aiAttack());
    this.checkAiPlay();
  }
  render () {
    return <div> 
      <div className = "human">
        <Board 
          player="human" 
          data={this.state.gameData.human} 
          currentPlayer={this.state.gameData.currentPlayer}
        />
      </div>
      <div className="ai" onClick={() => this.humanPlayed()}> 
      <div> <h1> {this.state.gameData.currentPlayer} </h1> </div>

        <Board 
          player="ai" 
          data={this.state.gameData.ai}
          currentPlayer={this.state.gameData.currentPlayer}
        />
      </div> 
    </div>
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: props.player,
      boardData: props.data,
      currentPlayer: props.currentPlayer,
    }
  }

  // temporary non-random set up
  initShips() {
    if (this.state.player === "human") {
      this.state.boardData.placeShip(1, 1, "right", 5)
      this.state.boardData.placeShip(3, 1, "right", 4)
      this.state.boardData.placeShip(6, 3, "left", 3)
      this.state.boardData.placeShip(7, 7, "up", 2)
      this.state.boardData.placeShip(4, 6, "down", 2)
    } else {
      this.state.boardData.placeShip(1, 1, "down", 5)
      this.state.boardData.placeShip(7, 7, "up", 4)
      this.state.boardData.placeShip(1, 5, "left", 3)
      this.state.boardData.placeShip(5, 3, "up", 2)
      this.state.boardData.placeShip(4, 6, "down", 2)
    }
  }

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
    let that = this;
    let x = e.target.attributes.data.value[0] * 1;
    let y = e.target.attributes.data.value[2] * 1;

    // prevents firing onto own board.
    let boardClicked = e.target.parentNode.parentNode.className;
      if (boardClicked === "human") {
        return;
      }

    if (e.target.className === "ship") {
      this.state.boardData.recievedAttack(x, y);
      e.target.className = "hit";
    } else if (e.target.className === "aiship") {
      this.state.boardData.recievedAttack(x, y);
      e.target.className = "hit";
    } else if (e.target.className === "square") {
      this.state.boardData.recievedAttack(x, y);
      e.target.className = "miss";
    } else if (e.target.className === "hit") {
      return;
    } else if (e.target.className === "miss") {
      return;
    }

    if (boardClicked === "ai") {
      that.state.currentPlayer = "ai";
      that.setState({currentPlayer: "ai"});
    }
  }

  render() {
    return <div className="board" >
      {this.initShips()}
      {this.buildSquares(8)}
     </div>
  }
}

export default App;
