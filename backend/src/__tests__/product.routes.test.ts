import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";

jest.setTimeout(30000);

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

const validProduct = {
  name: "Test Product",
  description: "A test product",
  price: 29.99,
  quantity: 10,
};

describe("POST /api/products", () => {
  it("creates a product with valid data", async () => {
    const res = await request(app).post("/api/products").send(validProduct);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Test Product");
  });

  it("returns 400 when name is missing", async () => {
    const { name, ...withoutName } = validProduct;
    const res = await request(app).post("/api/products").send(withoutName);
    expect(res.status).toBe(400);
  });
});

describe("GET /api/products", () => {
  it("returns empty array initially", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("returns created products", async () => {
    await request(app).post("/api/products").send(validProduct);
    const res = await request(app).get("/api/products");
    expect(res.body.data).toHaveLength(1);
  });
});

describe("PUT /api/products/:id", () => {
  it("updates an existing product", async () => {
    const created = await request(app).post("/api/products").send(validProduct);
    const id = created.body.data._id;
    const res = await request(app)
      .put(`/api/products/${id}`)
      .send({ price: 49.99 });
    expect(res.status).toBe(200);
    expect(res.body.data.price).toBe(49.99);
  });
});

describe("DELETE /api/products/:id", () => {
  it("deletes an existing product", async () => {
    const created = await request(app).post("/api/products").send(validProduct);
    const id = created.body.data._id;
    const res = await request(app).delete(`/api/products/${id}`);
    expect(res.status).toBe(200);
    const check = await request(app).get(`/api/products/${id}`);
    expect(check.status).toBe(404);
  });
});
