import { Breadcrumb, Button, Card, Drawer, Space, Table } from "antd";
import { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { NavLink, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";
import { PlusOutlined } from "@ant-design/icons";

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
];

const Users = () => {
  const { user } = useAuthStore();
  const [drawserOpen, setDrawerOpen] = useState(false);

  if (user?.role !== "admin") {
    console.log(user?.role);
    return <Navigate to="/" replace={true} />;
  }

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return getUsers().then((res) => {
        const { users } = res.data;
        return users;
      });
    },
  });
  return (
    <>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Breadcrumb
          separator={<RightOutlined />}
          items={[
            { title: <NavLink to="/">Dashboard</NavLink> },
            { title: "Users" },
          ]}
        />

        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}

        <UsersFilter
          onFilterChange={(filterName, filterValue) => {
            console.log(filterName, filterValue);
          }}
        >
          <Button
            onClick={() => setDrawerOpen(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            Add User
          </Button>
        </UsersFilter>
        <Table rowKey={"id"} columns={columns} dataSource={users} />

        <Drawer
          title="Create user"
          width={720}
          destroyOnClose={true}
          open={drawserOpen}
          extra={
            <Space>
              <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
              <Button type="primary">Submit</Button>
            </Space>
          }
          onClose={() => {
            console.log("closing...");
            setDrawerOpen(false);
          }}
        >
          <p>Some content...</p>
          <p>Some content...</p>
          <p>Some content...</p>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
