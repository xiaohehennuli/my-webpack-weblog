/*
 * @Description: **Input组件**
 * @Author: henanjie
 * @Date: 2022-5-12 19:00:00
 * @LastEditTime: 2022-5-12 19:00:00
 */

interface InputPorps {
  onChange?:(value:any) => {}
  value?:any
}

const Input = (props:InputPorps) => {
  const {onChange,value} = props
  console.log('value~',value)
  return <input type="text" onChange={(e) => {onChange&&onChange(e.target.value)}} value={value||''} />
}

export default Input
