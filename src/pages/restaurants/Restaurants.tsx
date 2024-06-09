import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getRestaurants } from "../../http/api";
import { Restaurant } from "../../types";
import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import RestaurantsFilter from "./RestaurantsFilter";
import { NavLink } from "react-router-dom";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";

const items = [
  {
    title: <NavLink to="/">Dashboard</NavLink>,
  },
  {
    title: "Restaurants",
  },
];

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Restaurants = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const {
    data: restaurants,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => {
      return getRestaurants().then((res) => {
        const { tenants } = res.data;
        return tenants;
      });
    },
  });

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Breadcrumb items={items} separator={<RightOutlined />} />

      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}

      <RestaurantsFilter
        onFilterChange={(filterName, filterValue) => {
          console.log(filterName, filterValue);
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerOpen(true)}
        >
          Add Restaurant
        </Button>
      </RestaurantsFilter>

      <Table rowKey={"id"} columns={columns} dataSource={restaurants} />

      <Drawer
        open={drawerOpen}
        extra={
          <Space>
            <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button type="primary">Submit</Button>
          </Space>
        }
        onClose={() => setDrawerOpen(false)}
        width={720}
        destroyOnClose={true}
      >
        <div>Content...</div>
        <div>Content...</div>
        <div>Content...</div>
      </Drawer>
    </Space>
  );
};

export default Restaurants;
