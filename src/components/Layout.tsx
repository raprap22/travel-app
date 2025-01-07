import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  FileDoneOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';
import { Layout as AntLayout, Menu, Typography, Drawer, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import toast from 'react-hot-toast';

const { Header, Content } = AntLayout;

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const location = window.location.pathname.split('/');
  const navigate = useNavigate();

  const toggleDrawer = () => setVisible(!visible);

  const handleMenuClick = (e: any) => {
    const route = routes.find((item) => item.label === e.key);
    if (e.key === 'logout') {
      setIsLogout(true);
    } else if (route) {
      navigate(route.path);
    }
  };

  const handleLogout = () => {
    toast.success('Successfully Logout');
    setTimeout(() => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      window.location.href = '/';
    }, 800);
  };

  return (
    <AntLayout className="min-h-screen">
      <Header className="!px-6 md:!px-20 bg-white flex items-center w-full justify-between">
        <Typography.Text className="capitalize text-sm sm:text-lg md:text-xl lg:text-2xl bg-primary rounded-lg text-white text-center py-1 px-4 font-bold">
          {location[location.length - 1]}
        </Typography.Text>

        <div className="hidden md:flex">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            className="!bg-white flex items-center"
            onClick={handleMenuClick}
          >
            <Menu.Item className="!text-primary !flex items-center" key="dashboard">
              <AreaChartOutlined className="mr-1" /> Dashboard
            </Menu.Item>
            <Menu.Item className="!text-primary !flex items-center" key="profile">
              <UserOutlined className="mr-1" /> Profile
            </Menu.Item>
            <Menu.Item className="!text-primary !flex items-center" key="article">
              <FileDoneOutlined className="mr-1" /> Article
            </Menu.Item>
            <Menu.Item className="!text-primary !flex items-center" key="logout">
              <LogoutOutlined className="mr-1" /> Logout
            </Menu.Item>
          </Menu>
        </div>

        <div className="md:hidden">
          <Button
            type="text"
            icon={visible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleDrawer}
          />
        </div>
      </Header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        open={visible}
        className="md:hidden"
      >
        <Menu mode="vertical" defaultSelectedKeys={['1']} onClick={handleMenuClick}>
          <Menu.Item key="dashboard">
            <AreaChartOutlined className="mr-1" /> Dashboard
          </Menu.Item>
          <Menu.Item key="profile" onClick={toggleDrawer}>
            <UserOutlined className="mr-1" /> Profile
          </Menu.Item>
          <Menu.Item key="article" onClick={toggleDrawer}>
            <FileDoneOutlined className="mr-1" /> Article
          </Menu.Item>
          <Menu.Item key="logout" onClick={toggleDrawer}>
            <LogoutOutlined className="mr-1" /> Logout
          </Menu.Item>
        </Menu>
      </Drawer>

      <Content className="flex-grow px-4 md:px-16 py-5 overflow-auto">{children}</Content>
      <Modal
        title="Logout"
        open={isLogout}
        onOk={() => handleLogout()}
        okText="Yes"
        onCancel={() => setIsLogout(false)}
      >
        <Typography>Are you sure want to Logout ?</Typography>
      </Modal>
    </AntLayout>
  );
};
