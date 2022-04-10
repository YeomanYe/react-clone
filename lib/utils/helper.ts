import {Comp} from '../react-clone';
export const protoIsComp = (clzz) => {
    return clzz.prototype instanceof Comp;
}