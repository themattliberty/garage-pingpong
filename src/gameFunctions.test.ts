import {isGameComplete} from "./gameFunctions";
import {newGame} from "./Game";

describe('isGameComplete', () => {
    const subject = isGameComplete;

    test('returns false for a new game', () => {
        expect(subject(newGame())).toBe(false);
    });

    test.each`
        leftScore | rightScore | complete
        ${10} | ${4} | ${false}
        ${4} | ${9} | ${false}
        ${10} | ${21} | ${true}
        ${21} | ${10} | ${true}
        ${19} | ${19} | ${false}
        ${19} | ${20} | ${false}
        ${19} | ${21} | ${true}
        ${20} | ${19} | ${false}
        ${21} | ${19} | ${true}
        ${20} | ${20} | ${false}
        ${21} | ${20} | ${false}
        ${22} | ${20} | ${true}
        ${21} | ${21} | ${false}
        ${21} | ${22} | ${false}
        ${22} | ${22} | ${false}
        ${22} | ${24} | ${true}
        ${50} | ${50} | ${false}
        ${52} | ${50} | ${true}
    `('returns $complete for $leftScore-$rightScore', ({leftScore, rightScore, complete}) => {
        const game = {leftScore, rightScore};
        expect(subject(game)).toBe(complete);
    });
});
