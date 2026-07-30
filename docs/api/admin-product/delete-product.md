# DELETE /api/product/delete

## Purpose

Delete a product from the database

## Authentication

Admin access required

Uses:
-getServerSession

Returns:

401 Unauthorized

## Rate Limiting

20 request/min/admin

## Request Body

```json
{
  "id": "string"
}
```

## Database Operations

## Delete

- Delete an existing product

## Success Response

### 200 OK

## Related Files

```
/providers/StoreProvider.tsx
```
