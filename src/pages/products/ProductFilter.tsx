import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import React, { ReactNode } from "react";
import { getCategories, getRestaurants } from "../../http/api";
import { Category, Restaurant } from "../../types";
import { useAuthStore } from "../../store";
type productFilterProps = {
  children: ReactNode;
};
const ProductFilter = ({ children }: productFilterProps) => {
  const { user } = useAuthStore();
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => {
      const queryString = new URLSearchParams({
        perPage: "500",
        currentPage: "1",
      }).toString();
      return getRestaurants(queryString).then((res) => {
        const { data: tenants } = res.data;
        return tenants;
      });
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getCategories().then((res) => {
        const { data: category } = res.data;
        return category;
      }),
  });

  return (
    <Card>
      <Row justify="space-between">
        <Col span={18}>
          <Row justify="start" gutter={30}>
            <Col span={6}>
              <Form.Item name="q">
                <Input.Search placeholder="Search" allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="categoryId">
                <Select
                  allowClear={true}
                  placeholder="Select Category"
                  style={{ width: "100%" }}
                >
                  {categories?.map((category: Category) => {
                    return (
                      <Select.Option
                        value={`${category._id}`}
                        key={`${category._id}`}
                      >
                        {category.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            {user!.role === "admin" && (
              <Col span={6}>
                <Form.Item name="tenantId">
                  <Select
                    allowClear={true}
                    placeholder="Select Restaurant"
                    style={{ width: "100%" }}
                  >
                    {restaurants?.map((restaurant: Restaurant) => {
                      return (
                        <Select.Option
                          value={`${restaurant.id}`}
                          key={`${restaurant.id}`}
                        >
                          {restaurant.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            )}

            <Col span={6}>
              <Space size="middle" direction="horizontal">
                <Form.Item name="isPublished">
                  <Switch defaultChecked={false} />
                </Form.Item>
                <Typography.Text style={{ marginBottom: 20, display: "block" }}>
                  Show only published
                </Typography.Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={6} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default ProductFilter;
