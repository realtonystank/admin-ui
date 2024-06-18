export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
};

export type CreateUserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  tenantId: number;
};

export type Restaurant = {
  address: string;
  name: string;
  id: string;
  createdAt: string;
};

export type Tenants = {
  id: number;
  address: string;
  name: string;
};

export type createTenantData = Omit<Tenants, "id">;

export type FieldData = {
  name: string[];
  value?: string;
};
