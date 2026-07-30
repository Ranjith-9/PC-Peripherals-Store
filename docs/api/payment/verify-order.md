# POST api/payment/verify

## Purpose

To verify razorpay object's signature
To verify the product prices and subtotal
To create order record in the database

## Authentication

Requires user authentication

Return:

401 Unauthorized

## Rate Limiting

5 request/ minute/ user

Returns:

429 Too many requests

## Request Body

```json
{
  "razorpay_payment_id": "pay_xxxxxxxxxxxxxx",
  "razorpay_order_id": "order_xxxxxxxxxxxxxx",
  "razorpay_signature": "generated_hmac_signature",
  "data": {
    "status": "pending",
    "paymentMethod": "PAYPAL",
    "shippingMethod": "STANDARD",
    "shippingAddress": {
      "id": "address_id",
      "userId": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "9876543210",
      "addressLine1": "123 Main Street",
      "addressLine2": "Apartment 4B",
      "city": "Chennai",
      "state": "Tamil Nadu",
      "postalCode": "600042",
      "isDefault": true
    },
    "billingAddress": {
      "id": "address_id",
      "userId": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "9876543210",
      "addressLine1": "123 Main Street",
      "addressLine2": "Apartment 4B",
      "city": "Chennai",
      "state": "Tamil Nadu",
      "postalCode": "600042",
      "isDefault": true
    },
    "totalAmount": 859.99,
    "cartItems": [
      {
        "productId": "product_id_1",
        "quantity": 1,
        "price": 799.99,
        "subtotal": 799.99,
        "imageUrl": "https://example.com/images/product-1.jpg"
      },
      {
        "productId": "product_id_2",
        "quantity": 1,
        "price": 60.0,
        "subtotal": 60.0,
        "imageUrl": "https://example.com/images/product-2.jpg"
      }
    ]
  }
}
```

## Database operations

## Write & Update

The API creates the order and updates product inventory within a single database transaction. If any operation fails, the entire transaction is rolled back, ensuring that no partial order or incorrect stock updates are committed to the database.

## Success Response

200 OK

## Related Files

```
app/components/CheckOut.tsx
```
