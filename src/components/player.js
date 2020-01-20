import theGame from './gameBoard'

let sampleGame = theGame();
let sampleBoard = sampleGame.human;

function Player() {
    return {
        playersBoard: sampleBoard, 
        isHuman: false,
        isTurn: false,
        randomNumber: function () {
            let result = Math.random()*10;
            result = Math.round(result);
            if (result < 9) {
                return result;
            } else {
                this.randomNumber();
            }
        },
        randomPlay: function () {
            let x = this.randomNumber();
            let y = this.randomNumber();
            return [x, y]; 
        }
    }
} 
export default Player;