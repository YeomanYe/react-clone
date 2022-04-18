const tagSet = new Set([
    'div',
    'span'
]);

export default function render(vdom, parent?: HTMLElement | null) {
    let dom;
    if (vdom.type === 'text') {
        dom = document.createTextNode(vdom.children.join(''));
    } else {
        dom = document.createElement(vdom.type);
        for (let child of vdom.children) {
            render(child, dom);
        }
    }
    if (vdom.instance) {
        vdom.instance.$parent = parent ?? vdom.instance.$parent;
        vdom.instance.$elm = dom;
    } else if (vdom.func) {
        vdom.func.$parent = parent ?? vdom.func.$parent;
        vdom.func.$elm = dom;
    }
    parent?.insertBefore(dom, null);
    return dom;
}