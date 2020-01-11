export default interface Game {
    leftScore: number;
    rightScore: number;
}

export function newGame(): Game {
    return {
        leftScore: 0,
        rightScore: 0,
    };
}