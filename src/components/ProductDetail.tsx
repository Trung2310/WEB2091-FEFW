// ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Spin, Alert } from 'antd';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category?: string;
}

export function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:3001/products`);

        const found = data.find(p => p.id === Number(productId));

        if (!found) {
          throw new Error('Không tìm thấy sản phẩm');
        }

        setProduct(found);
      } catch (err: any) {
        setError(err.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) return <Spin tip="Đang tải..." />;

  if (error) return <Alert type="error" message={error} />;

  return (
    <Card title={`Chi tiết sản phẩm: ${product?.name}`}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{product?.id}</Descriptions.Item>
        <Descriptions.Item label="Tên">{product?.name}</Descriptions.Item>
        <Descriptions.Item label="Giá">{product?.price} VND</Descriptions.Item>
        <Descriptions.Item label="Mô tả">{product?.description}</Descriptions.Item>
        <Descriptions.Item label="Loại">{product?.category}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
