import React from 'react';
import ReactDOM from 'react-dom';

// ReactDOM.render(<div>Hello World</div>, document.getElementById('app'));

import createElement, {Comp} from '@lib/react-clone';
import render from '@lib/react-dom-clone';

class World extends Comp {
    render() {
        return <span>World</span>;
    }
}
const Hello = () => <span>Hello</span>

const App = () => <div className="render-node">Hello World</div>;
console.log(createElement);

render(<div><Hello/>, <World /></div>, document.getElementById('app'));
// render(<App/>, document.getElementById('app'));
// render(<div className="render-node">Hello World</div>, document.getElementById('app-clone'));