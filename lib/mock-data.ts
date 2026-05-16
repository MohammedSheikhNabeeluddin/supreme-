export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  stock: number;
  images: any; // String in DB, array in memory
  categoryId: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
};

export type Order = {
  id: string;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  customer: string;
  items: OrderItem[];
  createdAt: string;
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Fiction' },
  { id: '2', name: 'Textbooks' },
  { id: '3', name: 'Pens' },
  { id: '4', name: 'Notebooks' },
  { id: '5', name: 'Stationery' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'The Great Gatsby',
    description: 'A classic novel by F. Scott Fitzgerald.',
    price: 15.99,
    discount: 10,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1543004218-ee14110497f9?auto=format&fit=crop&w=400&h=500&q=80'],
    categoryId: '1',
  },
  {
    id: 'p2',
    name: 'Calculus: Early Transcendentals',
    description: 'A comprehensive guide to calculus.',
    price: 120.0,
    stock: 20,
    images: ['https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&w=400&h=500&q=80'],
    categoryId: '2',
  },
  {
    id: 'p3',
    name: 'Luxury Fountain Pen',
    description: 'Elegant writing instrument with smooth ink flow.',
    price: 45.0,
    discount: 5,
    stock: 30,
    images: ['https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&h=500&q=80'],
    categoryId: '3',
  },
  {
    id: 'p4',
    name: 'Moleskine Classic Notebook',
    description: 'Premium quality paper for your thoughts.',
    price: 19.99,
    stock: 100,
    images: ['https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=400&h=500&q=80'],
    categoryId: '4',
  },
];
