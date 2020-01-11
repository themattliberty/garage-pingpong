import {createContainer} from 'unstated-next'
import {useState} from "react";
import Game, {newGame} from "./Game";

//TODO return Readonly<> ?
export default createContainer((initialState?: Game) => {
    const [game, setGame] = useState(initialState || (() => newGame()));
    return {
        game,
        pointLeft() {
            setGame({...game, leftScore: game.leftScore + 1});
        },
        pointRight() {
            setGame({...game, rightScore: game.rightScore + 1});
        },
        undo() {
            //TODO
        },
        playAgain() {
            setGame(newGame());
        },
    };
})
