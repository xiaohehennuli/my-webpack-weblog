/*
 ** 处理文章数据的reducer
 */

 type CountActionType = 'add'|'decrease'

 interface Action  {
   type:CountActionType ,
   text:string
 }

 const initConut:number = 0


const fileReducer = (count = initConut,action:Action) => {
  switch (action.type) {
    case "add":
      return count + 1
    case "decrease":
      return count - 1 
    default:
      return count;
  }
}

export default fileReducer