import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";

import { getCategories, getRestaurants } from "../../../http/api";
import { Category, Tenants } from "../../../types";
import Pricing from "./Pricing";
import Attributes from "./Attributes";
import ProductImage from "./ProductImage";
import { useAuthStore } from "../../../store";

const ProductForm = ({ form }: { form: FormInstance }) => {
  const { user } = useAuthStore();
  const selectedCategory = Form.useWatch("categoryId");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getCategories().then((res) => {
        const { data: category } = res.data;
        return category;
      }),
  });

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

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Product info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Name is required" }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="categoryId"
                  rules={[{ required: true, message: "Category is required" }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="Select category"
                    size="large"
                  >
                    {categories?.map((category: Category) => {
                      return (
                        <Select.Option key={category._id} value={category._id}>
                          {category.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "Description is required" },
                  ]}
                >
                  <Input.TextArea
                    rows={2}
                    size="large"
                    maxLength={150}
                    style={{ resize: "none" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Product image" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <ProductImage initialImage={form.getFieldValue("image")} />
              </Col>
            </Row>
          </Card>
          {user?.role !== "manager" && (
            <Card title="Tenant Info" bordered={false}>
              <Col span={24}>
                <Form.Item
                  label="Tenant"
                  name="tenantId"
                  rules={[
                    { required: true, message: "Restaurant is required" },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="Select restaurant"
                    size="large"
                  >
                    {restaurants?.map((tenant: Tenants) => {
                      return (
                        <Select.Option
                          key={tenant.id}
                          value={String(tenant.id)}
                        >
                          {tenant.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Card>
          )}

          {selectedCategory && <Pricing selectedCategory={selectedCategory} />}
          {selectedCategory && (
            <Attributes selectedCategory={selectedCategory} />
          )}

          <Card title="Other properties" bordered={false}>
            <Col span={12}>
              <Space size="middle" direction="horizontal">
                <Form.Item name="isPublished">
                  <Switch
                    defaultChecked={false}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                </Form.Item>
                <Typography.Text style={{ marginBottom: 20, display: "block" }}>
                  Published
                </Typography.Text>
              </Space>
            </Col>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default ProductForm;
