export {}

let dec = <T extends new (...args: []) => any>(tag: T) => {
    (tag as any).type = "动物";
    (tag as any).get_type = function () {

        return this.type
    }
    Object.assign(tag.prototype, {
        eat() {
        },
        drink() {
        },
    })
}

function over(tag: any) {
    return class extends tag {
        eat() {
            super.eat()
            console.log(`new eat---222:`, 333)
        }
    }
}


@dec
class Animal {

}

let animal = new Animal()
console.log(`111---animal:`, animal)
console.log(`111---animal:`, (Animal as any).type)
console.log(`111---animal:`, (Animal as any).get_type())


@over
class Person {
    eat() {
        console.log(`人类吃---222:`, 333)
    }
}

let person = new Person()

let aaa = 1
console.log(`111---222:`, aaa)
console.log('111---:', person.eat())

