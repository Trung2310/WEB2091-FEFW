import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Button, Spin, Alert } from "antd";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const [searchParam] = useSearchParams();
console.log(searchParam);
const name = searchParam.get('name');
console.log(name);


const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(`http://localhost:3001/products?name_like=${name || ""}`);
  console.log(data); 
  return data;
};

const ProductList: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
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
      <h2>Danh sách sản phẩm</h2>
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