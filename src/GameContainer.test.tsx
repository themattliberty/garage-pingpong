import React from "react";
import GameContainer from "./GameContainer";
import {act, renderHook} from "@testing-library/react-hooks";
import Game, {newGame} from "./Game";

const subject = GameContainer;

function renderSubject(wrapper: React.FC) {
    return renderHook(() => subject.useContainer(), {wrapper});
}

function withInitialState(initialState?: Game): React.FC {
    return ({children}) => (
        <subject.Provider initialState={initialState}>
            {children}
        </subject.Provider>
    );
}

const withoutInitialState = withInitialState(undefined);

//TODO once we're loading the initial state from localStorage, will we still want this case?
test('default to new game', () => {
    const {result} = renderSubject(withoutInitialState);

    expect(result.current.game).toMatchObject({leftScore: 0, rightScore: 0});
});

test('pointLeft', () => {
    const {result} = renderSubject(withInitialState({leftScore: 8, rightScore: 2}));

    act(() => {
        result.current.pointLeft();
    });

    expect(result.current.game).toMatchObject({leftScore: 9, rightScore: 2});
});

test('pointRight', () => {
    const {result} = renderSubject(withInitialState({leftScore: 8, rightScore: 2}));

    act(() => {
        result.current.pointRight();
    });

    expect(result.current.game).toMatchObject({leftScore: 8, rightScore: 3});
});

test('playAgain', () => {
    const {result} = renderSubject(withInitialState({leftScore: 100, rightScore: 2000000}));

    act(() => {
        result.current.playAgain();
    });

    expect(result.current.game).toEqual(newGame());
});
