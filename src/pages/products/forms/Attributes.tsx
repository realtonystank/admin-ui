import React from "react";
import { Attribute, Category } from "../../../types";
import {
  Card,
  Col,
  Form,
  InputNumber,
  Radio,
  Row,
  Space,
  Switch,
  Typography,
} from "antd";

type AttributeProps = {
  selectedCategory: string;
};

const Attributes = ({ selectedCategory }: AttributeProps) => {
  const category: Category | null = selectedCategory
    ? JSON.parse(selectedCategory)
    : null;

  if (!category) {
    return null;
  }

  return (
    <Card
      title={<Typography.Text>Attributes</Typography.Text>}
      bordered={false}
    >
      {category.attributes.map((attribute: Attribute) => {
        return (
          <div key={attribute.name}>
            {attribute.widgetType === "radio" ? (
              <Form.Item
                label={attribute.name}
                name={["attributes", attribute.name]}
                initialValue={attribute.defaultValue}
                rules={[
                  { required: true, message: `${attribute.name} is required` },
                ]}
              >
                <Radio.Group>
                  {attribute.availableOptions.map((option: string) => {
                    return (
                      <Radio.Button value={option} key={option}>
                        {option}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            ) : attribute.widgetType === "switch" ? (
              <Row>
                <Col>
                  <Form.Item
                    label={attribute.name}
                    name={["attributes", attribute.name]}
                    valuePropName="checked"
                    initialValue={attribute.defaultValue}
                    rules={[
                      {
                        required: true,
                        message: `${attribute.name} is required`,
                      },
                    ]}
                  >
                    <Switch
                      defaultChecked={false}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : null}
          </div>
        );
      })}
    </Card>
  );
};

export default Attributes;
