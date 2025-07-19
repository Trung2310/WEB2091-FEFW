import React, { useState } from "react";
import {
    BarsOutlined,
    CarTwoTone,
    HomeOutlined,
    OrderedListOutlined,
    ShopFilled,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    { label: "Homepage", key: "/", icon: <HomeOutlined /> },
    { label: "Products", key: "/products", icon: <ShopFilled /> },
    { label: "Users", key: "/users", icon: <UserOutlined /> },
    { label: "Categories", key: "/categories", icon: <CarTwoTone /> },
    { label: "Brands", key: "/brands", icon: <BarsOutlined /> },
    { label: "Orders", key: "/orders", icon: <OrderedListOutlined /> },
];

const Header: React.FC = () => {
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname);
    const navigate = useNavigate();

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        navigate(e.key);
    };

    return (
        <>
            <div style={{ padding: 0, margin: 0 }}>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                    style={{ flexWrap: 'nowrap' }} 
                />
            <Outlet/>

            </div>
        </>
    );
};

export default Header;
