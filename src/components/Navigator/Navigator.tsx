/*
 * @Description: **博客顶部导航栏**
 * @Author: henanjie
 * @Date: 2022-1-29 17:00:00
 * @LastEditTime: 2022-2-12 15:00:00
 */

import { Menu } from "antd"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import style from "./Navigator.less"

type MenuItem = "mail" | "file" | "note" | "life" | "travel" | "GitHub"

interface MenuOptions {
  key: MenuItem
  value: string
}

const MENU_LIST: MenuOptions[] = [
  { key: "mail", value: "首页" },
  { key: "file", value: "归档" },
  { key: "note", value: "笔记" },
  { key: "life", value: "生活" },
  { key: "travel", value: "旅行" },
  { key: "GitHub", value: "GitHub" },
]

const ROUTER_MAP = new Map([
  ["mail", "/"],
  ["file", "/file"],
  ["note", "/note"],
  ["life", "/life"],
  ["travel", "/travel"],
])

const MenuList = () => {
  const navigate = useNavigate()
  const [selectMenu, setSelectMenu] = useState<MenuItem>("mail")
  const menuClick = (menu: MenuItem) => {
    setSelectMenu(menu)
    //TODO: 路由跳转
    if (menu === "GitHub") {
    } else {
      navigate(ROUTER_MAP.get(menu) || "")
    }
  }

  const list = MENU_LIST.map((item) => {
    return (
      <Menu.Item key={item.key} onClick={() => menuClick(item.key)}>
        {item.value}
      </Menu.Item>
    )
  })

  return (
    <div className={style["header-menu-box"]}>
      <Menu mode="horizontal" defaultSelectedKeys={[selectMenu]}>
        {list}
      </Menu>
    </div>
  )
}

const Navigator = () => {
  return (
    <header className={style["navigator"]}>
      <div className={style["left-container"]}>heshuaishuai</div>
      <div className={style["right-container"]}>
        <MenuList></MenuList>
      </div>
    </header>
  )
}

export default Navigator
