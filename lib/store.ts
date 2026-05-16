import { Product, Category, Order, INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './mock-data';

// Simple in-memory store for demo purposes
// In a real app, this would be a database via Prisma
class Store {
  private products: Product[] = [...INITIAL_PRODUCTS];
  private categories: Category[] = [...INITIAL_CATEGORIES];
  private orders: Order[] = [];

  getProducts() {
    return this.products;
  }

  getProductById(id: string) {
    return this.products.find((p) => p.id === id);
  }

  getCategories() {
    return this.categories;
  }

  getOrders() {
    return this.orders;
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
  }

  createOrder(order: Omit<Order, 'id' | 'createdAt'>) {
    const newOrder = {
      ...order,
      id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  updateOrderStatus(id: string, status: Order['status']) {
    const index = this.orders.findIndex((o) => o.id === id);
    if (index !== -1) {
      this.orders[index].status = status;
      return this.orders[index];
    }
    return null;
  }
}

export const store = new Store();
