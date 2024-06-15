import {
  CreateUserData,
  Credentials,
  Tenants,
  createTenantData,
} from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);

export const getRestaurants = () => api.get("/tenants");

export const createTenant = (tenant: createTenantData) =>
  api.post("/tenants", tenant);

export const createUser = (user: CreateUserData) => api.post("/users", user);
