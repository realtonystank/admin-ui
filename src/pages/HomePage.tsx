import { useAuthStore } from "../store";
import {
  Button,
  Card,
  Col,
  Flex,
  List,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import Icon from "@ant-design/icons";
import { greetUser } from "../utility";
import { BarChartIcon } from "../components/icons/BarChart";
import { ComponentType } from "react";
import { BagIcon } from "../components/icons/BagIcon";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

interface CardTitleProps {
  title: string;
  PrefixIcon: ComponentType<unknown>;
}

const CardTitle = ({ title, PrefixIcon }: CardTitleProps) => {
  return (
    <Space>
      <Icon component={PrefixIcon} />
      {title}
    </Space>
  );
};

const list = [
  {
    OrderSummary: "Peperoni, Margarita ...",
    address: "Bandra, Mumbai",
    amount: 1200,
    status: "preparing",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
  {
    OrderSummary: "Paneer, Chicken BBQ ...",
    address: "Balurghat, West bengal",
    amount: 2000,
    status: "on the way",
    loading: false,
  },
];

function App() {
  const { user } = useAuthStore();
  const greeting = greetUser();

  return (
    <div>
      <Title level={4}>
        {greeting}, {user?.firstName} 😀
      </Title>
      <Row gutter={16}>
        <Col
          span={12}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic title="Total orders" value={52} />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Total sale"
                  value={70000}
                  precision={2}
                  prefix="₹"
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card
                title={<CardTitle title="Sales" PrefixIcon={BarChartIcon} />}
                bordered={false}
              ></Card>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Card>
            <List
              header={<CardTitle title="Recent orders" PrefixIcon={BagIcon} />}
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.OrderSummary}
                    description={item.address}
                  />
                  <Row style={{ flex: 1 }} justify={"space-between"}>
                    <Col>
                      <Text strong>₹{item.amount}</Text>
                    </Col>
                    <Col>
                      <Tag color="volcano">{item.status}</Tag>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
            <div style={{ marginTop: 20 }}>
              <Button type="link">
                <Link to="/orders">See all orders</Link>
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
