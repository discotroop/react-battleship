import React from 'react';
import './App.css';
import GameLogic from './components/gameBoard';

const newGame = GameLogic();


const theGame = GameLogic();
// To Do:

// spruce up css to make it pretty
// change game status message and add button to reset on game end

function App() {
  return (
    <div className="App">
        <Game />
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
    this.handleButtonClick=this.handleButtonClick.bind(this);
  }
  handleButtonClick() {
    window.location.reload();
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
    this.state.gameData.aiPlay(this.state.gameData.aiAttack(), this.state.gameData.aiAttack());
    
    this.checkEndGame();
    this.checkAiPlay();
  }
  render () {
    return <div>
    <div className="boards"> 
      <div className="gameStatus"> 
        <h1> {this.state.endGame} </h1>
        <button onClick={() => this.handleButtonClick()}> New Game </button>
       </div>
      <div className = "human">
        <Board 
          player="human" 
          data={this.state.gameData.human} 
          currentPlayer={this.state.gameData.currentPlayer}
        />
      </div>
      <div className="ai" onClick={() => this.humanPlayed()}> 
        <Board 
          player="ai" 
          data={this.state.gameData.ai}
          currentPlayer={this.state.gameData.currentPlayer}
        />
      </div> 
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
  random() {
    return Math.round(Math.random() * 10);
  }
  legalCoord() {
      let number = this.random()
      let legalNumber = 0;
      if (number < 8 && number > -1) {
          legalNumber = number;
      } else {
          legalNumber = this.legalCoord();
      }
      return legalNumber;
  }
  shipRandomizer() {
    return this.legalCoord();
  }
  directionRandomizer() {
    let num = this.legalCoord();
    if (num <= 1) {
      return "right"
    } else if (num <= 3) {
      return "left"
    } else if (num <= 5) {
      return "up"
    } else if (num <= 7) {
      return "down"
    } else {
      return "right";
    }
  }

  
  // temporary non-random set up
  initShips() {
    let fleet = this.state.gameBoard.fleet;
    for (let i = 0; i < fleet.length; i++) {
      while (fleet[i].health.length < 1) {
        this.state.gameBoard.placeShip(
          this.shipRandomizer(),
          this.shipRandomizer(),
          this.directionRandomizer(), fleet[i])
      }
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

  squareClicked(e) {
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
  }

  render() {
    return <div className="board" >
      {this.initShips()}
      {this.buildSquares(8)}
     </div>
  }
}

export default App;
