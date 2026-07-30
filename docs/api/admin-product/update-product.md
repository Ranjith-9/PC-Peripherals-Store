# Update /api/product/update

## Purpose

update an existing product in the database

## Authentication

Admin access required

Uses:
-getServerSession

Returns:

401 Unauthorized

## Rate Limiting

20 request/min/admin

Returns:
429 Too many requests

## Request Body

```json
{
  "data": {
    "name": "Final Mouse",
    "description": "A lightweight wireless gaming mouse.",
    "price": 122,
    "imageUrl": "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
    "category": "Mouse",
    "stock": 23,
    "attributes": {
      "rgb": "No"
    }
  },
  "id": "cms5lmf310000n2b0czxu6d60"
}
```

## Request Fields

| Field  | Type     | Required | Description                 |
| ------ | -------- | -------- | --------------------------- |
| `data` | `object` | ✅       | Updated product information |
| `id`   | `string` | ✅       | Unique product identifier   |

| Field         | Type     | Required | Description                 |
| ------------- | -------- | -------- | --------------------------- |
| `name`        | `string` | ✅       | Product name                |
| `description` | `string` | ✅       | Product description         |
| `price`       | `number` | ✅       | Product price               |
| `imageUrl`    | `string` | ✅       | Public product image URL    |
| `category`    | `string` | ✅       | Product category            |
| `stock`       | `number` | ✅       | Available inventory         |
| `attributes`  | `object` | ✅       | Product-specific attributes |

## Database Operations

## Update

- Updates a existing product in the database

## Success Response

### 200 OK

## Related Files

```
app/component/AddProductForm
```
