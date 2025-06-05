export {}

import "reflect-metadata"


@Reflect.metadata("Class", "Animal metadata")
class Animal {
    @Reflect.metadata("Class Property", "type metadata")
    static type: string = "动物"

    @Reflect.metadata("Class method", "eat metadata")
    eat(a: string): string {
        return a + "123"
    }

}

//WeakMap
Reflect.defineMetadata("Class", "Animal metadata", Animal)                      //Animal.Class = "Animal metadata"
Reflect.defineMetadata("Class Property", "type metadata", Animal, "type")       //Animal.type.Class Property = "type metadata"
Reflect.defineMetadata("Class method", "eat metadata", Animal.prototype, "eat") //
Reflect.defineMetadata("key", "key_value", Animal, "key") //
Reflect.defineMetadata("fun1", "fun1_value", Animal.prototype, "fun1") //

/*

weakMap = {
    Animal:{
            undefiend: {"Class"          : "Animal metadata"},
            "type"   : {"Class Property" : "type metadata" }
    },
    Animal.prototype:{
         "eat"       : {"Class method"   : "eat metadata"}
    }
}
*/
// tsc a04_reflect.ts

console.log(`111---222:`, Reflect.getMetadata('Class', Animal))
console.log(`111---222:`, Reflect.getMetadata('Class Property', Animal, "type"))
console.log(`111---222:`, Reflect.getMetadata('Class method', Animal.prototype, "eat"))
console.log(`111---222:`, Reflect.getMetadata('key', Animal, "key"))
console.log(`111---222:`, Reflect.getMetadata('fun1', Animal.prototype, "fun1"))
console.log(`type---222:`, Reflect.getMetadata('design:type', Animal.prototype, "eat"))
console.log(`paramtypes---222:`, Reflect.getMetadata('design:paramtypes', Animal.prototype, "eat"))
console.log(`returntype---222:`, Reflect.getMetadata('design:returntype', Animal.prototype, "eat"))

