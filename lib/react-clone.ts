import render from "./react-dom-clone";
import VDom from "./utils/vdom";
import {protoIsComp} from './utils';
function createVdom(args, parent?) {
    let vdom = new VDom({
        parent,
        ...args
    });
    return vdom;
}
export default function createElement(param) {
    console.log('render', arguments);
    let args = arguments;
    const arg0 = args[0];
    let vdom;
    if (protoIsComp(arg0)) {
        const instance = new arg0();
        vdom = instance.render();
        vdom.instance = instance;
    } else if (arg0 instanceof Function) {
        vdom = arg0(args[1]);
        vdom.func = arg0;
    } else {
        vdom = createVdom({type: arg0, attr: args[1]});
    }
    /* 渲染子节点 */
    for(let i = 2, len = args.length; i < len;i++) {
        const vd = args[i];
        let child;
        if (typeof vd !== 'string') {
            child = vd;
        } else {
            child = createVdom({
                type: 'text',
                attrs: null,
                children: [vd],
                parent: vdom,
            });
        }
        vdom.children.push(child);
    }
    return vdom;
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
        const elm = render(vdom);
        this.$parent.replaceChild(elm, this.$elm);
        this.$elm = elm;
    }
    abstract render();
}