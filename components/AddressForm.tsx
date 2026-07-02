"use client";

import { X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Address } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  header: boolean;
  savedAddress?: Address[];
  onAddressAdded: (newAddress: Address) => void;
  onDifferentAddress?: (diffAddress: any) => void;
}

export default function AddressModal({
  open,
  onClose,
  header,
  savedAddress,
  onAddressAdded,
  onDifferentAddress,
}: AddressModalProps) {
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    city: "",
    state: "",
    postalCode: "",
    isDefault: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    const updatedForm = {
      ...form,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    };

    setForm(updatedForm);

    onDifferentAddress?.(updatedForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result.message);
      return;
    }

    onAddressAdded(result); // Call the callback function with the new address

    alert("Address added successfully!");

    onClose();
  };

  if (!open) return null;

  const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;

    setSelectedAddressId(id);

    const address = savedAddress?.find((address) => address.id === id);

    if (!address) return;

    setForm({
      firstName: address.firstName,
      lastName: address.lastName,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 ?? "",
      phone: address.phone,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    });
  };

  return (
    <div className="">
      {/* Header */}

      {header && (
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Add address</h1>

          <button onClick={onClose}>
            <X />
          </button>
        </div>
      )}

      {/* Form */}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {/* Saved address */}
        <select value={selectedAddressId} onChange={handleAddressSelect}>
          <option value="">Select an address</option>

          {savedAddress?.map((address) => (
            <option key={address.id} value={address.id}>
              {`${address.firstName} ${address.lastName},
      ${address.addressLine1},
      ${address.city}`}
            </option>
          ))}
        </select>

        {/* First Last */}

        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Address */}

        <div className="relative">
          <input
            name="addressLine1"
            placeholder="Address"
            value={form.addressLine1}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-500"
          />

          <Search
            className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            size={18}
          />
        </div>

        {/* Apartment */}

        <input
          name="addressLine2"
          placeholder="Apartment, suite, etc. (optional)"
          value={form.addressLine2}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        {/* Phone */}

        <input
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        {/* City State Pin */}

        <div className="grid grid-cols-3 gap-4">
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">State</option>

            <option value="Tamil Nadu">Tamil Nadu</option>

            <option value="Karnataka">Karnataka</option>

            <option value="Kerala">Kerala</option>
          </select>

          <input
            name="postalCode"
            placeholder="PIN code"
            value={form.postalCode}
            onChange={handleChange}
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Default */}

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isDefault"
            checked={form.isDefault}
            onChange={handleChange}
            className="h-4 w-4"
          />

          <span>This is my default address</span>
        </label>

        {/* Footer */}

        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="
                rounded-md
                border
                border-gray-300
                py-3
                font-medium
                hover:bg-gray-50
              "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
                rounded-md
                bg-blue-600
                py-3
                font-medium
                text-white
                hover:bg-blue-700
              "
          >
            Save address
          </button>
        </div>
      </form>
    </div>
  );
}
