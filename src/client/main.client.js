import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes.client.js';

const props = JSON.parse(document.getElementById('props').innerHTML);
ReactDOM.render(Routes, document.getElementById('root'));
