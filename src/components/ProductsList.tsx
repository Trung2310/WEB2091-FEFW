import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Button, Spin, Alert } from "antd";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductList: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  // const name = searchParams.get('name');
  const [name, setName] = useState();
  console.log(name);
  const nav = useNavigate();

  const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await axios.get(`http://localhost:3001/products?name_like=${name || ""}`);
    console.log(data);
    return data;
  };
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products", name],
    queryFn: fetchProducts,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: Product, b: Product) => a.id - b.id,
      render: (id: number) => {
        return <Link to={`/product/detail/${id}`}>ID: {id}</Link>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
      sorter: (a, b) => a.image.localeCompare(b.image),
      render: (image: string) => <img src={image} alt="Ảnh" style={{ width: 50 }} />,
    },

    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];

  const searchName = () => {
    refetch();
  }

  const handleAdd = () => {
    nav('/product/add');
  }

  if (error) {
    return (
      <Alert
        message="Lỗi"
        description="Không thể tải dữ liệu. Vui lòng thử lại!"
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      <h2 style={{color: 'black'}}>Danh sách sản phẩm</h2>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>
          Thêm sản phẩm
        </Button>
      </div>
      <input style={{ width: '300px' }} type="text" title="Tìm kiếm theo Tên"
        onChange={(e) => setName(e.target.value)} />
      <button onClick={searchName}>Tìm</button>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ProductList;