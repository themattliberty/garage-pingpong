import React from "react";
import ScreenSwitcher from "./ScreenSwitcher";
import GameContainer from './GameContainer';

export default function App() {
    return (
        <GameContainer.Provider>
            <ScreenSwitcher/>
        </GameContainer.Provider>
    );
}
