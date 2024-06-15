import { Card, Form, Input } from "antd";
import React from "react";

const RestaurantForm = () => {
  return (
    <Card title="Basic info">
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Restaurant name is required",
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Restaurant address is required" }]}
      >
        <Input size="large" />
      </Form.Item>
    </Card>
  );
};

export default RestaurantForm;
