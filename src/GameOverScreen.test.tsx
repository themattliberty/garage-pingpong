import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {newGame} from "./Game";

let Subject: typeof import('./GameOverScreen').default;
let GameContainer: typeof import('./GameContainer').default;
let Game: typeof import('./Game');

beforeEach(() => {
    GameContainer = td.replace('./GameContainer').default;
    Game = td.replace('./Game');
    Subject = require('./GameOverScreen').default;
});

test('shows the winner', () => {
    const game = newGame();
    td.when(GameContainer.useContainer()).thenReturn({game});
    td.when(Game.winnerOf(game)).thenReturn('Shakespeare');

    const {getByText} = render(<Subject/>);

    getByText('Shakespeare');
});

test('has play again button', () => {
    const playAgain = td.function();
    td.when(GameContainer.useContainer()).thenReturn({playAgain});
    const {getByText} = render(<Subject/>);

    fireEvent.click(getByText('Play Another Game'));

    td.verify(playAgain());
});

test('has undo button', () => {
    const undo = td.function();
    td.when(GameContainer.useContainer()).thenReturn({undo});
    const {getByText} = render(<Subject/>);

    fireEvent.click(getByText('Undo Last Score'));

    td.verify(undo())
});

test.each(['z', 'x'])('allows playing again by pressing %s', (key) => {
    const playAgain = td.function();
    td.when(GameContainer.useContainer()).thenReturn({playAgain});
    render(<Subject/>);

    fireEvent.keyDown(document, {key});

    td.verify(playAgain());
});
