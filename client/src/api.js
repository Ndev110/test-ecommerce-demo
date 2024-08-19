import { API } from "./utils /constants/index";
import { api } from "./service/apiService";

export const fetchProducts = () => api.get(API.products);
export const createProduct = (product) => api.post(API.products, product);
export const updateProduct = (id, product) =>
  api.put(`${API.products}/${id}`, product);
export const deleteProduct = (id) => api.delete(`${API.products}/${id}`);

export const fetchOrders = () => api.get(API.orders);
export const createOrder = (order) => api.post(API.orders, order);
export const updateOrder = (id, order) => api.put(`${API.orders}/${id}`, order);
export const deleteOrder = (id) => api.delete(`${API.orders}/${id}`);
