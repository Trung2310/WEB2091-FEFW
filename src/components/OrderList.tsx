import React, { useEffect, useState } from 'react';
import { Table, Typography, Tag } from 'antd';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface OrderItem {
    productId: string;
    name: string;
    size: number;
    color: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    userId: string;
    userName: string;
    items: OrderItem[];
    total: number;
    status: 'Pending' | 'Completed' | 'Cancelled';
    createdAt: string;
}

const statusColors: Record<Order["status"], string> = {
    Pending: 'orange',
    Completed: 'green',
    Cancelled: 'red',
};
const fetchOrders = async (): Promise<Order[]> => {
    const { data } = await axios.get("http://localhost:3001/orders");
    return data;
};

const OrderList: React.FC = () => {
    const {
        data: orders,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <Typography.Title level={2}>📦 Danh sách đơn hàng</Typography.Title>

            <Table
                dataSource={orders}
                rowKey="id"
                columns={[
                    { title: 'ID', dataIndex: 'id', width: 60 },
                    {
                        title: 'Khách hàng',
                        dataIndex: 'userName',
                        render: (_, record) => `[${record.userId}] ${record.userName}`,
                    },
                    {
                        title: 'Tổng tiền',
                        dataIndex: 'total',
                        render: (v) => `${new Intl.NumberFormat('vi-VN').format(v)} VND`,
                    },
                    { title: 'Ngày tạo', dataIndex: 'createdAt' },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        render: (status: Order["status"]) => (
                            <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default OrderList;
