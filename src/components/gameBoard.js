import React from 'react';
import Ship from './ship'

const carrier = new Ship(5);

function GameBoard() {
    const letters = new Array(8);

    function drawGrid () {
        for (let i = 0; i < letters.length; i++) {
            letters[i] = new Array(8);
        }
        return letters;
    }

    function placeShip (noseX, noseY, length, direction) {
        return this.board[0][1] = "s";
    }


    return {
        board: drawGrid(),
        ships: "",
        setShip: function (x, y) {
            return this.board[x][y] = "s";
        },
        setHit: function (x, y) {
            return this.board[x][y] = "sh";
        },
        setMiss: function (x, y) {
            return this.board[x][y] = "m"; 
        },
        recievedAttack: function (x, y) {
            let target = this.board[x][y];
            if (target === "s") {
                target = this.setHit(x, y);
            } else {
               target = this.setMiss(x, y);
            }
            return
        },
        test(x, y, letters) {
            return this.board[x][y] = letters;
        },
        placeShip: function (x, y, direction, length) {
            if (direction === "up") {
                let end = y - length;
                for (let i = y; i > end; i--) {
                    this.setShip(x, i);
                }
            } else if (direction === "down") {
                let end = y + length;
                for (let i = y; i < end; i++) {
                    this.setShip(x, i);
                }
            } else if (direction === "left") {
                let end = x - length;
                for (let i = x; i > end; i--) {
                    this.setShip(i, y);
                }
            } else if (direction === "right") {
                let end = x + length;
                for (let i = x; i < end; i++) {
                    this.setShip(i, y);
                }
            }
            return;
        },

    };
}

export default GameBoard;