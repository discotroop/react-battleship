import theGame from './gameBoard'
import Ship from './ship'

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







// Ship Placement
test("ships can be placed in grid going down", () => {
    sampleBoard.placeShip(0, 0, "down", 2)
    expect(sampleBoard.board[0][0]).toBe("s");
    expect(sampleBoard.board[1][0]).toBe("s");
});

test("ships can be placed in grid going up", () => {
    sampleBoard.placeShip(3, 3, "up", 2)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[2][3]).toBe("s");
});

test("ships can be placed in grid going left", () => {
    sampleBoard.placeShip(3, 3, "left", 2)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[2][3]).toBe("s");
});

test("ships can be placed in grid going right", () => {
    sampleBoard.placeShip(3, 3, "right", 2)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[3][4]).toBe("s");
});

test.todo("ship placement must be within grid")
test.todo("ship placement cannot overlap with other ships")









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

test("it tracks hit counts", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    sampleBoard.placeShip(0, 1, "down", 1)
    sampleBoard.recievedAttack(0, 1);
    expect(sampleBoard.hits).toBe(1);
});

test("it tracks hit counts 2", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;
    sampleBoard.placeShip(0, 1, "down", 2)
    sampleBoard.recievedAttack(0, 1);
    sampleBoard.recievedAttack(1, 1);
    expect(sampleBoard.hits).toBe(2);
});

test("it checks hit counts against ships total", () => {
    let sampleGame = theGame();
    let sampleBoard = sampleGame.human;

    sampleBoard.health = 2;
    sampleBoard.placeShip(0, 1, "down", 2)
    sampleBoard.recievedAttack(0, 1);
    sampleBoard.recievedAttack(1, 1);
    console.log(sampleBoard.hits);
    console.log(sampleBoard.health)
    

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
