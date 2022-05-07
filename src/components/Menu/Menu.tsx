import { Menu } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const { SubMenu } = Menu;

export type MenuType = 'note' | 'game' | 'anime';

export interface MenuItem {
  name: string;
  key: string;
  link?: string;
  type: MenuType;
  children: MenuItem[];
}

interface MenuProps {
  menuData: MenuItem[];
  click?: () => void;
}

const BlogMenu = (props: MenuProps) => {
  const { menuData, click } = props;

  const navigate = useNavigate();

  const menuClick = useCallback((menuItem: MenuItem) => {
    navigate(menuItem.link || '/');
  }, []);




  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      {menuData.map((item) => {
    return item.children.length > 0 ? (
      <SubMenu key={item.key} title={item.name}>
        {item.children.map((data) => (
          <Menu.Item key={data.key} onClick={() => menuClick(data)}>
            {data.name}
          </Menu.Item>
        ))}
      </SubMenu>
    ) : (
      <Menu.Item key={item.key} onClick={() => menuClick(item)}>
        {item.name}
      </Menu.Item>
    );
  })}
    </Menu>
  );
};

export default BlogMenu;
