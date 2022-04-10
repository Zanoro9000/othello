import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

// not added to the typings yet since its new
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
