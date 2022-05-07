/*
 * @Description: **笔记主页面**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */
import BlogMenu, { MenuItem } from "../components/Menu/Menu"
import { Outlet } from "react-router-dom"
import style from "../less/notePage.less"

const TRAVEL_MENU_ITEM: MenuItem[] = require("../data/csdn.json").menuData

const NotePage = () => {
  return (
    <div className={style["note-wrap"]}>
      <section className={style["menu-wrap"]}>
        <BlogMenu menuData={TRAVEL_MENU_ITEM}></BlogMenu>
      </section>
      <section className={style["content-wrap"]}>
        <Outlet />
      </section>
    </div>
  )
}

export default NotePage
