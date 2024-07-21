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
type productFilterProps = {
  children: ReactNode;
};
const ProductFilter = ({ children }: productFilterProps) => {
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
              <Form.Item name="category">
                <Select
                  allowClear={true}
                  placeholder="Select Category"
                  style={{ width: "100%" }}
                >
                  <Select.Option value="admin">Pizza</Select.Option>
                  <Select.Option value="manager">Beverages</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="tenants">
                <Select
                  allowClear={true}
                  placeholder="Select Restaurant"
                  style={{ width: "100%" }}
                >
                  <Select.Option value="admin">Pizza hub</Select.Option>
                  <Select.Option value="manager">Softy corner</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space size="middle" direction="horizontal">
                <Switch defaultChecked />
                <Typography.Text>Show only published</Typography.Text>
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
