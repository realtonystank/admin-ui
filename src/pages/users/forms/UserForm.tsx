import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getRestaurants } from "../../../http/api";
import { Tenants } from "../../../types";

const UserForm = ({ isEditMode = false }: { isEditMode: boolean }) => {
  const selectedRole = Form.useWatch("role");
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
          <Card title="Basic info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="First name"
                  name="firstName"
                  rules={[
                    { required: true, message: "First name is required" },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last name"
                  name="lastName"
                  rules={[{ required: true, message: "Last name is required" }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Email is required" },
                    {
                      type: "email",
                      message: "Email is not valid",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          {!isEditMode && (
            <Card title="Security info" bordered={false}>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                    ]}
                  >
                    <Input size="large" type="password" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          )}

          <Card title="Role" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: "Role is required" }]}
                >
                  <Select
                    id="selectBoxInUserForm"
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="Select role"
                    size="large"
                  >
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              {selectedRole === "manager" && (
                <Col span={12}>
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
                          <Select.Option key={tenant.id} value={tenant.id}>
                            {tenant.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default UserForm;
