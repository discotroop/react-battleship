import gameBoard from './gameBoard'
import Ship from './ship'

let sampleBoard = gameBoard()
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
    expect(sampleBoard.board[0][1]).toBe("s");
});

test("ships can be placed in grid going up", () => {
    sampleBoard.placeShip(3, 3, "up", 2)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[3][2]).toBe("s");
});

test("ships can be placed in grid going left", () => {
    sampleBoard.placeShip(3, 3, "left", 2)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[2][3]).toBe("s");
});

test("ships can be placed in grid going right", () => {
    sampleBoard.placeShip(3, 3, "right", 2)
    expect(sampleBoard.board[3][3]).toBe("s");
    expect(sampleBoard.board[4][3]).toBe("s");
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