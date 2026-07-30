# DELETE /api/address/[addressId]

## Purpose

Deletes an exisiting address for the authenticated user

## Authentication

Authentication is required

**Uses:**

- `getServerSession()`

**Returns on failure:**

- `401 Unauthorized`

## Query parameter

```http
DELETE /api/address/123456
```

## Parsed value

```ts
addressId = "123456";
```

## Database Operations

## Delete

- Deletes an existing row in the address table

### Success response

200 OK

## Related Files

`/api/components/CheckOut.tsx`
