"use client";
import { useState } from "react";
import { useStore } from "@/providers/StoreProvider";
import AddressForm from "./AddressForm";
import type { Session } from "@/types/user";
import { Address } from "@prisma/client";
interface CheckOutProps {
  session: Session | null;
  addresses: Address[];
}

export default function CheckOut({ session, addresses }: CheckOutProps) {
  const [address, setAddress] = useState<Address[]>([]);

  console.log("addresses", addresses);

  return (
    <div className="h-screen bg-black flex ">
      <div className="w-[50%] flex justify-center items-center bg-zinc-300 text-black">
        {addresses.map((address: Address, index: number) => (
          <div>
            <h2 className="font-bold">
              {address.firstName} {address.lastName}
            </h2>

            <p>{address.addressLine1}</p>

            {address.addressLine2 && <p>{address.addressLine2}</p>}

            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>
          </div>
        ))}
      </div>
      <div className="w-[50%] flex justify-center items-center bg-zinc-700">
        hello2
      </div>
    </div>
  );
}
