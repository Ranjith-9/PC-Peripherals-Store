# GET /api/products

## Purpose

Responsible for viewing the products in HomeView and Admin Dashboard components

## Authentication

General user requires no authentication

Admin requires authentication

Returns:

401 Unauthorized

## Rate Limiting

100 request/min/user

Returns:
429 Too many requests

## Query Parameters

| Parameter  | Type       | Required | Default     | Description                                  |
| ---------- | ---------- | -------- | ----------- | -------------------------------------------- |
| `cursor`   | `string`   | ❌       | `undefined` | Cursor used for pagination.                  |
| `category` | `string[]` | ❌       | `[]`        | One or more product categories to filter by. |
| `sort`     | `string`   | ❌       | `"latest"`  | Sort order for returned products.            |
| `search`   | `string`   | ❌       | `undefined` | Search keyword for product name.             |

### Example Request

```http
GET /api/products?category=Keyboard&category=Mouse&sort=latest&search=wireless&cursor=abc123
```

### Parsed Values

```ts
cursor = "abc123";

category = ["Keyboard", "Mouse"];

sort = "latest";

search = "wireless";
```

## Database Operations

## Read

- Returns rows matching the given parameters

## Success Response

### 200 OK

## Related Files

```
app/component/ProductGrid
```
