export {}


function Echo(val) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(val, target, propertyKey, descriptor)

    }
}

@Echo('1类装饰器')//3
@Echo('2类装饰器')//2
@Echo('3类装饰器')//1
class Flow {
    constructor(@Echo('4构造函数的参数装饰器') str) {
        // console.log(str,111)
    }

    handler(@Echo('5原型方法的参数装饰器') str) {

    }

    @Echo('6静态属性装饰器')
    static type1 = "xxx"

    @Echo('7实例属性装饰器')
    name!: string

    @Echo('9属性访问器装饰器')
    get value() {
        return "aaa"
    }
}

let flow = new Flow('str')
console.log(`111---222:`, Flow.type1)
console.log(`111---222:`, typeof flow)
console.log(`111---222:`,  flow.value)
console.log(`111---222:`,  Flow.value)