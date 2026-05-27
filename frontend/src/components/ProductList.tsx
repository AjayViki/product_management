import React from "react";
import { Product } from "../types/product.types";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const ProductList: React.FC<Props> = ({
  products,
  onEdit,
  onDelete,
  loading,
}) => {
  if (loading)
    return (
      <div className="text-center py-4">
        <div className="spinner-border" />
      </div>
    );
  if (!products.length) return <p className="text-muted">No products yet.</p>;

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td className="text-muted">{p.description}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>
                <span className="badge bg-secondary">{p.quantity}</span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
