"use client";

import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, getCategories, seed } from "@/lib/actions-client";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Save,
  Loader2
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    categoryId: "",
    imageUrl: ""
  });

  const loadData = async () => {
    setLoading(true);
    await seed(); // Ensure data exists for demo
    const [p, c] = await Promise.all([getProducts(), getCategories()]);
    setProducts(p);
    setCategories(c);
    if (c.length > 0 && !formData.categoryId) {
      setFormData(prev => ({ ...prev, categoryId: c[0].id }));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    const images = JSON.parse(product.images);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      discount: (product.discount || "").toString(),
      stock: product.stock.toString(),
      categoryId: product.categoryId,
      imageUrl: images[0] || ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadData();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      discount: formData.discount ? parseFloat(formData.discount) : null,
      stock: parseInt(formData.stock),
      categoryId: formData.categoryId,
      images: [formData.imageUrl || "https://images.unsplash.com/photo-1544640808-32ca72ac7f67?w=400"]
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await addProduct(productData);
    }

    setIsModalOpen(false);
    setEditingProduct(null);
    loadData();
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormData({
              name: "",
              description: "",
              price: "",
              discount: "",
              stock: "",
              categoryId: categories[0]?.id || "",
              imageUrl: ""
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-gray-600 text-sm">Product</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Category</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Price</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Stock</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Discount</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {products.map((product) => {
              const images = JSON.parse(product.images);
              return (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={images[0]} alt="" className="h-10 w-10 rounded border object-cover" />
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {categories.find(c => c.id === product.categoryId)?.name}
                  </td>
                  <td className="p-4 font-medium text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 10 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{product.discount ? `${product.discount}%` : "-"}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Base Price ($)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Discount (%)</label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Inventory Stock</label>
                  <input
                    required
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter product description..."
                />
              </div>

              <div className="pt-6 border-t flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} /> {editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
