"use server";
import {
  getProducts as dbGetProducts,
  getProductById as dbGetProductById,
  getCategories as dbGetCategories,
  addProduct as dbAddProduct,
  updateProduct as dbUpdateProduct,
  deleteProduct as dbDeleteProduct,
  getOrders as dbGetOrders,
  createOrder as dbCreateOrder,
  updateOrderStatus as dbUpdateOrderStatus,
  seed as dbSeed,
  addCategory as dbAddCategory,
  deleteCategory as dbDeleteCategory
} from "./actions";

export async function getProducts(categoryId?: string, search?: string) {
  return await dbGetProducts(categoryId, search);
}

export async function getProductById(id: string) {
  return await dbGetProductById(id);
}

export async function getCategories() {
  return await dbGetCategories();
}

export async function addProduct(data: any) {
  return await dbAddProduct(data);
}

export async function updateProduct(id: string, data: any) {
  return await dbUpdateProduct(id, data);
}

export async function deleteProduct(id: string) {
  return await dbDeleteProduct(id);
}

export async function getOrders() {
  return await dbGetOrders();
}

export async function createOrder(data: any) {
  return await dbCreateOrder(data);
}

export async function updateOrderStatus(id: string, status: string) {
  return await dbUpdateOrderStatus(id, status);
}

export async function seed() {
  return await dbSeed();
}

export async function addCategory(name: string) {
  return await dbAddCategory(name);
}

export async function deleteCategory(id: string) {
  return await dbDeleteCategory(id);
}
