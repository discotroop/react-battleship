import React from 'react';
import Ship from './ship'
import GameBoard from './gameBoard'

function Player() {
    return {
        playersBoard: GameBoard(), 
        isHuman: false,
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