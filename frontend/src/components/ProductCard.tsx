import React from "react";
import { Product } from "../types/product.types";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<Props> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{product.name}</h5>
          <span className="badge bg-primary rounded-pill">
            Qty: {product.quantity}
          </span>
        </div>

        {/* Description */}
        <p className="card-text text-muted flex-grow-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-3">
          <span className="fs-5 fw-semibold text-success">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Meta */}
        <p className="card-text mb-3">
          <small className="text-muted">
            Added: {new Date(product.createdAt).toLocaleDateString()}
          </small>
        </p>

        {/* Actions */}
        <div className="d-flex gap-2 mt-auto">
          <button
            className="btn btn-outline-primary btn-sm flex-fill"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger btn-sm flex-fill"
            onClick={() => onDelete(product._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
