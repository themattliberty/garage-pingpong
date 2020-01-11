// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// @ts-ignore
global.td = require('testdouble');
declare global {
    const td: typeof import('testdouble');
}
require('testdouble-jest')(td, jest);
afterEach(() => {
    td.reset();
});
