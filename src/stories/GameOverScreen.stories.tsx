import React from "react";
import GameOverScreen from "../GameOverScreen";
import GameContainer from "../GameContainer";

export default {
    component: GameOverScreen,
    title: 'Game Over Screen',
    decorators: [(story: any) => (
        <GameContainer.Provider>
            {story()}
        </GameContainer.Provider>
    )],
};

export const gameOver = () => (
    <GameOverScreen/>
);
