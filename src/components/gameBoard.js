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
            Ship(2),
        ]      
    } 
    
    return {
        board: drawGrid(),
        fleet: buildFleet(),
        player: passedPlayer,
        fleetStatus: "Y",
        hits: 0,

        // handy helpers
        setShip: function (x, y) {
            return this.board[x][y] = "s";
        },
        setHit: function (x, y) {
            return this.board[x][y] = "h";
        },
        shipLengthHack: function () {
            this.fleet.forEach(function(ship) {
                ship.health.length = ship.length;
            })
        },
        checkShip: function (coords, ship) {
            let health = ship.health;

            for (let i=0; i<health.length; i++) {
                if (health[i] === coords) {
                    ship.hit(i);
                    this.shipLengthHack();
                }
            }
            this.hasFleet();
        },
        setHitToShip: function (x, y) {
            // use arr.includes() on refactor
            let target = `${x},${y}`;

            for (let i=0; i<this.fleet.length; i++) {
                this.checkShip(target, this.fleet[i]);
            }
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
                this.setHit(x, y);
                this.setHitToShip(x, y);
            } else if (typeof target === "number") {
                target = this.setMiss(x, y);
            }
            return;
        },
        //  refactor? 
        legalShipPlacement: function (x, y, direction, ship) {
            let length = ship.length;
            if (direction === "up") {
                let legal = true;
                for (let i = x; i > x - length; i--) {
                    if (i < 0) {
                        legal = false;
                        return legal;
                    } else if (this.board[i][y] === "s") {
                        legal = false;
                        return legal;
                    }
                }
                return legal;
            }
            if (direction === "down") {
                let legal = true;
                for (let i = x; i < x + length; i++) {
                    if (i > 7) {
                        legal = false;
                        return legal;
                    } else if (this.board[i][y] === "s") {
                        legal = false;
                        return legal;
                    }
                }
                return legal;
            }
            if (direction === "left") {
                let legal = true;
                for (let i = y; i > y - length; i--) {
                    if (i < 0) {
                        legal = false;
                        return legal;
                    } else if (this.board[x][i] === "s") {
                        legal = false;
                        return legal;
                    }
                }
                return legal;
            }
            if (direction === "right") {
                let legal = true;
                for (let i = y; i < y + length; i++) {
                    if (i > 7) {
                        legal = false;
                        return legal;
                    } else if (this.board[x][i] === "s") {
                        legal = false;
                        return legal;
                    }
                }
                return legal;
            }
        },

        placeShip: function (x, y, direction, ship) {
            let legal = this.legalShipPlacement(x, y, direction, ship)
            if (legal === false) {
                return;
            }
            if (direction === "left") {
                let end = y - ship.length;
                for (let i = y; i > end; i--) {
                    this.setShip(x, i);
                    ship.health.push(`${x},${i}`)
                }
            } else if (direction === "right") {
                let end = y + ship.length;
                for (let i = y; i < end; i++) {
                    this.setShip(x, i);
                    ship.health.push(`${x},${i}`)
                }
            } else if (direction === "up") {
                let end = x - ship.length;
                for (let i = x; i > end; i--) {
                    this.setShip(i, y);
                    ship.health.push(`${i},${y}`)
                }
            } else if (direction === "down") {

                let end = x + ship.length;
                for (let i = x; i < end; i++) {
                    this.setShip(i, y);
                    ship.health.push(`${i},${y}`)
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
            let legalNumber = 0;
            if (number < 8 && number > -1) {
                legalNumber = number;
            } else {
                legalNumber = this.aiAttack();
            }
            return legalNumber;
        },
        humanPlay: function (x, y) {
            this.ai.recievedAttack(x, y);

            let ex = this.aiAttack();
            let why = this.aiAttack();
            this.aiPlay(ex, why)
        },
        aiPlay: function(x, y) {
    
            let target = this.human.board[x][y]; 
            if (target === "h") {
                this.aiPlay(this.aiAttack(), this.aiAttack())
            } else if (target === "m") {
                this.aiPlay(this.aiAttack(), this.aiAttack())
            } else {
            this.human.recievedAttack(x, y)
            }
            this.currentPlayer = "human";
        } 
    }
}

export default theGame;