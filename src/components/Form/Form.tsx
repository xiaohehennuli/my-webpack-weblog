/*
 * @Description: **表单组件**
 * @Author: henanjie
 * @Date: 2022-5-10 19:00:00
 * @LastEditTime: 2022-5-10 19:00:00
 */

import React from 'react';
import FormItem, { FormItemProps } from '../FormItem/FormItem';
import style from './Form.css';

interface FormProps {}

class Form extends React.Component {
  constructor(props: FormProps) {
    super(props);
  }

  state: any = {
    formData: {},
  };


  // 提交表单数据
  submit = (cb:(data:any) => void) => {
    cb({...this.state.formData})
  }

  // 设置FormData 数据
  setValue = (name: string, value: string) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  // 重置From数据
  resetValue = () => {
    const { formData } = this.state;
    Object.keys(formData).forEach((item) => {
      formData[item] = ''
    });
    this.setState({formData},() => {
      console.log('formData',formData)
    })
  };

  render(): React.ReactNode {
    const { children } = this.props;
    const renderChildren: React.ReactNode[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        // 判断_child是否为FormItem，是就用React.ReactClone去克隆，如果不是则过滤掉
        // 过滤掉其他元素
        if (
          typeof child.type === 'function' &&
          child.type.name === 'FormItem'
        ) {
          const {name} = child.props
          //React.ReactClone去克隆元素
          const Children = React.cloneElement(child, {
            key:name, //加入key增加渲染效果,
            handleChange:this.setValue,
            value:this.state.formData[name]
          },child.props.children);
          renderChildren.push(Children);
        }
      }
    });
    return renderChildren;
  }
}

export default Form;
