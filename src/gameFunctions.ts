import Game from "./Game";

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