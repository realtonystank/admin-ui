import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Layout,
  Space,
} from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/Logo";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Credentials } from "../../types";
import { self, login } from "../../http/api";
import { useAuthStore } from "../../store";

const LoginPage = () => {
  const { setUser } = useAuthStore();

  const loginUser = async (credentials: Credentials) => {
    const data = await login(credentials);
    return data;
  };

  const getSelf = async () => {
    const { data } = await self();
    return data;
  };

  const { data: selfData, refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfDataPromise = await refetch();
      setUser(selfDataPromise.data);
    },
  });

  return (
    <Layout style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <Space direction="vertical" align="center" size="large">
        <Layout.Content
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
        </Layout.Content>
        <Card
          bordered={false}
          style={{ width: 300 }}
          title={
            <Space
              style={{ width: "100%", fontSize: 16, justifyContent: "center" }}
            >
              <LockFilled />
              Sign in
            </Space>
          }
        >
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => {
              mutate({ email: values.username, password: values.password });
              console.log(values);
            }}
          >
            {isError && (
              <Alert
                type="error"
                message={error.message}
                style={{ marginBottom: 24 }}
              />
            )}
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please provide your username",
                },
                { type: "email", message: "Email is not valid" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please provide your password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Flex style={{ justifyContent: "space-between" }}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="" id="login-form-forgot">
                Forgot password
              </a>
            </Flex>

            <Form.Item name="username">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isPending}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Layout>
  );
};

export default LoginPage;
