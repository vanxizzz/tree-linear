const {getDeletePropObject,createRandomId} = require("./utils/index.js")
/**
 * 树变成线性
 * @param {*} root 根
 * @param {*} idField id的字段名
 * @param {*} childrenField 孩子的字段名
 * @param {*} pIdField 生成的对象的父id的字段名
 * @param {*} rootPid 根结点的pId，默认是0000-0000
 * 
 */
function tree2Linear({root, idField, childrenField,pIdField,rootPid="0000-0000"}) {
    let res = [];
    _core({root});
    function _core({root, parentId}){
        /* root的children */
        let rootChildren = root[childrenField];
        /* root的除去children剩下的属性 */
        let rootData = getDeletePropObject(root, [childrenField]);
        /* 父节点id */
        let pId = parentId;
        if (!parentId) {
            /* 是根 */
            res.push({ ...rootData, [pIdField]:rootPid });
            pId = root[idField];
        }
        rootChildren?.forEach((child) => {
            let childData = getDeletePropObject(child, [childrenField]);
            let children = child[childrenField];
            let obj = {
                ...childData,
                [pIdField]:pId
            };
            obj[idField] = obj[idField] ? obj[idField] : createRandomId();
            res.push({ ...obj });
            if (children && children.length > 0) {
                // res.push(...tree2Queue(child, idField, childrenField, obj[idField]));
                _core({root:child,parentId:obj[idField]});
            }
        })
    }
    return res;
}
/**
 * 线性变成树
 * @param {*} queue 队列
 * @param {*} pIdField 父id的字段名
 * @param {*} idField id的字段名
 * @param {*} childrenField 孩子的字段名
 * @param {*} rootPid 根结点的pId，默认是0000-0000
 * @param {*} savePidField 生成的结点对象是否保存pId字段,默认保存
 */
function linear2Tree({queue, idField, pIdField,childrenField,rootPid="0000-0000",savePidField=true}) {
    let findedIndex = {};
    let rootIndex = queue.findIndex(item => item[pIdField] === rootPid);
    let root = queue[rootIndex];
    if(!savePidField){
        root = getDeletePropObject(queue[rootIndex], [pIdField]);
    }
    findedIndex[rootIndex] = true;
    const targetTree = getTargetTree(root);
    return targetTree;
    function getTargetTree(parent) {
        const children = [];
        const curFindedIndex = {};
        queue.forEach((item, index) => {
            if (!findedIndex[index] && item[pIdField] === parent[idField]) {
                /* 是孩子 */
                let deletePidFieldObj = item;
                if(!savePidField){
                    deletePidFieldObj = getDeletePropObject(item, [pIdField])
                }
                children.push(deletePidFieldObj);
                curFindedIndex[index] = true;
            }
        })
        let finalChildren = children.map((item) => {
            return getTargetTree(item);
        })
        findedIndex = {...findedIndex , ...curFindedIndex};
        const res = {...parent};
        if(finalChildren.length > 0){
            res[childrenField] = finalChildren
        }
        return res
    }
}

exports.tree2Linear = tree2Linear;
exports.linear2Tree = linear2Tree;