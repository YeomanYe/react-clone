import {Comp} from '../react-clone';
export const protoIsComp = (clzz) => {
    return clzz.prototype instanceof Comp;
}

/**
 * 判断obj1是否被obj2包含：
 *  obj1中的键都在obj2中，且递归比较的原始值都相同
 * @param obj1
 * @param obj2
 * @returns
 */
export function includeObj(obj1: Object, obj2: Object) {
    for (let k in obj1) {
        if (obj1.hasOwnProperty(k)) {
            let result = obj2.hasOwnProperty(k);
            if (typeof obj1[k] === 'object' && obj1[k] !== null) {
                result = typeof obj2[k] === 'object' && includeObj(obj1[k], obj2[k]);
                continue;
            } else {
                result = obj2[k] === obj1[k];
            }
            if (!result) return false;
        }
    }
    return true;
}

export function equalObj(obj1: Object, obj2: Object) {
    
}