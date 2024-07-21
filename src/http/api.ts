import {
  CreateUserData,
  Credentials,
  Tenants,
  UpdateUserData,
  createTenantData,
} from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/auth";
const CATALOG_SERVICE = "/api/catalog";

export const login = (credentials: Credentials) =>
  api.post(`${AUTH_SERVICE}/auth/login`, credentials);

export const self = () => api.get(`${AUTH_SERVICE}/auth/self`);

export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);

export const getUsers = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/users?${queryString}`);

export const getRestaurants = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/tenants?${queryString}`);

export const createTenant = (tenant: createTenantData) =>
  api.post(`${AUTH_SERVICE}/tenants`, tenant);

export const updateTenant = (tenant: Tenants, id: string) =>
  api.patch(`${AUTH_SERVICE}/tenants/${id}`, tenant);

export const createUser = (user: CreateUserData) =>
  api.post(`${AUTH_SERVICE}/users`, user);

export const updateUser = (user: UpdateUserData, id: string) =>
  api.patch(`${AUTH_SERVICE}/users/${id}`, user);
