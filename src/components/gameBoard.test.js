import theGame from './gameBoard'
import Ship from './ship'



let checklist = {

    two: "gameboards should place ships at coords by calling ship factory" +
        "sorta work but needs more details",

    // create game loop and DOM module
    a: "at THIS point you can build UI",
    b: "the game loop should set up a new game, creating players and boards" +
    " start with predetermined layouts" + "you can allow custom placement later",
    c: "players boards should be rendered based on Gameboard class",
        c1: "need methods to render boards and take user input for attacks",
    d: "the game loop should go turn by turn using ONLY methods from other objects" +
    "if at any point you are tempted to write a new function inside the game loop, step" +
    "back and figure out which class or module that function should belong to" ,
    e: "create conditions so game ends when one players ships have been sunk" +
    "this function is appropriate for the game module",

    // finishing up
    x: "you can let users place ships",
    y: "you can polish the ai",
    z: "you can make a two player option",
}

let sampleGame = theGame();
let sampleBoard = sampleGame.human;
let sampleShip = Ship(2);

// Grid Board Set Up
test("It returns an object with a board property this is an array of length 8" +
        "representing the x-axis",
        () => {
    expect(sampleBoard.board.length).toBe(8);
});

test("Nested within the X-axis array are 8 array of length 8 representing the Y-Axis", () => {
    expect(sampleBoard.board[0].length).toBe(8);
});


/* Basic Ship Placement */
test("Ships can be placed in grid going down", () => {
    sampleBoard.placeShip(0, 0, "down", sampleShip)
    expect(sampleBoard.board[0][0]).toBe("s");
    expect(sampleBoard.board[1][0]).toBe("s");
});
test("Ships can be placed in grid going up", () => {
    sampleBoard.placeShip(3, 3, "up", sampleShip)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[2][3]).toBe("s");
});
test("Ships can be placed in grid going left", () => {
    sampleBoard.placeShip(3, 3, "left", sampleShip)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[2][3]).toBe("s");
});
test("ships can be placed in grid going right", () => {
    sampleBoard.placeShip(3, 3, "right", sampleShip)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[3][4]).toBe("s");
});

// Ships are only placed in grid
test("ships will not be placed overflowing the top of the board", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    let sampleShip = Ship(3);

    sampleBoard.placeShip(0, 1, "up", sampleShip)
    expect(sampleBoard.board[0][1]).toBe(1);
});
test("ships will not be placed overflowing the bottom of the board", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    let sampleShip = Ship(3);

    sampleBoard.placeShip(7, 1, "down", sampleShip)
    expect(sampleBoard.board[7][1]).toBe(1);
});
test("ships will not be placed overflowing the left side of the board", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    let sampleShip = Ship(3);
    console.log(sampleBoard.board)

    sampleBoard.placeShip(3, 1, "left", sampleShip)
    console.log(sampleBoard.board)
    expect(sampleBoard.board[3][1]).toBe(1);
});
test.todo("ship placement cannot overlap with other ships");

/* Mapping grid location to ships object */
test("Ships know where they are on the grid", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    let sampleShip = Ship(3);
    sampleBoard.placeShip(3, 3, "right", sampleShip)
    expect(sampleShip.health[0]).toBe("3,3");
});
test("Ships know where they are on the grid", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    let sampleShip = Ship(3);

    sampleBoard.placeShip(3, 3, "left", sampleShip)
    expect(sampleShip.health[0]).toBe("3,3");
    expect(sampleShip.health[1]).toBe("3,2");
    expect(sampleShip.health[2]).toBe("3,1");
});


// Tracking Hits and Misses
test("It tracks hits on the board", () => {
    sampleBoard.test(0, 1, "s")
    sampleBoard.recievedAttack(0, 1);
    expect(sampleBoard.board[0][1]).toBe("h");
});
test("It tracks misses on the board", () => {
    sampleBoard.recievedAttack(2, 2);
    expect(sampleBoard.board[2][2]).toBe("m");
});

/* Tracking hits on Board to ship objects health */
test("ship.health is the same as ship.length", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    let sampleShip = sampleBoard.fleet[4];
    
    sampleBoard.placeShip(3, 3, "left", sampleShip)
    sampleBoard.recievedAttack(3, 3);

    expect(sampleShip.health.length).toBe(2);
});
test("It matches hit counts on the board to ships position", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.ai;
    let sampleShip = sampleBoard.fleet[4];
    
    sampleBoard.placeShip(3, 3, "left", sampleShip)
    sampleBoard.recievedAttack(3, 3);

    expect(sampleShip.health[0]).toBe("x");
});
test("It matches hit counts on the board to ships position, and ships sink", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    let sampleShip = sampleBoard.fleet[4];
    
    sampleBoard.placeShip(3, 3, "left", sampleShip)
    sampleBoard.recievedAttack(3, 3);
    sampleBoard.recievedAttack(3, 2);

    expect(sampleShip.sunk).toBe("Y");
});

// Tracking Fleet Status
test("Fleet status is 'Y' while a ship is afloat", () => {
    sampleBoard.fleet = [sampleShip]
    expect(sampleBoard.fleetStatus).toBe("Y");
});

test("Fleet status is 'N' when all ships sunk", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    sampleBoard.fleet = [sampleShip];
    sampleBoard.fleet[0].sunk = "Y";
    sampleBoard.hasFleet();
    expect(sampleBoard.fleetStatus).toBe("N");
})

// Testing firing mechanisms and game rounds.

test("Human play hits sampleAI.board", () => {
    let newGame = theGame();
    let sampleAI = newGame.ai;

    newGame.humanPlay(4,4);
    expect(sampleAI.board[4][4]).toBe("m");
})
test("AIplay @ 5, 5 shoots at 5, 5", () => {
    let newGame = theGame();
    let sampleHuman = newGame.human;

    newGame.aiPlay(5, 5);
    expect(sampleHuman.board[5][5]).toBe("m");
});
test("AIplay does not shoot the same spot twice", () => {
    let newGame = theGame();
    let sampleHuman = newGame.human;

    newGame.aiPlay(5, 5);
    newGame.aiPlay(5, 5);
    expect(sampleHuman.board[5][5]).toBe("m");
});
test("AIplay knows if it has sunk all human ships", () => {
    let newGame = theGame();
    let sampleHuman = newGame.human;
    let sampleShip = Ship(2);
    sampleHuman.fleet = [sampleShip];
    sampleHuman.placeShip(0, 1, "down", sampleHuman.fleet[0]);
    newGame.aiPlay(0, 1);
    newGame.aiPlay(1, 1);

    expect(sampleHuman.fleetStatus).toBe("N");
})
test("Human knows if it has sunk all AI ships", () => {
    let newGame = theGame();
    let sampleAI = newGame.ai;
    let sampleShip = Ship(2);
    sampleAI.fleet = [sampleShip];
    sampleAI.placeShip(0, 1, "down", sampleAI.fleet[0]);
    newGame.humanPlay(0, 1);
    newGame.humanPlay(1, 1);

    expect(sampleAI.fleetStatus).toBe("N");
})