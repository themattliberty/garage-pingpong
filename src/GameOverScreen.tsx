/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import styled from "@emotion/styled";
import GameContainer from "./GameContainer";
import {useEffect} from "react";
import {winnerOf} from "./gameFunctions";

export interface GameOverScreenProps {
}

export default function GameOverScreen(props: GameOverScreenProps) {
    const {game, playAgain, undo} = GameContainer.useContainer();

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };

        function handleKeydown(event: KeyboardEvent) {
            if (event.key === 'z' || event.key === 'x') {
                playAgain();
            }
        }
    }, [playAgain]);

    return (
        <div
            css={css`
              position: absolute;
              top: 1em; right: 1em; bottom: 1em; left: 1em;
              text-align: center;
              cursor: default;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
            `}
        >
            <div>
                {/* TODO pluralize */}
                <Title>...and the winner is:</Title>
                <Winners>{winnerOf(game)}</Winners>
            </div>
            <div>
                <SmallButton onClick={() => undo()}>Undo Last Score</SmallButton>
                <LargeButton onClick={() => playAgain()}>Play Another Game</LargeButton>
            </div>
        </div>
    );
}

const Title = styled.div`
  margin: 0.2em;
`;

const Winners = styled.div`
  margin: 0.2em;
  font-size: 3.5em;
`;

const Button = styled.div`
  width: 14em;
  background-color: #aaa;
  border: 3px solid black;
  border-radius: 0.5em;
  padding: 0.5em;
  margin: 1.5em auto;
  cursor: pointer;
  &:hover {
    background-color: #888;
  }
`;

const SmallButton = styled(Button)`
  font-size: 0.75em;
`;

const LargeButton = styled(Button)`
  font-size: 1.2em;
`;
