import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {newGame} from "./Game";

let Subject: typeof import('./GameScreen').default;
let gameContext: any;
let playScore: typeof import('./soundPlayer').playScore;

beforeEach(() => {
    const GameContainer = td.replace('./GameContainer').default;
    ({playScore} = td.replace('./soundPlayer'));
    Subject = require('./GameScreen').default;

    gameContext = td.object(['pointLeft', 'pointRight', 'undo', 'playAgain']);
    gameContext.game = newGame();
    td.when(GameContainer.useContainer()).thenReturn(gameContext);

    jest.useFakeTimers();
});

test('shows the score', () => {
    gameContext.game = {leftScore: 15, rightScore: 8};

    const {getByText} = render(<Subject/>);

    getByText('15');
    getByText('8');
});

test('has undo button', () => {
    const {undo} = gameContext;
    const {getByText} = render(<Subject/>);

    fireEvent.click(getByText('Undo Last Score'));

    td.verify(undo());
});

test.each([
    ['pointLeft', 'z'],
    ['pointRight', 'x'],
])('calls %s when %s is pressed', (handlerName, key) => {
    const {[handlerName]: handler} = gameContext;
    render(<Subject/>);

    fireEvent.keyDown(document, {key});
    fireEvent.keyUp(document, {key});

    td.verify(handler());
});

test.each(['z', 'x'])('calls undo when %s is held', (key) => {
    const {undo} = gameContext;
    render(<Subject/>);

    fireEvent.keyDown(document, {key});

    td.verify(undo(), {times: 0, ignoreExtraArgs: true});

    jest.advanceTimersByTime(400);

    td.verify(undo());
});

//TODO pay attention to only one button at a time

test.each(['z', 'x'])('calls playScore when %s is pressed', (key) => {
    render(<Subject/>);

    fireEvent.keyDown(document, {key});
    fireEvent.keyUp(document, {key});

    td.verify(playScore());
});
