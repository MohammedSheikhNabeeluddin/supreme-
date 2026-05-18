import { prisma } from "./db";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from "./mock-data";

export async function seed() {
  const categoriesCount = await prisma.category.count();
  if (categoriesCount === 0) {
    for (const cat of INITIAL_CATEGORIES) {
      await prisma.category.create({
        data: { id: cat.id, name: cat.name },
      });
    }
  }

  const productsCount = await prisma.product.count();
  if (productsCount === 0) {
    for (const prod of INITIAL_PRODUCTS) {
      await prisma.product.create({
        data: {
          id: prod.id,
          name: prod.name,
          description: prod.description,
          price: prod.price,
          discount: prod.discount,
          stock: prod.stock,
          images: JSON.stringify(prod.images),
          categoryId: prod.categoryId,
          tags: prod.tags,
        },
      });
    }
  }
}

export async function getProducts(categoryId?: string, search?: string) {
  return await prisma.product.findMany({
    where: {
      ...(categoryId ? { categoryId } : {}),
      ...(search ? {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
          { tags: { contains: search } }
        ]
      } : {}),
    },
    include: { category: true },
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function addCategory(name: string) {
  return await prisma.category.create({
    data: { name }
  });
}

export async function deleteCategory(id: string) {
  return await prisma.category.delete({
    where: { id }
  });
}

export async function addProduct(data: any) {
  return await prisma.product.create({
    data: {
      ...data,
      images: JSON.stringify(data.images),
      tags: data.tags,
    },
  });
}

export async function updateProduct(id: string, data: any) {
  return await prisma.product.update({
    where: { id },
    data: {
      ...data,
      images: data.images ? JSON.stringify(data.images) : undefined,
      tags: data.tags,
    },
  });
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({ where: { id } });
}

export async function getOrders() {
  return await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });
}

export async function createOrder(data: any) {
  return await prisma.order.create({
    data: {
      customer: data.customer,
      total: data.total,
      status: "PENDING",
      items: {
        create: data.items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });
}

export async function updateOrderStatus(id: string, status: string) {
  return await prisma.order.update({
    where: { id },
    data: { status },
  });
}
