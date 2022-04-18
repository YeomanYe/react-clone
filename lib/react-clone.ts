import render from "./react-dom-clone";
import VDom from "./utils/vdom";
import {includeObj, protoIsComp} from './utils';
function createVdom(args, parent?) {
    let vdom = new VDom({
        parent,
        ...args
    });
    return vdom;
}
// 虚拟dom比较
function diffVdom(newVdom, oldVdom) {
    const result: any[] = [];
    if (newVdom.key === oldVdom.key && newVdom.type === oldVdom.type) {
        result.push({
            vdom: newVdom,
            flag: 'Update',
        });
    } else if (!newVdom && oldVdom) {
        result.push({
            vdom: oldVdom,
            flag: 'Delete',
        });
    } else {
        result.push({
            vdom: newVdom,
            flag: 'Create'
        })
    }
    return result;
}
let currentCaller: {
    [key: string]: any
} = {};
export default function createElement(param) {
    console.log('render', arguments);
    let args = arguments;
    const arg0 = args[0];
    let vdom;
    if (protoIsComp(arg0)) {
        const instance = new arg0();
        vdom = instance.render();
        vdom.instance = instance;
        vdom.instance.$vdom = vdom;
    } else if (arg0 instanceof Function) {
        vdom = arg0(args[1]);
        vdom.func = arg0;
        vdom.func.$vdom = vdom;
    } else if (currentCaller.instance) {
        vdom = createVdom({type: arg0, attr: args[1]});
        vdom.instance = currentCaller.instance;
        vdom.instance.$vdom = vdom;
    } else if (currentCaller.func) {
        vdom = createVdom({type: arg0, attr: args[1]});
        vdom.func = currentCaller.func;
        vdom.func.$vdom = vdom;
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

export function dispatchUpdate(arr) {
    let item = arr.pop();
    while(item) {
        const {vdom} = item;
        const oldElm = vdom.instance.$elm;
        const elm = render(vdom);
        vdom.instance.$parent.replaceChild(elm, oldElm);
        vdom.instance.$elm = elm;
        item = arr.pop();
    }
}

export abstract class Comp {
    state;
    $vdom;
    $parent: HTMLElement;
    $elm;
    constructor(props) {
        
    }
    setState(newState) {
        if (includeObj(newState, this.state)) {
            return;
        }
        this.state = Object.assign({}, this.state, newState);
        currentCaller.instance = this;
        const vdom = this.render();
        const result = diffVdom(vdom, this.$vdom);
        dispatchUpdate(result);
    }
    abstract render();
}