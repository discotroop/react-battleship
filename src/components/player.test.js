import player from './player'

let playerOne = player();

// Grid Board Set Up
test("it returns and object with a nested array representing the board", () => {
    expect(playerOne.playersBoard.board.length).toBe(8);
});
