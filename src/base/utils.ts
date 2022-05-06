/*
 * @Description: **项目公用工具类**
 * @Author: henanjie
 * @Date: 2022-3-19 10:40:00
 * @LastEditTime: 2022-3-19 10:40:00
 */

class Utils {

  constructor() {

  }

  /**
   * 防抖
   * @param cb 需要包装的函数
   * @param delay 延迟时间
   * @param immediate 第一次是否立即执行，默认为true
   */
  debounce(func:Function,delay =100,immediate=true) {
    let timer:null|number = null
    return (...args:any) => {
      const doNow = immediate&&!timer
      if(timer) clearTimeout(timer)
      //这里要用window.setTimeout,否则类型会推导成react-dom下的setTimeout
      timer = window.setTimeout(() => {
      func.apply(this,args)
        timer = null
      },delay)
      doNow && func.apply(this,args)
     }
  }

  /**
   * 节流
   * @param func 需要包装的函数
   * @param delay 延迟时间
   */

  thottle(func:Function,delay = 1000) {

    let timer:null|number = null
    return (...args:any) => {
      if(!timer){
        timer = window.setTimeout(() => {
          func.apply(this,args)
          timer = null
        },delay)
      }
    }
  }
  
}


export const utils = new Utils()
