import React from 'react';
import ReactDOM from 'react-dom';

// ReactDOM.render(<div>Hello World</div>, document.getElementById('app'));

import createElement from '@lib/react-clone';
import render from '@lib/react-dom-clone';

const App = () => <div className="render-node">Hello World</div>;
console.log(createElement);
render(<App/>, document.getElementById('app'));
render(<div className="render-node">Hello World</div>, document.getElementById('app'));