/*
 * @Description: **旅行主页面**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */
import BolgMenu, { MenuItem } from "../components/Menu/Menu"
import style from "../less/lifepage.less"
import { Outlet } from "react-router-dom"

const TRAVEL_MENU_ITEM: MenuItem[] = require("../data/travel.json").menuData

const TravelPage = () => {
  return (
    <div className={style["life-wrap"]}>
      <section className={style["menu-wrap"]}>
        <BolgMenu menuData={TRAVEL_MENU_ITEM}></BolgMenu>
      </section>
      <section className={style["content-wrap"]}>
        <Outlet />
      </section>
    </div>
  )
}

export default TravelPage
