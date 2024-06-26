import {
  CreateUserData,
  Credentials,
  Tenants,
  UpdateUserData,
  createTenantData,
} from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);

export const getRestaurants = (queryString: string) =>
  api.get(`/tenants?${queryString}`);

export const createTenant = (tenant: createTenantData) =>
  api.post("/tenants", tenant);

export const updateTenant = (tenant: Tenants, id: string) =>
  api.patch(`/tenants/${id}`, tenant);

export const createUser = (user: CreateUserData) => api.post("/users", user);

export const updateUser = (user: UpdateUserData, id: string) =>
  api.patch(`/users/${id}`, user);
