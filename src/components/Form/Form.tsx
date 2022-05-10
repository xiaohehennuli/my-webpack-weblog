/*
 * @Description: **表单组件**
 * @Author: henanjie
 * @Date: 2022-5-10 19:00:00
 * @LastEditTime: 2022-5-10 19:00:00
 */

import React from 'react';
import style from "./Form.css"

interface FormProps {

  children:React.ReactNode
  confirm:() => void

}

class Form extends React.Component {

  constructor(props:FormProps){
    super(props)
  }

  render(): React.ReactNode {
      return <></>
  }

}

export default Form



