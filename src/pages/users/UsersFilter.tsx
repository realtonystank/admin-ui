import { ReactNode } from "react";
import { Card, Col, Form, Input, Row, Select } from "antd";

type userFilterProps = {
  children: ReactNode;
};

const UsersFilter = ({ children }: userFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row justify="start" gutter={30}>
            <Col>
              <Form.Item name="q">
                <Input.Search placeholder="Search" allowClear={true} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="role">
                <Select
                  allowClear={true}
                  placeholder="Select Role"
                  style={{ width: "100%" }}
                >
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="manager">Manager</Select.Option>
                  <Select.Option value="customer">Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col>
              <Select
                allowClear={true}
                placeholder="Select status"
                style={{ width: "100%" }}
              >
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col> */}
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default UsersFilter;
