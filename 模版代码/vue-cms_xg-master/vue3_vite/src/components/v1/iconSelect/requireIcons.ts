let req = import.meta.glob(`@/assets/icons/svg/*.svg`);

let arr = []
for(let i in req){
  arr.push((i+"").split("/svg/")[1].split(".")[0]);
}

export default arr
