import {Comp} from './react-clone';
const tagSet = new Set([
    'div',
    'span'
]);
const protoIsComp = (clzz) => {
    return clzz.prototype instanceof Comp;
}
export default function render(vdom, dom?: HTMLElement) {
    console.log('render', arguments);
    const vdom0 = vdom[0];
    let elm;
    if (tagSet.has(vdom0)) {
        elm = document.createElement(vdom0);
        dom?.insertBefore(elm, null);
    } else if (protoIsComp(vdom0)) {
        const instance = new vdom0();
        const nvdom = instance.render();
        const $elm = render(nvdom, dom);
        instance.$parent = dom;
        instance.$elm = $elm;
    } else if (vdom0 instanceof Function) {
        let nvdom = vdom[0]();
        render(nvdom, dom);
    } else if (!tagSet.has(vdom0) && typeof vdom0 === 'string') {
        elm = document.createTextNode(vdom[0]);
        dom?.insertBefore(elm, null);
    }
    /* 渲染子节点 */
    for(let i = 2, len = vdom.length; i < len;i++) {
        const vd = vdom[i];
        render(typeof vd.length === 'number' && typeof vd !== 'string' ? vd : [vd], elm);
    }
    return elm;
}