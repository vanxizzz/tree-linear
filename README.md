# tree-linear
## 功能
树形结构和线性结构之间的转换
## 使用
`参考case.js`

## tree2Linear参数配置
| 参数名 | 数据类型 |  必填|默认值  |简单描述 |举例|
| :----:| :----:   | :----:  | :----: |  :----: |:----: |
| root | Object |是🐢 |   | 树的根结点对象 |参考case.js|
| idField | String|是🐢 |   | id的字段名 |"myId"|
| childrenField | String|是🐢 |   | 孩子的字段名 ||
| pIdField | String|是🐢 |   | 生成的对象的父id的字段名 ||
| rootPid | String、Number |否⭕ | "0000-0000" | 根结点的pId||
## linear2Tree参数配置
| 参数名 | 数据类型 |  必填|默认值  |简单描述 |举例|
| :----:| :----:   | :----:  | :----: |  :----: |:----: |
| queue | Array |是🐢 |   | 线性列表 |参考case.js|
| idField | String|是🐢 |   | id的字段名 |"myId"|
| pIdField | String|是🐢 |   | 生成的对象的父id的字段名 ||
| childrenField | String|是🐢 |   | 孩子的字段名 ||
| rootPid | String、Number |否⭕ | "0000-0000" | 根结点的pId||
| savePidField | Boolean |否⭕ | true | 生成的结点对象是否保存pId字段||