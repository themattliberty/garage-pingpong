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

export function isGameComplete(game: Game): boolean {
    const [larger, smaller] = [game.leftScore, game.rightScore].sort((a, b) => b - a);
    if (smaller < 20) {
        return larger >= 21;
    } else {
        return larger - smaller >= 2;
    }
}

export function winnerOf(game: Game): string {
    //TODO
    return "one o' y'all";
}
