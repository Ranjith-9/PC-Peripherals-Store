# POST `api/payment/`create-order

## Purpose

To verify product prices and subtotal with source of truth from the server and generate order

## Authentication

Requires user authentication

Return:

401 Unauthorized

## Rate Limiting

100 request/user/minute

Returns:

429 Too many requests

## Request Body

```json
{
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
  "totalAmount": 2939.94,
  "cartItems": [
    {
      "productId": "product_id_1",
      "quantity": 2,
      "price": 499.99,
      "subtotal": 999.98,
      "imageUrl": "https://example.com/images/product-1.jpg"
    },
    {
      "productId": "product_id_2",
      "quantity": 1,
      "price": 1939.96,
      "subtotal": 1939.96,
      "imageUrl": "https://example.com/images/product-2.jpg"
    }
  ]
}
```

## Database operations

## Read

- Returns rows match the productIds array from the database

## Success Response

### 200 OK

## Related Files

```
app/components/CheckOut.tsx
```
