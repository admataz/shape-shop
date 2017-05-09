import React from 'react';
import ReactDom from 'react-dom';
import Polygon from './js/components/Polygon';
import style from './style/main.scss';
import App from './js/App';

const d = document.getElementById('app');


const defaultShape = {
  x: 110,
  y: 110,
  radius:100,
  sides: 6,
  scale: 1,
  strokeWidth: 6
};

const colours = [
  '#000',
  '#fff',
  '#E86C4E',
  '#666',
  '#FFE074',
  '#71A166',
  '#667FCC'
];

if (d) {
  ReactDom.render(React.createElement(App, {defaultShape, colours}), d);
}
