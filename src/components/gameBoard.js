import React from 'react';
import Ship from './ship'

function GameBoard() {
    const letters = new Array(8);

    function drawGrid () {
        for (let i = 0; i < letters.length; i++) {
            let temp = []
            for (let j = 0; j < letters.length; j++) {
                temp.push(j);
            }
            letters[i]=temp;
        }
        return letters;
    }

    function buildFleet () {
        return [
            Ship(5),
            Ship(4),
            Ship(3),
            Ship(3),
            Ship(2)
        ]
    }    

    // isSunk: function() {
    //     if (this.hits.includes(undefined)) {
    //         console.log("floating")
    //     } else {
    //         this.sunk = "Y";
    //     }

    return {
        board: drawGrid(),
        fleet: buildFleet(),
        fleetStatus: "Y",

        // handy helpers
        setShip: function (x, y) {
            return this.board[x][y] = "s";
        },
        setHit: function (x, y) {
            return this.board[x][y] = "sh";
        },
        setMiss: function (x, y) {
            return this.board[x][y] = "m"; 
        },
        test(x, y, letters) {
            return this.board[x][y] = letters;
        },

        recievedAttack: function (x, y) {
            let target = this.board[x][y];
            if (target === "s") {
                target = this.setHit(x, y);
                this.hasFleet();
            } else {
               target = this.setMiss(x, y);
            }
            return
        },

        placeShip: function (x, y, direction, length) {
        // up
            if (direction === "left") {
                let end = y - length;
                for (let i = y; i > end; i--) {
                    this.setShip(x, i);
                }
        // down
            } else if (direction === "right") {
                let end = y + length;
                for (let i = y; i < end; i++) {
                    this.setShip(x, i);
                }
        // left
            } else if (direction === "up") {
                let end = x - length;
                for (let i = x; i > end; i--) {
                    this.setShip(i, y);
                }
        // right 
            } else if (direction === "down") {
                let end = x + length;
                for (let i = x; i < end; i++) {
                    this.setShip(i, y);
                }
            }
            return;
        },

        hasFleet: function () {
            let status = []
            for (let i = 0; i < this.fleet.length; i++) {
                status.push(this.fleet[i].sunk);
            }
            if (status.includes("N")) {
                this.fleetStatus = "Y"
            } else {
                this.fleetStatus = "N"
            }
        }
    };
}

export default GameBoard;