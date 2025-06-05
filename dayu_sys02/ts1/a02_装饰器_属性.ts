import {string} from "zod";

export {}


interface Animal {
    eat(): void
}

function Enum(isEnum: boolean = true): MethodDecorator {
    // return function (tag: any) {
    return function (tag: object, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = isEnum
        let old = descriptor.value
        descriptor.value = function () {
            console.log(`222---eat:`, propertyKey)
            // return old.apply(this, ...arguments)
            return old(...arguments)
        }
    }
}


function ToUpper(isUpper: boolean = true): any {
    return function (object, propertyKey,) {
        let val = ""
        Object.defineProperty(object, propertyKey, {
            enumerable: true,
            get() {
                console.log(`get---val:`, val)
                return val.toUpperCase()
            }
            , set(val_new) {
                val = val_new
            }
        })
    }
}


function ValToUpper(tag, key, descriptor) {
    let old_get = descriptor.get
    let old_set = descriptor.set
    let old_val = ""
    descriptor.set = function (new_val: string) {
        old_val = new_val
        return old_set.call(this, new_val.toUpperCase())
    }
    descriptor.get = function () {
        return old_get.call(this) + "---" + old_val
    }
}

class Animal {
    // @ToUpper()
    public title: string = "an"

    @Enum(false)
    eat() {
        console.log(`111---eat:`, 333)
    }

    private _val!: string //断言 _val 一定会被初始化
    @ValToUpper
    get val() {
        return this._val
    }

    set val(val: string) {
        this._val = val
    }
}


let animal = new Animal()
animal.eat()
console.log(`111---Animal.name:`, Animal.name)
console.log(`222---animal.name  :`, animal.title)


animal.val = "abc"
console.log(`111---animal.val:`, animal.val)

console.log(`999---222:`, 333)
