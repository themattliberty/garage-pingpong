import React from 'react';
import GameScreen from "./GameScreen";
import {isGameComplete} from "./Game";
import GameOverScreen from "./GameOverScreen";
import GameContainer from "./GameContainer";

export interface ScreenSwitcherProps {
}

export default function ScreenSwitcher(props: ScreenSwitcherProps) {
    const {game} = GameContainer.useContainer();
    return isGameComplete(game) ? <GameOverScreen/> : <GameScreen/>;
}
