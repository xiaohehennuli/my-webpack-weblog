/*
 * @Description: **归档主页面**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

import FileLine from "../components/FileLine/FileLine"
import style from "../less/filePage.less"
import People from "../assets/people.svg"
import store from "../redux/store"

store.subscribe(() => console.log(store.getState()))

const FilePage = () => {
  store.dispatch({ type: "add", text: "test" })
  return (
    <div className={style["file-page-warp"]}>
      <section className={style["left-warp"]}>
        <People />
      </section>
      <section className={style["right-warp"]}>
        <FileLine></FileLine>
      </section>
    </div>
  )
}

export default FilePage
