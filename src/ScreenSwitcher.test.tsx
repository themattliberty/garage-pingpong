import React from "react";
import {render} from "@testing-library/react";
import {newGame} from "./Game";

let Subject: typeof import('./ScreenSwitcher').default;
let GameContainer: typeof import('./GameContainer').default;
let GameScreen: typeof import('./GameScreen').default;
let GameOverScreen: typeof import('./GameOverScreen').default;
let Game: typeof import('./Game');

beforeEach(() => {
    GameContainer = td.replace('./GameContainer').default;
    GameScreen = td.replace('./GameScreen').default;
    GameOverScreen = td.replace('./GameOverScreen').default;
    Game = td.replace('./Game');
    Subject = require('./ScreenSwitcher').default;
});

test('shows game screen when game is in progress', () => {
    const game = newGame();
    td.when(GameContainer.useContainer()).thenReturn({game});
    td.when(Game.isGameComplete(game)).thenReturn(false);
    td.when(GameScreen(td.matchers.anything()), {ignoreExtraArgs: true})
        .thenReturn(<div>GameScreen</div>);

    const {getByText} = render(<Subject/>);

    getByText('GameScreen');
});

test('shows game over screen when game is complete', () => {
    const game = newGame();
    td.when(GameContainer.useContainer()).thenReturn({game});
    td.when(Game.isGameComplete(game)).thenReturn(true);
    td.when(GameOverScreen(td.matchers.anything()), {ignoreExtraArgs: true})
        .thenReturn(<div>GameOverScreen</div>);

    const {getByText} = render(<Subject/>);

    getByText('GameOverScreen');
});
