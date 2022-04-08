
export default function render(vdom, dom: HTMLElement) {
    const vdom0 = vdom[0];
    let elm;
    if (vdom0 instanceof Function) {
        vdom = vdom[0]();
        console.log(vdom);
        elm = document.createElement(vdom[0]);
    } else if (typeof vdom0 === 'string') {
        elm = document.createTextNode(vdom[0]);
    }
    if (vdom[2]) {
        render([vdom[2]], elm);
    }
    dom.insertBefore(elm, null);
    console.log('render', arguments);
}