import React from 'react';
import { Table, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  description?: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get("http://localhost:3001/categories");
  return data;
};

const CategoryManager: React.FC = () => {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={2}>Danh mục</Typography.Title>

      <Table
        loading={isLoading}
        dataSource={categories}
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          { title: 'Tên danh mục', dataIndex: 'name' },
          { title: 'Mô tả', dataIndex: 'description' },
        ]}
      />
    </div>
  );
};

export default CategoryManager;
