"use client";
import { use, useEffect, useState } from "react";
import type { Session } from "@/types/user";
import { Address } from "@prisma/client";
import { ChevronDown, Plus, EllipsisVertical, Handbag } from "lucide-react";
import AddressModal from "./AddressForm";
import { signOut } from "next-auth/react";
import { useStore } from "@/providers/StoreProvider";
import Link from "next/link";

interface CheckOutProps {
  session: Session | null;
  addresses: Address[];
}

export default function CheckOut({ session, addresses }: CheckOutProps) {
  const [address, setAddress] = useState<Address[]>(addresses);
  const [openSection, setOpenSection] = useState({
    addSection: false,
    paymentSection: false,
    addressSection: false,
  });
  const shippingModes = ["STANDARD", "EXPRESS"];
  const paymentMethods = ["PAYPAL", "CARD", "CASH_ON_DELIVERY"];
  const [selectAddress, setSelectAddress] = useState<Address | null>(
    address.find((addr) => addr.isDefault) ?? address[0] ?? null,
  );
  const [differentAddress, setDifferentAddress] = useState();
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(shippingModes[0]);
  const [selectPaymentMode, setSelectPaymentMode] = useState("PAYPAL");
  const [selectShippingAddress, setSelectShippingAddress] = useState("same");
  const options = [
    { value: "same", label: "Same as shipping address" },
    { value: "different", label: "Use a different shipping address" },
  ];

  const { mergedProducts } = useStore();
  const { setCartItems } = useStore();

  const handleDelete = async (addressId: string) => {
    const response = await fetch(`/api/address/${addressId}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result.message);
      return;
    }

    const remainingAddresses = address.filter(
      (currentAddress) => currentAddress.id !== addressId,
    );

    setAddress(remainingAddresses);

    setSelectAddress((prev) => {
      const deletedSelectedAddress = prev?.id === addressId;

      if (!deletedSelectedAddress) {
        return prev;
      }

      return (
        remainingAddresses.find((currentAddress) => currentAddress.isDefault) ??
        remainingAddresses[0] ??
        null
      );
    });
  };

  useEffect(() => {
    setSelectAddress(
      address.find((addr) => addr.isDefault) ?? address[0] ?? null,
    );
  }, [address]);

  const handlePlaceOrder = async () => {
    let shippingAddressSelected;

    if (selectShippingAddress === "same") {
      shippingAddressSelected = selectAddress;
    } else {
      shippingAddressSelected = differentAddress;
    }

    const data = {
      status: "pending",
      paymentMethod: selectPaymentMode,
      shippingMethod: selectedShipping,
      shippingAddress: selectAddress,
      billingAddress: shippingAddressSelected,
      totalAmount: mergedProducts.reduce(
        (acc: number, product: any) => acc + product.price * product.quantity,
        0,
      ),
      cartItems: mergedProducts.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
        subtotal: product.price * product.quantity,
      })),
    };

    console.log("data before being called for API", data);

    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error);
      return;
    }

    alert("Order Placed Successfully");
    setCartItems([]);
  };

  return (
    <>
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 flex">
        <div className="w-1/2 bg-white" />
        <div className="w-1/2 bg-[#f5f5f5]" />
      </div>
      <div className="w-full h-20 bg-black">
        <div className=" mx-auto flex h-full max-w-[1200px] items-center justify-between px-8">
          <div>
            <Link href="/shop">XYZ Gaming Store</Link>
          </div>
          <div>
            <Handbag />
          </div>
        </div>
      </div>
      <div className="flex text-black">
        <div className="w-1/2 ">
          <div className="mx-auto max-w-[560px] py-10">
            <div className="flex justify-between items-center pr-2 pb-5">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center font-semibold">
                  {session?.user.name[0].toUpperCase()}
                </div>
                <div className="text-black px-2">{session?.user.email}</div>
              </div>

              <button onClick={() => signOut()}>
                <EllipsisVertical />
              </button>
            </div>
            <div className="border rounded-md  overflow-hidden">
              <div
                className={`${!openSection.addSection ? "flex justify-between relative p-5" : "relative p-5"} `}
              >
                <div>ship to</div>
                <div className="absolute right-10 top-5">
                  {address.length === 0 && (
                    <div>
                      <button
                        onClick={() =>
                          setOpenSection((prev) => ({
                            ...prev,
                            addressSection: true,
                          }))
                        }
                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer hover:shadow-md transition-shadow duration-200"
                      >
                        Add an address
                      </button>
                      {openSection.addressSection && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                          <div className="w-[650px] rounded-xl bg-white p-6 shadow-xl">
                            <AddressModal
                              open={openSection.addressSection}
                              onClose={() =>
                                setOpenSection((prev) => ({
                                  ...prev,
                                  addressSection: false,
                                }))
                              }
                              header={true}
                              savedAddress={address}
                              onAddressAdded={(newAddress) => {
                                setAddress((currentAddresses) => {
                                  if (newAddress.isDefault) {
                                    currentAddresses.map(
                                      (address) => (address.isDefault = false),
                                    );
                                  }

                                  return [...currentAddresses, newAddress];
                                });
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {address.length !== 0 && (
                  <div className="flex justify-between">
                    <div className="w-full">
                      {!openSection.addSection && (
                        <div className="">
                          <div className="ml-3">
                            <h2 className="font-bold">
                              {selectAddress?.firstName}{" "}
                              {selectAddress?.lastName}
                            </h2>

                            <p>{selectAddress?.addressLine1}</p>

                            {selectAddress?.addressLine2 && (
                              <p>{selectAddress?.addressLine2}</p>
                            )}

                            <p>
                              {selectAddress?.city}, {selectAddress?.state}{" "}
                              {selectAddress?.postalCode}
                            </p>
                          </div>
                        </div>
                      )}
                      {openSection.addSection &&
                        address.map((address: Address) => (
                          <label
                            key={address.id}
                            className="relative flex gap-3 p-3"
                          >
                            <input
                              type="radio"
                              name="address"
                              className="mt-1 absolute left-0 top-3"
                              value={address.id}
                              checked={selectAddress?.id === address.id}
                              onChange={() => setSelectAddress(address)}
                            />
                            <div className="ml-3 flex justify-between">
                              <div>
                                <h2 className="font-bold">
                                  {address.firstName} {address.lastName}
                                </h2>

                                <p>{address.addressLine1}</p>

                                {address.addressLine2 && (
                                  <p>{address.addressLine2}</p>
                                )}

                                <p>
                                  {address.city}, {address.state}{" "}
                                  {address.postalCode}
                                </p>
                                {address.isDefault ? (
                                  <div className="rounded-full bg-yellow-500 w-fit px-[5px] text-white text-sm">
                                    Default
                                  </div>
                                ) : (
                                  <div>
                                    {selectAddress?.id === address.id && (
                                      <button
                                        className="text-blue-900"
                                        onClick={() =>
                                          setAddress((prev) =>
                                            prev.map((addr) =>
                                              addr.id === address.id
                                                ? { ...addr, isDefault: true }
                                                : { ...addr, isDefault: false },
                                            ),
                                          )
                                        }
                                      >
                                        set as default
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="absolute right-1 top-2">
                                <button
                                  onClick={() => handleDelete(address.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </label>
                        ))}
                    </div>
                    <button
                      className="absolute top-3 right-3"
                      onClick={() =>
                        setOpenSection((prev: any) => ({
                          ...prev,
                          addSection: !prev.addSection,
                        }))
                      }
                    >
                      <ChevronDown
                        className={`transition-transform duration-200 ${openSection.addSection ? "rotate-180" : ""}`}
                      />{" "}
                    </button>
                  </div>
                )}
                {address.length !== 0 && openSection.addSection && (
                  <div>
                    <button
                      className="flex items-center gap-2 mt-3"
                      onClick={() =>
                        setOpenSection((prev) => ({
                          ...prev,
                          addressSection: true,
                        }))
                      }
                    >
                      <Plus className="w-4 h-4" />
                      Use a different address
                    </button>
                    {address.length > 0 && openSection.addressSection && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="w-[650px] rounded-xl bg-white p-6 shadow-xl">
                          <AddressModal
                            open={openSection.addressSection}
                            onClose={() =>
                              setOpenSection((prev) => ({
                                ...prev,
                                addressSection: false,
                              }))
                            }
                            header={true}
                            savedAddress={address}
                            onAddressAdded={(newAddress) => {
                              setAddress((currentAddresses) => {
                                if (newAddress.isDefault) {
                                  console.log(
                                    "newAddress.isDefault",
                                    newAddress.isDefault,
                                  );
                                  currentAddresses.map(
                                    (address) => (address.isDefault = false),
                                  );
                                }

                                return [...currentAddresses, newAddress];
                              });
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="border-t p-5">
                <div className="flex justify-between items-start">
                  <div className="pt-1">Shipping Modes</div>

                  <div className="flex flex-col items-start gap-3">
                    <button
                      className="flex items-center gap-2"
                      onClick={() => setIsShippingOpen((prev) => !prev)}
                    >
                      <span className="cursor-pointer">{selectedShipping}</span>

                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 cursor-pointer ${
                          isShippingOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isShippingOpen &&
                      shippingModes
                        .filter((mode) => mode !== selectedShipping)
                        .map((mode) => (
                          <button
                            key={mode}
                            className="text-left cursor-pointer"
                            onClick={() => {
                              setSelectedShipping(mode);
                              setIsShippingOpen(false);
                            }}
                          >
                            {mode}
                          </button>
                        ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="pt-20 font-bold">Payment</h1>
              <p className="pb-5">All transactions are secure and encrypted</p>
              <div className="border rounded-md overflow-hidden divide-y">
                {paymentMethods.map((paymentMethod) => (
                  <label
                    key={paymentMethod}
                    className={`relative flex items-center w-full px-4 py-3 ${selectPaymentMode === paymentMethod ? "bg-[#F5F6FF]" : ""}`}
                  >
                    {selectPaymentMode === paymentMethod && (
                      <div className="absolute inset-0 border border-[#005bd1] pointer-events-none" />
                    )}

                    <input
                      type="radio"
                      checked={selectPaymentMode === paymentMethod}
                      onChange={() => setSelectPaymentMode(paymentMethod)}
                    />

                    <span className="px-2">{paymentMethod}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="">
              <h1 className="pt-10 font-bold">Billing Address</h1>
              <div className="flex flex-col border rounded-md divide-y">
                {options.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center w-full px-4 py-3 cursor-pointer ${selectShippingAddress === option.value ? "bg-[#F5F6FF]" : ""}`}
                  >
                    {selectShippingAddress === option.value && (
                      <div className="absolute inset-0 border border-[#005bd1] pointer-events-none" />
                    )}
                    <input
                      type="radio"
                      name="billingAddress"
                      checked={selectShippingAddress === option.value}
                      onChange={() => setSelectShippingAddress(option.value)}
                    />
                    <span className="py-2 px-1">{option.label}</span>
                  </label>
                ))}
                {selectShippingAddress === "different" && (
                  <div className="p-4 bg-white">
                    <AddressModal
                      open={true}
                      onClose={() => {}}
                      header={false}
                      onAddressAdded={(newAddress) => {
                        setAddress((currentAddresses) => {
                          if (newAddress.isDefault) {
                            console.log(
                              "newAddress.isDefault",
                              newAddress.isDefault,
                            );
                            currentAddresses.map(
                              (address) => (address.isDefault = false),
                            );
                          }

                          return [...currentAddresses, newAddress];
                        });
                      }}
                      onDifferentAddress={(diffAddress) => {
                        setDifferentAddress(diffAddress);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-10 items-center flex justify-center">
              <button
                className="bg-black w-50 h-10 rounded-full text-white font-bold"
                onClick={handlePlaceOrder}
              >
                Place order
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex px-10 mt-4 ">
          <div className="max-w-[520px] ml-12 py-10">
            {mergedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-start justify-between py-4"
              >
                {/* Left */}
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-20 w-20 rounded-lg border object-cover"
                    />

                    <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-xs font-semibold text-white">
                      {product.quantity}
                    </div>
                  </div>

                  <div className="max-w-[220px]">
                    <p className="text-sm font-medium leading-5">
                      {product.name}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="w-28 text-right font-medium">
                  ₹{product.price.toLocaleString()}
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <div>Total</div>
              <div>
                {" "}
                ${" "}
                {mergedProducts
                  .reduce(
                    (acc: number, product: any) =>
                      acc + product.price * product.quantity,
                    0,
                  )
                  .toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
