# GET /api/order

## Purpose

To provide user's order history

## Authentication

User authentication required

Uses:
-getServerSession

Returns:

401 Unauthorized

## Rate Limiting

60 request/min/admin

Returns:
429 Too many requests

## Database Operations

## Read

- Retrieves all orders from the order table that belong to the currently logged-in user

## Success Response

### 200 OK

## Related Files

```
app/component/OrderUpdates.tsx
```
