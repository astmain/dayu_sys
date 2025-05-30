function aaa(msg, arg) {
    return {...arg, code: 200, msg: msg, err: ""}
}

list = 122
list2 = 122
console.log(`结构1:`, aaa("chengg", {list, list2}))




