import React, { useEffect, useState } from "react";
// @ts-ignore: CSS module import without type declarations
import "bootstrap/dist/css/bootstrap.min.css";
import { Product, CreateProductDTO } from "./types/product.types";
import { productService } from "./services/productService";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductCard from "./components/ProductCard";

type ViewMode = "table" | "card";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("card");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productService.getAll();
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (data: CreateProductDTO) => {
    if (editingProduct) {
      await productService.update(editingProduct._id, data);
    } else {
      await productService.create(data);
    }
    setEditing(null);
    setShowForm(false);
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;
    await productService.delete(id);
    fetchProducts();
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Product Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null);
            setShowForm((prev) => !prev);
          }}
        >
          {showForm ? "Close Form" : "+ Add Product"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">
              {editingProduct ? "Edit Product" : "New Product"}
            </h5>
            <ProductForm
              onSubmit={handleSubmit}
              editingProduct={editingProduct}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      {/* View toggle */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">{products.length} product(s)</span>
        <div className="btn-group btn-group-sm">
          <button
            className={`btn ${viewMode === "card" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setViewMode("card")}
          >
            Cards
          </button>
          <button
            className={`btn ${viewMode === "table" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setViewMode("table")}
          >
            Table
          </button>
        </div>
      </div>

      {/* Product display */}
      {viewMode === "table" ? (
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      ) : loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-muted text-center py-5">
          No products yet. Add one above!
        </p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((p) => (
            <div className="col" key={p._id}>
              <ProductCard
                product={p}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
