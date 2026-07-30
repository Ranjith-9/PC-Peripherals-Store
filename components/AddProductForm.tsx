"use client";
import { useState, useEffect } from "react";
import slugify from "slugify";
import { createId } from "@paralleldrive/cuid2";
import { Product } from "@prisma/client";

interface ProductFormProps {
  isEdit?: boolean;
  productDetails?: Product;
  onClose?: () => void;
  onUpdate?: any;
}

export default function AddProductForm({
  isEdit = true,
  productDetails,
  onClose,
  onUpdate,
}: ProductFormProps) {
  type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const [attributes, setAttributes] = useState([{ key: "", value: "" }]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (!isEdit || !productDetails) return;

    setForm({
      name: productDetails.name,
      description: productDetails.description,
      price: productDetails.price.toString(),
      imageUrl: productDetails.imageUrl,
      category: productDetails.category,
      stock: productDetails.stock.toString(),
    });

    setAttributes(
      Object.entries(productDetails.attributes ?? {}).map(([key, value]) => ({
        key,
        value: String(value),
      })),
    );
  }, [isEdit, productDetails]);

  // function
  const handleChange = (e: React.ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);
  };

  // function to add product
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const id = createId();

    const attributesJson = Object.fromEntries(
      attributes
        .filter((attr) => attr.key.trim() !== "")
        .map((attr) => [attr.key, attr.value]),
    );

    const updatedForm = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      attributes: attributesJson,
      slug: `${slugify(form.name, {
        lower: true,
        strict: true,
      })}-${id}`,
    };

    console.log("type of ", JSON.stringify(updatedForm, null, 2));
    const response = await fetch("/api/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedForm),
    });

    const result = response.json();

    if (!response.ok) {
      console.error(result);
      return;
    }

    alert("Product Added successfully");
  };

  // function to update product
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const attributesJson = Object.fromEntries(
      attributes
        .filter((attr) => attr.key.trim() !== "")
        .map((attr) => [attr.key, attr.value]),
    );

    const updatedForm = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      attributes: attributesJson,
    };

    const response = await fetch("/api/product/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: updatedForm, id: productDetails?.id }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result);
      return;
    }
    onUpdate(result);
    if (onClose) onClose();
    alert("Product updated successfully");
  };

  // function to delete attribute
  const deleteAttribute = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-4xl border border-gray-200 bg-white p-8 shadow-sm text-black">
      <div className="flex justify-between">
        {isEdit ? (
          <h1 className=" text-3xl font-bold">Edit Product </h1>
        ) : (
          <h1 className=" text-3xl font-bold">Add Product </h1>
        )}
        <button onClick={onClose}>X</button>
      </div>

      <p className="mb-8 text-sm text-gray-500">
        Fill in the details below to create a new product.
      </p>

      <form
        onSubmit={isEdit ? handleUpdate : handleSubmit}
        className="space-y-8"
      >
        {/* Product Information */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Product Information</h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Product Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Logitech G Pro X Superlight"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            <div className="col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the product..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="4999"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="50"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Mouse"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Image URL
              </label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Attributes */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Attributes</h2>

            <button
              type="button"
              onClick={() =>
                setAttributes([...attributes, { key: "", value: "" }])
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              + Add Attribute
            </button>
          </div>

          <div className="space-y-4">
            {attributes.map((attr, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <input
                  placeholder="Attribute"
                  value={attr.key}
                  onChange={(e) => {
                    const copy = [...attributes];
                    copy[index].key = e.target.value;
                    setAttributes(copy);
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                />

                <input
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) => {
                    const copy = [...attributes];
                    copy[index].value = e.target.value;
                    setAttributes(copy);
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => deleteAttribute(index)}
                  className="rounded-lg bg-red-100 px-4 py-2 text-red-600 transition hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end border-t pt-6">
          {isEdit ? (
            <button
              type="submit"
              className="rounded-xl bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Edit Product
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-xl bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Add Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
