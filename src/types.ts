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
  tenant?: Tenants;
};

export type CreateUserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  tenantId?: number;
};
export type UpdateUserData = Omit<CreateUserData, "password">;

export type Restaurant = {
  address: string;
  name: string;
  id: string;
  createdAt: string;
};

export type Tenants = {
  id: string;
  address: string;
  name: string;
};

export type createTenantData = Omit<Tenants, "id">;

export type FieldData = {
  name: string[];
  value?: string;
};

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export type ProductAttribute = {
  name: string;
  value: string | boolean;
};

export type Product = {
  name: string;
  description: string;
  _id: string;
  category: Category;
  status: boolean;
  createdAt: string;
  image: string;
  isPublished: boolean;
  priceConfiguration: PriceConfiguration;
  attributes: ProductAttribute[];
};

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

export type ImageField = { file: File };

export type CreateProductData = Product & { image: ImageField };
