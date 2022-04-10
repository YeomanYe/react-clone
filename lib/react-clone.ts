import render from "./react-dom-clone";

export default function createElement() {
    return arguments;
}

export abstract class Comp {
    state;
    $parent: HTMLElement;
    $elm;
    constructor(props) {
        
    }
    setState(newState) {
        this.state = Object.assign({}, this.state, newState);
        const vdom = this.render();
        const elm = render(vdom)
        this.$parent.replaceChild(elm, this.$elm);
        this.$elm = elm;
    }
    abstract render();
}