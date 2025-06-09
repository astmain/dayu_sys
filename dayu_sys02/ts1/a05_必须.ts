export {}

import "reflect-metadata"

const REQUIRED_KEY = Symbol()


function Required() {
    return function (targ: object, key: string) {
        const requriedKeys: string[] = Reflect.getMetadata(REQUIRED_KEY, targ) || []
        Reflect.defineMetadata(REQUIRED_KEY, [...requriedKeys, key], targ)
    }
}


function validate(instance: object) {
    let existKeys = Reflect.ownKeys(instance)
    console.log(`validate---existKeys:`, existKeys)
    let requiredKeys = Reflect.getMetadata(REQUIRED_KEY, instance)
    console.log(`validate---requiredKeys:`, requiredKeys)

}

class Person {
    @Required()
    name!: string
    // @Required()
    age!: number

}

const person = new Person();


person.name = "abc"
validate(person)

