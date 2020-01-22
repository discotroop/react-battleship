import theGame from './gameBoard'
import Ship from './ship'



let checklist = {
    // ship factory
    // 1: "ship includes length, hits and if sunk",
    // 2: "only test public interface" ,
    // 3: "ships have a hit() function that takes a number" +
    //     "and marks it as a hit",
    // 4: "isSunk() checks if based on length the ship has sunk",

    // Gameboard factory
    one: "use tests alone, no DOM or console logs",
    two: "gameboards should place ships at coords by calling ship factory",
    three: "recievedAttack() should take coords, check if ship is hit, " + 
    
    // PROBLEM!
    "SEND THE ATTACK TO THE APPROPRIATESHIP" + 
    // PROBLEM!

    "or record misses",
    four: "should track missed attacks",
    five: "gameboards should know if all ships have sunk",

    // create player:
    i: "players should take turns by attack the others board",
    ii: "make an ai player to take random shots, should only take legal moves",

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
test("it returns and object with a nested array representing the board", () => {
    expect(sampleBoard.board.length).toBe(8);
});

test("confirming above", () => {
    expect(sampleBoard.board[0].length).toBe(8);
});


/* Basic Ship Placement */
test("ships can be placed in grid going down", () => {
    sampleBoard.placeShip(0, 0, "down", sampleShip)
    expect(sampleBoard.board[0][0]).toBe("s");
    expect(sampleBoard.board[1][0]).toBe("s");
});
test("ships can be placed in grid going up", () => {
    sampleBoard.placeShip(3, 3, "up", sampleShip)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[2][3]).toBe("s");
});
test("ships can be placed in grid going left", () => {
    sampleBoard.placeShip(3, 3, "left", sampleShip)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[2][3]).toBe("s");
});
test("ships can be placed in grid going right", () => {
    sampleBoard.placeShip(3, 3, "right", sampleShip)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[3][4]).toBe("s");
});

test.todo("ship placement must be within grid");
test.todo("ship placement cannot overlap with other ships");

/* Mapping grid location to ships object */
test("ships know where they are on the grid", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    let sampleShip = Ship(3);
    sampleBoard.placeShip(3, 3, "right", sampleShip)
    expect(sampleShip.health[0]).toBe("3,3");
});
test("ships know where they are on the grid", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    let sampleShip = Ship(3);

    sampleBoard.placeShip(3, 3, "left", sampleShip)
    expect(sampleShip.health[0]).toBe("3,3");
    expect(sampleShip.health[1]).toBe("3,2");
    expect(sampleShip.health[2]).toBe("3,1");
});


// Tracking Hits and Misses
test("it tracks hits on the board", () => {
    sampleBoard.test(0, 1, "s")
    sampleBoard.recievedAttack(0, 1);
    expect(sampleBoard.board[0][1]).toBe("sh");
});
test("it tracks misses on the board", () => {
    sampleBoard.recievedAttack(2, 2);
    expect(sampleBoard.board[2][2]).toBe("m");
});

/* Tracking hits on Board to ship objects health */
test("it matches hit counts on the board to ships position", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    let sampleShip = sampleBoard.fleet.destroyer
    sampleBoard.placeShip(3, 3, "left", sampleShip)
    console.log(sampleShip);

   
    sampleBoard.recievedAttack(0, 1);
    console.log(sampleShip);

    expect(sampleShip.health[0]).toBe("x");
})











/* tracking hit counts, might be absolete if ships works out */
test("it tracks hit counts on the board", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    sampleBoard.placeShip(0, 1, "down", sampleShip)
    sampleBoard.recievedAttack(0, 1);
    expect(sampleBoard.hits).toBe(1);
});
test("it tracks multiple hit counts on the board", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    sampleBoard.placeShip(0, 1, "down", sampleShip)
    sampleBoard.recievedAttack(0, 1);
    sampleBoard.recievedAttack(1, 1);
    expect(sampleBoard.hits).toBe(2);
});
test("it checks hit counts against ships total", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;

    sampleBoard.health = 2;
    sampleBoard.placeShip(0, 1, "down", sampleShip)
    sampleBoard.recievedAttack(0, 1);
    sampleBoard.recievedAttack(1, 1);

    expect(sampleBoard.fleetStatus).toBe("N");
})


// Tracking Fleet Status
test("fleet status is 'Y' while a ship is afloat", () => {
    sampleBoard.fleet = [sampleShip]
    expect(sampleBoard.fleetStatus).toBe("Y");
});

test("fleet status is 'N' when all ships sunk", () => {
    sampleBoard.fleet = [sampleShip];
    sampleBoard.fleet[0].sunk = "Y";
    sampleBoard.hasFleet();
    expect(sampleBoard.fleetStatus).toBe("N");
})

let newGame = theGame();
let sampleHuman = newGame.human;
let sampleAI = newGame.ai;

// Game round testing
test("AIplay @ 5, 5 shoots at 5, 5", () => {
    newGame.aiPlay(5, 5);
    expect(sampleHuman.board[5][5]).toBe("m");
});

test("AIplay knows if it has sunk all human ships", () => {
    sampleHuman.fleet = [sampleShip];
})
