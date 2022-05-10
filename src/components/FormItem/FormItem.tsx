/*
 * @Description: **表单Item组件**
 * @Author: henanjie
 * @Date: 2022-5-10 19:30:00
 * @LastEditTime: 2022-5-10 19:30:00
 */

import React from 'react';
import style from "./FormItem.css"

interface FormItemProps {

  label:string,
  rule:[],
  required?:boolean

}

class FormItem extends React.Component {

  constructor(props:FormItemProps){
    super(props)
  }

  render(): React.ReactNode {
      return <></>
  }

}

export default FormItem