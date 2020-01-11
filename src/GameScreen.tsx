/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import {useEffect, useRef} from "react";
import styled from "@emotion/styled";
import {XOR} from "ts-xor";
import GameContainer from "./GameContainer";

export interface GameScreenProps {
}

export default function GameScreen(props: GameScreenProps) {
    const {game, pointLeft, pointRight, undo} = GameContainer.useContainer();
    const {leftScore, rightScore} = game;

    //TODO maybe this should be factored out into a custom hook?
    const pressedKey = useRef<string>();
    const undoTimeout = useRef<any>();
    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('keyup', handleKeyup);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('keyup', handleKeyup);
        };

        function handleKeydown(event: KeyboardEvent) {
            if (pressedKey.current !== undefined)
                return;
            if (event.key !== 'z' && event.key !== 'x')
                return;

            pressedKey.current = event.key;
            undoTimeout.current = setTimeout(() => {
                undo();
                undoTimeout.current = undefined;
            }, 400);
        }

        function handleKeyup(event: KeyboardEvent) {
            if (event.key !== pressedKey.current)
                return;
            pressedKey.current = undefined;

            // if key is released before undo
            if (undoTimeout.current !== undefined) {
                clearTimeout(undoTimeout.current);
                undoTimeout.current = undefined;

                if (event.key === 'z') {
                    pointLeft();
                } else if (event.key === 'x') {
                    pointRight();
                }
            }
        }
    }, [pointLeft, pointRight, undo]);

    return (
        <div
            css={css`
               position: absolute;
               top: 0; bottom: 0; right: 0; left: 0;

               display: grid;
               grid-template-areas:
                 ".          .           .            cancel"
                 "left-team  message     message      right-team"
                 "left-team  left-score  right-score  right-team"
                 "left-team  buttons     buttons      right-team"
               ;
               grid-template-rows: 1em auto 1fr auto;
               grid-template-columns: 4fr 5fr 5fr 4fr;

               padding: 0 0 1em 0;
               text-align: center;
            `}
        >
            <Message/>
            <Score left>{leftScore}</Score>
            <Score right>{rightScore}</Score>
            <Buttons>
                <Button onClick={() => undo()}>Undo Last Score</Button>
            </Buttons>
        </div>
    );
}

const Message = styled.div`
  grid-area: message;
  font-size: 1.2em;
  height: 1.2em;
  border: 2px solid black;
`;

type TeamProps = {
    players: string[];
} & XOR<{left: true}, {right: true}>

function Team(props: TeamProps) {
    const {players, left} = props;
    return (
        <div
            css={css`
              grid-area: ${left ? 'left-team' : 'right-team'};
              display: flex;
            `}
        >
            {players.map(player => (
                <Player key={player}>{player}</Player>
            ))}
        </div>
    );
}

const Player = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  font-size: 2.2em;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

type ScoreProps = {
    serving?: boolean;
} & XOR<{left: true}, {right: true}>

const Score = styled.div<ScoreProps>`
  display: grid;
  align-items: center;
  font-family: Helvetica, sans-serif;
  font-size: 10em;
  cursor: pointer;
  border-left: 2px solid black;
  ${props => props.left && css`
    grid-area: left-score;
    background-color: ${props.serving && '#6CD8A2'};
  `}
  ${props => props.right && css`
    grid-area: right-score;
    border-right: 2px solid black;
    background-color: ${props.serving && '#6CA2D8'};
  `}
`;

const Buttons = styled.div`
  grid-area: buttons;
  display: flex;
`;

const Button = styled.div`
  flex: 1;
  font-size: 1.2em;
  height: 1.2em;
  line-height: 1.2em;
  cursor: pointer;
  background-color: #ccc;
  border: 2px solid black;
  &:not(:first-child) {
    border-left: 0;
  }
  &:hover {
    background-color: #aaa;
  }
`;

const Cancel = styled.div`
  grid-area: cancel;
  justify-self: end;
  margin-right: 0.3em;
  cursor: pointer;
  font-size: 0.8em;
  opacity: 0.5;
  &:hover {
    opacity: 1;
    color: #D00;
  }
`;
