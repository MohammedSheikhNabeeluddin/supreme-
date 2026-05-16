export type Category = {
  id: string;
  name: string;
  parent?: 'Book' | 'Stationery';
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
  tags?: string;
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

const CATEGORIES: Category[] = [
  { id: 'cat-bio', name: 'Biographies', parent: 'Book' },
  { id: 'cat-cbse', name: 'CBSE Books', parent: 'Book' },
  { id: 'cat-coll', name: 'College Books', parent: 'Book' },
  { id: 'cat-comp', name: 'Competitive Exam Books', parent: 'Book' },
  { id: 'cat-kids', name: 'Kids Books', parent: 'Book' },
  { id: 'cat-novels', name: 'Novels', parent: 'Book' },
  { id: 'cat-rel', name: 'Religious Books', parent: 'Book' },
  { id: 'cat-story', name: 'Story Books', parent: 'Book' },
  { id: 'cat-stat', name: 'Stationery', parent: 'Stationery' },
];

export const INITIAL_CATEGORIES: Category[] = CATEGORIES.sort((a, b) => a.name.localeCompare(b.name));

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'The Great Gatsby',
    description: 'A classic novel by F. Scott Fitzgerald.',
    price: 15.99,
    discount: 10,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1543004218-ee14110497f9?auto=format&fit=crop&w=400&h=500&q=80'],
    categoryId: 'cat-novels',
    tags: 'classic, fiction, f scott fitzgerald',
  },
  {
    id: 'p3',
    name: 'Luxury Fountain Pen',
    description: 'Elegant writing instrument with smooth ink flow.',
    price: 45.0,
    discount: 5,
    stock: 30,
    images: ['https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&h=500&q=80'],
    categoryId: 'cat-stat',
    tags: 'pen, luxury, office, writing',
  },
];
