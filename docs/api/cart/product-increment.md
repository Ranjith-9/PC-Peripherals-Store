# PATCH /api/cart/increment

## Purpose

Increments the quantity of a product in the cart while ensuring sufficient stock is available.

## Authentication

None required.

## Rate Limiting

**Limit:** 100 requests per user per minute.

**Response on limit exceeded:**

- `429 Too Many Requests`

## Request Body

```json
{
  "productId": "product-id",
  "currentQuantity": 10
}
```

## Database Operations

### Read

- Retrieves the product whose ID matches the provided `productId`.

## Related Files

- `app/components/CartView.tsx`
