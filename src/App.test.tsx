import React from 'react';
import { render } from '@testing-library/react';

let Subject: typeof import('./App').default;
let ScreenSwitcher: typeof import('./ScreenSwitcher').default;

beforeEach(() => {
    ScreenSwitcher = td.replace('./ScreenSwitcher').default;
    Subject = require('./App').default;
});

test('renders screen switcher', () => {
    td.when(ScreenSwitcher(td.matchers.anything()), {ignoreExtraArgs: true})
        .thenReturn('ScreenSwitcher');

    const {getByText} = render(<Subject/>);

    getByText('ScreenSwitcher');
});
