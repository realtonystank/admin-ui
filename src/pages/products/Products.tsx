import { Breadcrumb, Flex, Space, Spin, Typography } from "antd";
import { RightOutlined, LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { NavLink } from "react-router-dom";

const Products = () => {
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
      </Space>
    </>
  );
};

export default Products;
