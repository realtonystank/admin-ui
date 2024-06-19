import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { createTenant, getRestaurants, updateTenant } from "../../http/api";
import { Restaurant, Tenants, createTenantData } from "../../types";
import { Breadcrumb, Button, Drawer, Form, Space, Table } from "antd";
import RestaurantsFilter from "./RestaurantsFilter";
import { NavLink } from "react-router-dom";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import RestaurantForm from "./forms/RestaurantForm";
import { useForm } from "antd/es/form/Form";

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

  const [currentEditingTenant, setCurrentEditingTenant] =
    useState<Tenants | null>(null);

  const [form] = useForm();
  const queryClient = useQueryClient();

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

  const { mutate: tenantMutate } = useMutation({
    mutationKey: ["tenant"],
    mutationFn: async (data: createTenantData) =>
      createTenant(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });

  const { mutate: updateTenantMutation } = useMutation({
    mutationKey: ["update-tenant"],
    mutationFn: async (data: Tenants) =>
      updateTenant(data, currentEditingTenant!.id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();
    const isEditMode = !!currentEditingTenant;
    if (isEditMode) {
      await updateTenantMutation(form.getFieldsValue());
    } else {
      await tenantMutate(form.getFieldsValue());
    }
    form.resetFields();
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (currentEditingTenant) {
      setDrawerOpen(true);
      form.setFieldsValue({
        ...currentEditingTenant,
      });
    }
  }, [currentEditingTenant, form]);

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

      <Table
        rowKey={"id"}
        columns={[
          ...columns,
          {
            title: "Actions",
            render: (_: string, record: Tenants) => {
              return (
                <Space>
                  <Button
                    type="link"
                    onClick={() => {
                      setCurrentEditingTenant(record);
                    }}
                  >
                    Edit
                  </Button>
                </Space>
              );
            },
          },
        ]}
        dataSource={restaurants}
      />

      <Drawer
        title={currentEditingTenant ? "Update a tenant" : "Create a tenant"}
        open={drawerOpen}
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
          setCurrentEditingTenant(null);
        }}
        width={720}
        destroyOnClose={true}
      >
        <Form layout="vertical" form={form}>
          <RestaurantForm />
        </Form>
      </Drawer>
    </Space>
  );
};

export default Restaurants;
