import {
  Breadcrumb,
  Button,
  Flex,
  Form,
  Image,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  RightOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ProductFilter from "./ProductFilter";
import { Product } from "../../types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PER_PAGE } from "../../constant";
import { getProducts } from "../../http/api";
import { format } from "date-fns";

const columns = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    render: (_text: string, record: Product) => {
      return (
        <div>
          <Space>
            <Image width={60} src={record.image} preview={false} />
            <Typography.Text>{record.name}</Typography.Text>
          </Space>
        </div>
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "isPublished",
    key: "isPublished",
    render: (_: boolean, record: Product) => {
      return (
        <>
          {record.isPublished ? (
            <Tag color="green">Published</Tag>
          ) : (
            <Tag color="red">Draft</Tag>
          )}
        </>
      );
    },
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => {
      return (
        <Typography.Text>
          {format(new Date(text), "dd/MM/yyyy HH:mm")}
        </Typography.Text>
      );
    },
  },
];

const Products = () => {
  const [filterForm] = Form.useForm();

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });

  const {
    data: products,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => {
          return !!item[1];
        })
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();

      return getProducts(queryString).then((res) => {
        console.log(res.data);
        return res.data;
      });
    },
    placeholderData: keepPreviousData,
  });

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

        <Table
          rowKey={"_id"}
          columns={[
            ...columns,
            {
              title: "Actions",
              render: (_: string, record: Product) => {
                return (
                  <Space>
                    <Button type="link" onClick={() => {}}>
                      Edit
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          dataSource={products?.data}
          pagination={{
            total: products?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentPage,
            onChange: (page) => {},
            showTotal: (total: number, range: number[]) => {
              return `Showing ${range[0]} - ${range[1]} of ${total} items`;
            },
          }}
        />
      </Space>
    </>
  );
};

export default Products;
