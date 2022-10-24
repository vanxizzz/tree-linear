const { tree2Linear, linear2Tree } = require("./index.js")


const rootData = {
    myId: "1",
    myChildren: [
        {
            myId: "1-1",
            myChildren: [
                {
                    myId: "1-1-1"
                },
            ]
        },
        {
            myId: "1-2",
            myChildren: [
                {
                    myId: "1-2-1",
                    myChildren: [
                        { myId: "1-2-1-1" }
                    ]
                },
            ]
        }
    ]
}
const tmp = tree2Linear({
    root: rootData,
    idField: "myId",
    childrenField: "myChildren",
    rootPid: "0000-0000",
    pIdField: "myParentId"
})
console.log(tmp)

let targetTree = linear2Tree({
    queue: tmp,
    pIdField: "myParentId",
    idField: "myId",
    childrenField : "myChildren",
    rootPid: "0000-0000",
    savePidField:true
});
console.log(targetTree)
console.log("测试")
