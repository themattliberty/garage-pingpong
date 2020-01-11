import { configure } from '@storybook/react';
import GameContainer from "../src/GameContainer";
import {newGame} from "../src/Game";
import {action} from "@storybook/addon-actions";

// automatically import all files ending in *.stories.{js,tsx}
configure(require.context('../src/stories', true, /\.stories\.(js|tsx)$/), module);

// use our app's global styles in our storybook
import '../src/index.css'

// simulate app state for components that need it
// maybe there's a better way of doing this... I still need to finish the storybook tutorial
GameContainer.useContainer = () => ({
    game: newGame(),
    pointLeft: action('pointLeft'),
    pointRight: action('pointRight'),
    undo: action('undo'),
    playAgain: action('play again'),
});
