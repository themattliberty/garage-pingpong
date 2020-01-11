import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {newGame} from "./Game";

let Subject: typeof import('./GameScreen').default;
let GameContainer: typeof import('./GameContainer').default;

beforeEach(() => {
    GameContainer = td.replace('./GameContainer').default;
    Subject = require('./GameScreen').default;
    jest.useFakeTimers();
});

test('shows the score', () => {
    const game = {leftScore: 15, rightScore: 8};
    td.when(GameContainer.useContainer()).thenReturn({game});

    const {getByText} = render(<Subject/>);

    getByText('15');
    getByText('8');
});

test('has undo button', () => {
    const undo = td.function();
    td.when(GameContainer.useContainer()).thenReturn({undo, game: newGame()});
    const {getByText} = render(<Subject/>);

    fireEvent.click(getByText('Undo Last Score'));

    td.verify(undo());
});

test.each([
    ['pointLeft', 'z'],
    ['pointRight', 'x'],
])('calls %s when %s is pressed', (handlerName, key) => {
    const handler = td.function();
    td.when(GameContainer.useContainer()).thenReturn({[handlerName]: handler, game: newGame()});
    render(<Subject/>);

    fireEvent.keyDown(document, {key});
    fireEvent.keyUp(document, {key});

    td.verify(handler());
});

test.each(['z', 'x'])('calls undo when %s is held', (key) => {
    const undo = td.function();
    td.when(GameContainer.useContainer()).thenReturn({undo, game: newGame()});
    render(<Subject/>);

    fireEvent.keyDown(document, {key});

    td.verify(undo(), {times: 0, ignoreExtraArgs: true});

    jest.advanceTimersByTime(400);

    td.verify(undo());
});

//TODO pay attention to only one button at a time
