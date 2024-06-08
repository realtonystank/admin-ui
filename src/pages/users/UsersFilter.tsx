import React from "react";
import { Button, Card, Col, Input, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const UsersFilter = () => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row justify="start" gutter={30}>
            <Col>
              <Input.Search placeholder="Search" />
            </Col>
            <Col>
              <Select
                allowClear={true}
                placeholder="Select Role"
                style={{ width: "100%" }}
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="mananger">Manager</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
              </Select>
            </Col>
            <Col>
              <Select
                allowClear={true}
                placeholder="Select status"
                style={{ width: "100%" }}
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          <Button type="primary" icon={<PlusOutlined />}>
            Add User
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UsersFilter;
