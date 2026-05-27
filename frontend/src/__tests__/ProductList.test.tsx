import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { Product } from "../types/product.types";

const products: Product[] = [
  {
    _id: "1",
    name: "Laptop",
    description: "Fast laptop",
    price: 999.99,
    quantity: 5,
    createdAt: "",
    updatedAt: "",
  },
  {
    _id: "2",
    name: "Mouse",
    description: "Wireless mouse",
    price: 29.99,
    quantity: 20,
    createdAt: "",
    updatedAt: "",
  },
];

describe("ProductList", () => {
  it("renders product rows", () => {
    render(
      <ProductList
        products={products}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        loading={false}
      />,
    );
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Mouse")).toBeInTheDocument();
  });

  it("shows spinner when loading", () => {
    render(
      <ProductList
        products={[]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        loading={true}
      />,
    );
    expect(document.querySelector(".spinner-border")).toBeInTheDocument();
  });

  it("shows empty state when no products", () => {
    render(
      <ProductList
        products={[]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        loading={false}
      />,
    );
    expect(screen.getByText(/no products yet/i)).toBeInTheDocument();
  });

  it("calls onDelete with correct id", () => {
    const onDelete = jest.fn();
    render(
      <ProductList
        products={products}
        onEdit={jest.fn()}
        onDelete={onDelete}
        loading={false}
      />,
    );
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
