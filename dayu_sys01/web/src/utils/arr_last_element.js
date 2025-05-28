export default function arr_last_element(arr) {
    return arr.map(subArray => {
        const lastItem = subArray[subArray.length - 1];
        // 如果最后一个元素是数组，返回该数组的最后一个元素
        return Array.isArray(lastItem) ? lastItem[lastItem.length - 1] : lastItem;
    });
}



/*

arr = [
    [
        1,
        2
    ],
    [
        1,
        3
    ],
    [
        1,
        2,
        22,
        [111,222]
    ]
]


console.log(arr_last_element(arr))
*/