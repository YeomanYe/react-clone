export default class VDom {
    type; //节点类型，dom、节点、文本节点或者xxx节点
    key: string;
    attrs;
    children;
    parent; // 父虚拟dom节点
    instance; // class类型节点
    func; // function类型节点
    constructor({type, attrs, children = [], parent = null}) {
        this.type = type;
        this.attrs = attrs;
        this.children = children;
        this.parent = parent;
    }
}