import Ship from './ship'

function GameBoard(player) {
    const passedPlayer = player;
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
    
    return {
        board: drawGrid(),
        fleet: buildFleet(),
        health: 17,
        player: passedPlayer,
        fleetStatus: "Y",
        hits: 0,

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
        checkhealth() {
            if (this.hits === this.health) {
                this.fleetStatus = "N";
            }
            return;
        },

        attackcount: 0,

        recievedAttack: function (x, y) {
            let target = this.board[x][y];
            if (target === "s") {
                this.hits += 1;
                target = "sh";
                this.setHit(x, y);
            } else if (typeof target === "number") {
                target = this.setMiss(x, y);
            }
            this.checkhealth();
            return;
        },

        placeShip: function (x, y, direction, ship) {
            if (direction === "left") {
                let end = y - ship.length;
                for (let i = y; i > end; i--) {
                    this.setShip(x, i);
                }
            } else if (direction === "right") {
                let end = y + ship.length;
                for (let i = y; i < end; i++) {
                    this.setShip(x, i);
                }
            } else if (direction === "up") {
                let end = x - ship.length;
                for (let i = x; i > end; i--) {
                    this.setShip(i, y);
                }
            } else if (direction === "down") {
                let end = x + ship.length;
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

function theGame() {
    return {
        human: GameBoard(),
        ai: GameBoard(),
        currentPlayer: "human",
        random: function() {
            return Math.round(Math.random() * 10)
        },
        aiAttack: function () {
            let number = this.random()
            if (number < 9 && number > 0) {
                return number;
            } else {
                number = this.aiAttack();
            }
        },
        humanPlay: function (x, y) {
            this.currentPlayer = "ai";
            this.aiPlay();
        },
        aiPlay: function(x, y) {
            this.human.recievedAttack(x, y)
            this.currentPlayer = "human";
        } 
    }
}

export default theGame;