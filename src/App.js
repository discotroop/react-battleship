import React from 'react';
import './App.css';
import GameLogic from './components/gameBoard';

const theGame = GameLogic();
// To Do:

// get game boards to map to DOM
// get initShips to work
// make ship layouts random from initShips;


// I think I need to go back and change how the board is mapped out.
// squares need to be a class or at least take props and send info back up to state.

// game is setting "you win" before all the hits are in ... need to fix that. 
// specifically the ai wins if it's "hit" any ships, not actually sunk
// might have to fix it in ship.

function App() {
  return (
    <div className="App">
      <div className="boards">
        <div> Player 1 (you)
          {console.log(theGame.human)}
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
      endGame: "no way hosea",
    }
  }
  checkEndGame() {
    if (this.state.gameData.human.fleetStatus === "N") {
      this.setState({endGame: "AI Wins!"});
    } 
    if (this.state.gameData.ai.fleetStatus === "N") {
      this.setState({endGame: "You Win!"});
    } 

  }

  checkAiPlay() {
    let boardArr = this.state.gameData.human.board;
    let targetDivs = document.querySelectorAll(".human .board .square")   

    for (let i = 0; i < targetDivs.length; i++) {
      let x = targetDivs[i].innerHTML[0] * 1;
      let y = targetDivs[i].innerHTML[2] * 1;
      let row = boardArr[x];
      let location = row[y];
      if (location === "m") {
        targetDivs[i].classList.add("miss");
      } else if (location === "h") {
        targetDivs[i].classList.add("hit")
      }
    this.checkEndGame();
  }
}

  humanPlayed() {
    this.state.gameData.aiPlay(this.state.gameData.aiAttack(), 
      this.state.gameData.aiAttack());
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
      <div> <h1> {this.state.endGame} </h1> </div>

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
      gameBoard: props.data,
      gridInterface: [],
    }
  }

  // temporary non-random set up
  initShips() {
    let fleet = this.state.gameBoard.fleet;
    if (this.state.player === "human") {
      this.state.gameBoard.placeShip(1, 1, "right", fleet[0])
      this.state.gameBoard.placeShip(3, 1, "right", fleet[1])
      this.state.gameBoard.placeShip(6, 3, "left", fleet[2])
      this.state.gameBoard.placeShip(7, 7, "up", fleet[3])
      this.state.gameBoard.placeShip(4, 6, "down", fleet[4])
    } else {
      this.state.gameBoard.placeShip(1, 1, "down", fleet[0])
      this.state.gameBoard.placeShip(7, 7, "up", fleet[1])
      this.state.gameBoard.placeShip(1, 5, "left", fleet[2])
      this.state.gameBoard.placeShip(5, 3, "up", fleet[3])
      this.state.gameBoard.placeShip(4, 6, "down", fleet[4])
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
    return <div className="square ship" value={someValue} onClick={(e) => 
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
    let homeArray = this.state.gameBoard.board;
    let that = this;

    for (let i = 0; i < homeArray.length; i++) {
      for (let j = 0; j < homeArray[i].length; j++) {
        if (homeArray[i][j] === "s" && that.state.player === "human") {
          gameGrid.push(this.shipSquare(i, j, homeArray[i][j]));
          this.state.gridInterface.push(this.shipSquare(i, j, homeArray[i][j]));
        } else if (homeArray[i][j] === "s" && that.state.player === "ai") {
          gameGrid.push(this.aiShipSquare(i, j, homeArray[i][j]))
          this.state.gridInterface.push(this.aiShipSquare(i, j, homeArray[i][j]));
        } else {
        gameGrid.push(this.square(i, j, homeArray[i][j]));
        this.state.gridInterface.push(this.square(i, j, homeArray[i][j]));
        }
      }
    }
    return gameGrid;
  }
  squareClicked(e, optionalX, optionalY) {
    let that = this;
    let x = e.target.attributes.data.value[0] * 1;
    let y = e.target.attributes.data.value[2] * 1;

    // prevents firing onto own board.
    let boardClicked = e.target.parentNode.parentNode.className;
      if (boardClicked === "human") {
        return;
      }

    if (e.target.className === "ship") {
      this.state.gameBoard.recievedAttack(x, y);
      e.target.className = "hit";
    } else if (e.target.className === "aiship") {
      this.state.gameBoard.recievedAttack(x, y);
      e.target.className = "hit";
    } else if (e.target.className === "square") {
      this.state.gameBoard.recievedAttack(x, y);
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
