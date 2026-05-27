import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm from "../components/ProductForm";

const mockSubmit = jest.fn().mockResolvedValue(undefined);
const mockCancel = jest.fn();

const setup = (editingProduct = null) =>
  render(
    <ProductForm
      onSubmit={mockSubmit}
      editingProduct={editingProduct}
      onCancel={mockCancel}
    />,
  );

beforeEach(() => jest.clearAllMocks());

describe("ProductForm", () => {
  it("renders all fields", () => {
    setup();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /create/i }));
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    });
  });

  it("calls onSubmit with correct data", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByLabelText(/name/i), "Laptop");
    await user.type(screen.getByLabelText(/description/i), "A laptop");
    await user.clear(screen.getByLabelText(/price/i));
    await user.type(screen.getByLabelText(/price/i), "999");
    await user.click(screen.getByRole("button", { name: /create/i }));
    await waitFor(() =>
      expect(mockSubmit).toHaveBeenCalledWith({
        name: "Laptop",
        description: "A laptop",
        price: 999,
        quantity: 0,
      }),
    );
  });

  it("pre-fills fields when editing", () => {
    const product = {
      _id: "1",
      name: "Chair",
      description: "A chair",
      price: 49,
      quantity: 5,
      createdAt: "",
      updatedAt: "",
    };
    setup(product as any);
    expect(screen.getByDisplayValue("Chair")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  });
});
