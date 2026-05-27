import React, { useState, useEffect } from "react";
import { Product, CreateProductDTO } from "../types/product.types";

interface Props {
  onSubmit: (data: CreateProductDTO) => Promise<void>;
  editingProduct?: Product | null;
  onCancel: () => void;
}

const INITIAL: CreateProductDTO = {
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};

const ProductForm: React.FC<Props> = ({
  onSubmit,
  editingProduct,
  onCancel,
}) => {
  const [form, setForm] = useState<CreateProductDTO>(INITIAL);
  const [errors, setErrors] = useState<Partial<CreateProductDTO>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      const { name, description, price, quantity } = editingProduct;
      setForm({ name, description, price, quantity });
    } else {
      setForm(INITIAL);
    }
  }, [editingProduct]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CreateProductDTO, string>> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (form.price < 0) errs.price = "Price must be ≥ 0" as any;
    if (form.quantity < 0) errs.quantity = "Quantity must be ≥ 0" as any;
    setErrors(errs as any);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit(form);
      setForm(INITIAL);
    } finally {
      setLoading(false);
    }
  };

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} aria-label="product-form">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          name="name"
          value={form.name}
          onChange={handle}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          name="description"
          value={form.description}
          onChange={handle}
          rows={3}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description}</div>
        )}
      </div>

      <div className="row g-3 mb-3">
        <div className="col">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            name="price"
            value={form.price}
            onChange={handle}
          />
        </div>

        <div className="col">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
            name="quantity"
            value={form.quantity}
            onChange={handle}
          />
        </div>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving…" : editingProduct ? "Update" : "Create"}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
