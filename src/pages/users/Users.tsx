import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  Typography,
  theme,
} from "antd";
import { useState, useMemo } from "react";
import { RightOutlined, LoadingOutlined } from "@ant-design/icons";
import { NavLink, Navigate } from "react-router-dom";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createUser, getUsers } from "../../http/api";
import { CreateUserData, FieldData, User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { PlusOutlined } from "@ant-design/icons";
import UserForm from "./forms/UserForm";
import { PER_PAGE } from "../../constant";
import { debounce } from "lodash";
import { render } from "@testing-library/react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: User) => {
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Restaurant",
    dataIndex: "tenant",
    key: "tenant",
    render: (_text: string, record: User) => {
      return <div>{record.tenant?.name}</div>;
    },
  },
];

const Users = () => {
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const queryClient = useQueryClient();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const { user } = useAuthStore();

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: CreateUserData) =>
      createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    console.log("Submitting data - ", form.getFieldsValue());
    await userMutate(form.getFieldsValue());
    form.resetFields();
    setDrawerOpen(false);
  };

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  });
  const [drawserOpen, setDrawerOpen] = useState(false);

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => {
        return { ...prev, q: value, currentPage: 1 };
      });
    }, 500);
  }, []);

  const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => {
        return {
          [item.name[0]]: item.value,
        };
      })
      .reduce((acc, item) => {
        return { ...acc, ...item };
      }, {});

    if ("q" in changedFilterFields) {
      debouncedQUpdate(changedFilterFields.q);
    } else {
      setQueryParams((prev) => {
        return { ...prev, ...changedFilterFields, currentPage: 1 };
      });
    }
  };

  if (user?.role !== "admin") {
    console.log(user?.role);
    return <Navigate to="/" replace={true} />;
  }

  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => {
          return !!item[1];
        })
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();

      return getUsers(queryString).then((res) => {
        return res.data;
      });
    },
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Flex justify="space-between">
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              { title: <NavLink to="/">Dashboard</NavLink> },
              { title: "Users" },
            ]}
          />
          {isFetching && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          )}
          {isError && (
            <Typography.Text type="danger">{error.message}</Typography.Text>
          )}
        </Flex>
        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <UsersFilter>
            <Button
              onClick={() => setDrawerOpen(true)}
              type="primary"
              icon={<PlusOutlined />}
            >
              Add User
            </Button>
          </UsersFilter>
        </Form>

        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={users?.data}
          pagination={{
            total: users?.total,
            pageSize: queryParams.perPage,
            current: queryParams.currentPage,
            onChange: (page) => {
              setQueryParams((prev) => {
                return { ...prev, currentPage: page };
              });
            },
          }}
        />

        <Drawer
          title="Create user"
          width={720}
          destroyOnClose={true}
          open={drawserOpen}
          extra={
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  setDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }
          onClose={() => {
            form.resetFields();
            setDrawerOpen(false);
          }}
          styles={{ body: { background: colorBgLayout } }}
        >
          <Form layout="vertical" form={form}>
            <UserForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
