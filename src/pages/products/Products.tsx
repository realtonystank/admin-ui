import { Breadcrumb, Button, Flex, Form, Space, Spin, Typography } from "antd";
import {
  RightOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import ProductFilter from "./ProductFilter";

const Products = () => {
  const [filterForm] = Form.useForm();
  return (
    <>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Flex justify="space-between">
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              { title: <NavLink to="/">Dashboard</NavLink> },
              { title: "Products" },
            ]}
          />
        </Flex>
        <Form form={filterForm} onFieldsChange={() => {}}>
          <ProductFilter>
            <Button onClick={() => {}} type="primary" icon={<PlusOutlined />}>
              Add Product
            </Button>
          </ProductFilter>
        </Form>
      </Space>
    </>
  );
};

export default Products;
