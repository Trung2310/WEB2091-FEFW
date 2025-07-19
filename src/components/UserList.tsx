import React from 'react';
import { Table, Tag, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: 'admin' | 'customer' | 'staff';
    status: boolean;
}

const roleColors: Record<User['role'], string> = {
    admin: 'red',
    customer: 'blue',
    staff: 'green',
};

const fetchUsers = async (): Promise<User[]> => {
    const { data } = await axios.get('http://localhost:3001/users');
    return data;
};

const ListUser: React.FC = () => {
    const {
        data: users,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    if (isLoading) return <p>Đang tải danh sách người dùng...</p>;
    if (error) return <p>Không thể tải dữ liệu!</p>;

    return (
        <div style={{ padding: 20 }}>
            <Typography.Title level={2}>👥 Danh sách người dùng</Typography.Title>

            <Table
                dataSource={users}
                rowKey="id"
                columns={[
                    { title: 'ID', dataIndex: 'id', width: 60 },
                    { title: 'Tên', dataIndex: 'name' },
                    { title: 'Email', dataIndex: 'email' },
                    { title: 'Số điện thoại', dataIndex: 'phone' },
                    {
                        title: 'Quyền',
                        dataIndex: 'role',
                        render: (role: User['role']) => <Tag color={roleColors[role]}>{role?.toUpperCase()}</Tag>,
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        render: (status: boolean) => (
                            <Tag color={status ? 'green' : 'red'}>
                                {status ? 'Đang hoạt động' : 'Ngưng hoạt động'}
                            </Tag>
                        ),
                    }
                ]}
            />
        </div>
    );
};

export default ListUser;
