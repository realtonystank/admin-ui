import { Breadcrumb, Card, Space, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { NavLink, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { User } from "../../types";
import { useAuthStore } from "../../store";
import UsersFilter from "./UsersFilter";

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
        />
        <Table rowKey={"id"} columns={columns} dataSource={users} />
      </Space>
    </>
  );
};

export default Users;
