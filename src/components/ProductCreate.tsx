import React from 'react';
import { Form, Input, InputNumber, Button, Select, message, Card } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const { Option } = Select;

const ProductCreate: React.FC = () => {
  const [form] = Form.useForm();

  const addProduct = async (values: any) => {
    return await axios.post(`http://localhost:3001/products`, values)
  }

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
        message.success('ok');
    },
    onError: () => {

    }
  })

  const onFinish = (values: any) => {
    console.log('Submitted product:', values);
    message.success('Thêm sản phẩm thành công!');
    mutate(values);
    form.resetFields();
  };

  return (
    <Card title="Thêm sản phẩm mới" style={{ maxWidth: 600, margin: '0 auto', marginTop: 24 }}>
      <Form
        form={form}
        layout="vertical"
        name="product_create"
        onFinish={onFinish}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            type='number'
          />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
        //   rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Loại sản phẩm"
          name="category"
        >
          <Select placeholder="Chọn loại">
            <Option value="product1">a</Option>
            <Option value="product2">b</Option>
            <Option value="product3">c</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductCreate;
