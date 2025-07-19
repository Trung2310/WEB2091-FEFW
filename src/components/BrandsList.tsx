import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { data } from 'react-router-dom';

interface Brand {
  id: number;
  name: string;
  origin?: string;
}

const fetchBrands = async (): Promise<Brand[]> => {
  const { data } = await axios.get("http://localhost:3001/brands");
  return data;
};

const BrandManager: React.FC = () => {
  const {
    data: brands,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={2}>Thương hiệu</Typography.Title>

      <Table dataSource={brands} rowKey="id" columns={[
        { title: 'ID', dataIndex: 'id', width: 60 },
        { title: 'Tên thương hiệu', dataIndex: 'name' },
        { title: 'Xuất xứ', dataIndex: 'origin' },
      ]} />
    </div>
  );
};

export default BrandManager;
