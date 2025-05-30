/*- coding = utf-8 -*-
@Time : 2022/10/11 9:29
@Author : 沉默小管
@File : systemRules.tsx
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
// 系统内部处理数据规则
/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data:any, id?:string|number, parentId?:string, children?:string|Array<any>):any {
    interface configInterface{
        id:string|number,
        parentId:string,
        childrenList:any
    }
    let config:configInterface = {
        id: id || 'id',
        parentId: parentId || 'parentId',
        childrenList: children || 'children'
    };

    let childrenListMap:any = {};
    let nodeIds:any = {};
    let tree:Array<any> = [];

    for (let d of data) {
        let parentId = d[config.parentId];
        if (childrenListMap[parentId] == null) {
            childrenListMap[parentId] = [];
        }
        nodeIds[d[config.id]] = d;
        childrenListMap[parentId].push(d);
    }

    for (let d of data) {
        let parentId = d[config.parentId];
        if (nodeIds[parentId] == null) {
            tree.push(d);
        }
    }

    for (let t of tree) {
        adaptToChildrenList(t);
    }

    function adaptToChildrenList(o:any) {
        if (childrenListMap[o[config.id]] !== null) {
            o[config.childrenList] = childrenListMap[o[config.id]];
        }
        if (o[config.childrenList]) {
            for (let c of o[config.childrenList]) {
                adaptToChildrenList(c);
            }
        }
    }
    return tree;
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str:string|undefined|null) {
    if (!str || str == "undefined" || str == "null") {
        return "";
    }
    return str;
}

// 添加日期范围
export function handleAddDateRange(params:any, dateRange?:Array<any>, propName?:any) {
    let search = params;
    search.params = typeof (search.params) === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {};
    dateRange = Array.isArray(dateRange) ? dateRange : [];
    if (typeof (propName) === 'undefined') {
        search.params['beginTime'] = dateRange[0];
        search.params['endTime'] = dateRange[1];
    } else {
        search.params['begin' + propName] = dateRange[0];
        search.params['end' + propName] = dateRange[1];
    }
    return search;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params:any) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result
}

// 验证是否为blob格式
export const blobValidate = async (data: any) => {
    let b = false;
    try {
        const text = await data.text();
        JSON.parse(text);
        b = false;
    } catch (error) {
        b = true;
    }
    return b;
};

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele:HTMLElement, cls:string) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * 递归处理
 */
export const handleArr = (arrParam:any,id?:number|string)=>{
    if(arrParam['children'] == undefined){
        arrParam['children'] = [];
    }
    for (let i in arrParam['children1']){
        let curNum = 0;
        for(let q in Object.keys(arrParam['children1'])){
            let num = Object.keys(arrParam['children1'])[q];
            arrParam['children'].push({
                'pow_name':arrParam['children1'][num]['pow_name'],
                'id':arrParam['children1'][num]['pow_id'],
                'pow_id':Math.random()+'---'+arrParam['children1'][num]['pow_id'],
                'parent_id':arrParam['children1'][num]['parent_id'],
                'pow_url':arrParam['children1'][num]['pow_url'],
                'sort':arrParam['children1'][num]['sort'],
                'pow_icon':arrParam['children1'][num]['pow_icon'],
                'description':arrParam['children1'][num]['description'],
                'children':[],
                'children1':arrParam['children1'][num]['children1'],
            })
            handleArr(arrParam['children1'][num]);
            curNum++;
        }
        //防止重复添加  等级重复
        if(curNum >= 2){
            break;
        }
    }
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele:HTMLElement, cls:string) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele:HTMLElement, cls:string) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        ele.className = ele.className.replace(reg, ' ')
    }
}