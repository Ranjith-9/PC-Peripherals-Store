export interface order {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
}

export interface razerPayOrder {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number; // Unix timestamp
  currency: string;
  entity: string;
  id: string;
  notes: Record<string, string>;
  offer_id: string | null;
  receipt: string;
  status: string;
}

export type Address = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
};

export interface CreateOrderRequest {
  status: string;
  paymentMethod: string;
  shippingMethod: string;
  shippingAddress: Address | null;
  billingAddress: Address | null | any;
  totalAmount: number;
  cartItems: CartItem[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}
