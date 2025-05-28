export default function build_depart_menu_btn(depart_menu) {


    let result = {}
    for (let index = 0; index < depart_menu.length; index++) {
        const ele = depart_menu[index];
        console.log('111---:', ele)
        if (!result[ele.role]) {
            result[ele.role] = []
        }
        result[ele.role].push(ele)
    }
    let arr: any = []
    for (const key in result) {
        let item = {name: key, list: result[key]}
        arr.push(item)
    }


    return arr
}

// console.log('result---:', build_depart_menu_btn(depart_menu))
