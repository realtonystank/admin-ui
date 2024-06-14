import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getRestaurants } from "../../../http/api";
import { Tenants } from "../../../types";

const UserForm = () => {
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => {
      return getRestaurants().then((res) => {
        const { tenants } = res.data;
        return tenants;
      });
    },
  });
  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Basic info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="First name" name="firstName">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last name" name="lastName">
                  <Input size="large" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Security info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Password" name="password">
                  <Input size="large" type="password" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Role" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Role" name="role">
                  <Select
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="Select role"
                    size="large"
                  >
                    <Select.Option>Admin</Select.Option>
                    <Select.Option>Manager</Select.Option>
                    <Select.Option>Customer</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tenant" name="tenantId">
                  <Select
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="Select role"
                    size="large"
                  >
                    {restaurants.map((tenant: Tenants) => {
                      return (
                        <Select.Option value={tenant.id}>
                          {tenant.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default UserForm;
