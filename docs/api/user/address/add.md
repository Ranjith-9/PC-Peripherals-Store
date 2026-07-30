# POST /api/address

## Purpose

Creates a new address for the authenticated user.

## Authentication

Authentication is required.

**Uses:**

- `getServerSession()`

**Returns on failure:**

- `401 Unauthorized`

## Rate Limiting

Currently none.

## Request Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "addressLine1": "123 Anna Salai",
  "addressLine2": "Apartment 4B",
  "phone": "9876543210",
  "city": "Chennai",
  "state": "Tamil Nadu",
  "postalCode": "600001",
  "isDefault": true
}
```

## Request Fields

| Field          | Type    | Required | Description                                                                 |
| -------------- | ------- | -------- | --------------------------------------------------------------------------- |
| `firstName`    | String  | Yes      | Recipient's first name.                                                     |
| `lastName`     | String  | Yes      | Recipient's last name.                                                      |
| `addressLine1` | String  | Yes      | Primary street address.                                                     |
| `addressLine2` | String  | No       | Apartment, suite, unit, or other address details.                           |
| `phone`        | String  | Yes      | Recipient's contact phone number.                                           |
| `city`         | String  | Yes      | City of the delivery address.                                               |
| `state`        | String  | Yes      | State or province of the delivery address.                                  |
| `postalCode`   | String  | Yes      | Postal or ZIP code.                                                         |
| `isDefault`    | Boolean | Yes      | Indicates whether this address should be set as the user's default address. |

## Database Operations

### Write

- Inserts a new address record into the `Address` table.

### Success Response

- `200 OK`

## Related Files

`app/components/AddressForm.tsx`
