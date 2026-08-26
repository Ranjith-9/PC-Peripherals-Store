"use client";
import { useState, useEffect } from "react";
import slugify from "slugify";
import { createId } from "@paralleldrive/cuid2";
import { Product } from "@prisma/client";
import { Check, X } from "lucide-react";
import type { DetailedProduct } from "@/types/product";

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
  const [newFilter, setNewFilter] = useState({
    key: "",
    value: "",
  });
  const [existingFilters, setExistingFilters] = useState([
    { key: "", value: "", id: "" },
  ]);

  const [detailedProduct, setDetailedProduct] =
    useState<DetailedProduct | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
  });

  // first half of the product being set by form, which is passed down by productPanel
  useEffect(() => {
    if (!isEdit || !productDetails) return;
    getFullProductDetails(productDetails.id);
  }, [isEdit, productDetails]);

  //function to fetch detailed product + fitler from database
  async function getFullProductDetails(productId: string) {
    const response = await fetch(`/api/detailedproduct/${productId}`);
    const product = await response.json();

    if (!product) {
      return;
    }
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
      stock: product.stock.toString(),
    });

    setAttributes(
      Object.entries(product.attributes ?? {}).map(([key, value]) => ({
        key,
        value: String(value),
      })),
    );

    setDetailedProduct(product);
    setExistingFilters(
      Object.entries(product.filters ?? {}).map(
        ([key, [value, filterId]]: any) => ({
          key,
          value: String(value),
          id: filterId,
        }),
      ),
    );
  }

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

    const response = await fetch("/api/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedForm),
    });

    if (response.status === 403) {
      alert("Admin Access Required");
      return;
    }

    if (!response.ok) {
      alert("Something went wrong");
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

    if (response.status === 403) {
      alert("Admin Access Required");
      return;
    }
    if (!response.ok) {
      alert("something went wrong");
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

  const addFilter = async (key: string, value: string) => {
    if (!detailedProduct) {
      return;
    }
    if (!productDetails) {
      return;
    }
    const response = await fetch("/api/filter/addFilter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        value,
        subCatId: detailedProduct.subcategoryId,
        productId: detailedProduct.id,
      }),
    });

    const data = await response.json();
    if (response.status === 403) {
      alert("Admin Access Required");
      return;
    }
    if (!response.ok) {
      alert("Something went wrong");
      return;
    }

    getFullProductDetails(productDetails.id);
  };

  const deleteFilter = async (filterId: string, productId: string) => {
    const response = await fetch(`/api/filter/${filterId}/${productId}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (response.status === 403) {
      alert("Admin Access Required");
      return;
    }
    if (!response.ok) {
      alert("Something went wrong");
      return;
    }
    if (!productDetails) {
      return;
    }
    getFullProductDetails(productDetails.id);
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
      {/* {FILTER ELEMENTS} */}
      {isEdit && (
        <div className="mt-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold"> Filters</h2>
          </div>
          {existingFilters &&
            existingFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500">
                  {filter.key}
                </div>
                <div className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500">
                  {filter.value}
                </div>

                {!filter.key ? (
                  <button>
                    {" "}
                    <Check />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!detailedProduct) return;
                      deleteFilter(filter.id, detailedProduct.id);
                    }}
                  >
                    {" "}
                    <X />
                  </button>
                )}
              </div>
            ))}
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <input
              placeholder="Filter Name"
              value={newFilter.key}
              onChange={(e) =>
                setNewFilter((prev) => ({
                  ...prev,
                  key: e.target.value,
                }))
              }
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              placeholder="Filter Value"
              value={newFilter.value}
              onChange={(e) =>
                setNewFilter((prev) => ({
                  ...prev,
                  value: e.target.value,
                }))
              }
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={() => addFilter(newFilter.key, newFilter.value)}
              className="rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200"
            >
              <Check />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

//
