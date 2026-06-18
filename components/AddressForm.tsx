import { useState } from "react";

export default function AddressForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(formData);

    // call API here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl text-black">
      <h2 className="text-2xl font-semibold">Shipping Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">First Name</label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="
              w-full
              border
              rounded-md
              px-3
              py-2
            "
          />
        </div>

        <div>
          <label className="block mb-1">Last Name</label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="
              w-full
              border
              rounded-md
              px-3
              py-2
            "
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Contact Number</label>

        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          className="
            w-full
            border
            rounded-md
            px-3
            py-2
          "
        />
      </div>

      <div>
        <label className="block mb-1">Address</label>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={4}
          required
          className="
            w-full
            border
            rounded-md
            px-3
            py-2
            resize-none
          "
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-1">City</label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="
              w-full
              border
              rounded-md
              px-3
              py-2
            "
          />
        </div>

        <div>
          <label className="block mb-1">State</label>

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="
              w-full
              border
              rounded-md
              px-3
              py-2
            "
          />
        </div>

        <div>
          <label className="block mb-1">Postal Code</label>

          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="
              w-full
              border
              rounded-md
              px-3
              py-2
            "
          />
        </div>
      </div>

      <button
        type="submit"
        className="
          px-6
          py-3
          rounded-md
          bg-black
          text-white
          hover:opacity-90
        "
      >
        Continue to Payment
      </button>
    </form>
  );
}
