/*
 * @Description: **表单Item组件**
 * @Author: henanjie
 * @Date: 2022-5-10 19:30:00
 * @LastEditTime: 2022-5-10 19:30:00
 */

import React from 'react';
import { Input } from 'antd';
import style from './FormItem.css';

export interface FormItemProps {
  label: string;
  name: string;
  value?:any
  handleChange?:(name:string,value:any) => void
}

class FormItem extends React.Component<FormItemProps> {
  constructor(props: FormItemProps) {
    super(props);
  }

  onChange = (value:string) => {
    const {name,handleChange} = this.props
    if(typeof handleChange === 'function'){
      handleChange(name,value)
    }
  };

  render(): React.ReactNode {
    const { children, value, label } = this.props;
    return (
      <>
        <span>{label}</span>
        {React.isValidElement(children) &&
        typeof children.type === 'function' &&
        children.type.name === 'Input'
          ? React.cloneElement(children, { value, onChange: this.onChange })
          : null}
      </>
    );
  }
}

export default FormItem;
