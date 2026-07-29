# POST /api/product/add

## Purpose

Add a product to the database

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
  "name": "Final Mouse",
  "description": "A lightweight wireless gaming mouse.",
  "price": 3999,
  "imageUrl": "https://example.com/images/mouse.jpg",
  "category": "Mouse",
  "stock": 23,
  "attributes": {
    "rgb": "No"
  },
  "slug": "final-mouse-abc123"
}
```

## Request Fields

| Field         | Type     | Required | Description                    |
| ------------- | -------- | -------- | ------------------------------ |
| `name`        | `string` | ✅       | Product name                   |
| `description` | `string` | ✅       | Product description            |
| `price`       | `number` | ✅       | Product price                  |
| `imageUrl`    | `string` | ✅       | Public image URL               |
| `category`    | `string` | ✅       | Product category               |
| `stock`       | `number` | ✅       | Available inventory            |
| `attributes`  | `object` | ✅       | Product-specific attributes    |
| `slug`        | `string` | ✅       | SEO-friendly unique identifier |

## Database Operations

## Write

- Insert a new product

## Success Response

### 200 OK

## Related Files

```
app/component/AddProductForm
```
