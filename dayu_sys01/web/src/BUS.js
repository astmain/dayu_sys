import api from "@src/api/api"


let name = "BUS"
let state = {
  user: {},
  api: api,



  aabb: [],

  clazz: new class {
    bbb = []
    aaa = []
    async func1() {
      if (this.aaa.length == 0) {
        console.log('func1-111', this.aaa)
        this.aaa = [111, 222]
        return this.aaa
      } else {
        console.log('func1--222', this.aaa)
        return this.aaa
      }
    }

  }()

  ,


  clazz4: new class {
    bbb = []
    aaa = []
    async func1() {
      if (this.aaa.length == 0) {
        console.log('func1-111', this.aaa)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.aaa = [111, 222]
            resolve(this.aaa)
          }, 1000)
        })
      } else {
        console.log('func1--222', this.aaa)
        return this.aaa
      }
    }

  }(),

  clazz3: class {
    bbb = []
    aaa = []
    async func1() {
      if (this.aaa.length == 0) {
        console.log('func1-111', this.aaa)
        this.aaa = [111, 222]
        return this.aaa
      } else {
        console.log('func1--222', this.aaa)
        return this.aaa
      }
    }

  },

  clazz5: class {
    bbb = []
    aaa = []
    async func1() {
      if (BUS.aabb.length == 0) {
        console.log('func1-111', this.aaa)
        this.aaa = [111, 222]
        return this.aaa
      } else {
        console.log('func1--222', this.aaa)
        return this.aaa
      }
    }

  }


}




let persist = {
  //这里存储默认使用的是session
  enabled: true, strategies: [

  ],
}

export default { name, state, persist }
