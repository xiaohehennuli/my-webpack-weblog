import { Menu } from "antd"
import { useNavigate } from "react-router-dom"

const { SubMenu } = Menu

export type MenuType = "note" | "game" | "anime"

export interface MenuItem {
  name: string
  key: string
  link?: string
  type: MenuType
  children: MenuItem[]
}

interface MenuProps {
  menuData: MenuItem[]
  click?: () => void
}

const BolgMenu = (props: MenuProps) => {
  const { menuData, click } = props
  const navigate = useNavigate()
  const menuClick = (menuItem: MenuItem) => {
    navigate(menuItem.link || "/")
  }

  const list = menuData.map((item) => {
    if (item.children.length > 0) {
      const childrenList = item.children.map((data) => {
        return (
          <Menu.Item key={data.key} onClick={() => menuClick(data)}>
            {data.name}
          </Menu.Item>
        )
      })
      return (
        <SubMenu key={item.key} title={item.name}>
          {childrenList}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key} onClick={() => menuClick(item)}>
          {item.name}
        </Menu.Item>
      )
    }
  })

  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      {list}
    </Menu>
  )
}

export default BolgMenu
