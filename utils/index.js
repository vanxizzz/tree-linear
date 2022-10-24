/**
 * 过滤掉对象中目标字段返回新对象
 * @param {*} origin 对象
 * @param {*} propsArr 需要删除的对象字段名数组
 */
exports.getDeletePropObject = (origin, propsArr)=> {
    const target = JSON.parse(JSON.stringify(origin));
    propsArr.forEach(item => {
        delete target[item];
    })
    return target;
}

/* 生成随机id */
exports.createRandomId = ()=> {
    return Math.random().toString(16).slice(2);
}




