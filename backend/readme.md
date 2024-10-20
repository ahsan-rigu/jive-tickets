# Ticketing Service API Documentation

This document provides details on how to interact with the Ticketing Service API.

## Authentication

### Register a new user

**Endpoint:** `/auth/register`

**Method:** `POST`

**Request body:**

```json
{
  "name": "John Doe",
  "email": "[email address removed]",
  "password": "password123"
}
Response:

201 Created: User successfully registered.
JSON
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "[email address removed]",
    // ... other user fields
  }
}

400 Bad Request: Invalid request data or email already exists.
Login
Endpoint: /auth/login

Method: POST

Request body:

JSON
{
  "email": "[email address removed]",
  "password": "password123"
}

Response:

200 OK: Login successful.
JSON
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "[email address removed]",
    // ... other user fields
  }
}

401 Unauthorized: Invalid credentials.
Events
Create a new event
Endpoint: /events

Method: POST

Headers:

Authorization: Bearer jwt_token
Request body:

JSON
{
  "name": "Concert in the Park",
  "description": "Summer concert series",
  "date": "2024-12-25T19:00:00.000Z",
  "location": {
    "addressLine1": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "country": "USA",
    "postalCode": "12345"
  },
  "ticketTiers": [
    {
      "name": "General Admission",
      "price": 25,
      "availableTickets": 100
    },
    {
      "name": "VIP",
      "price": 100,
      "availableTickets": 50
    }
  ]
}

Response:

201 Created: Event successfully created.
400 Bad Request: Invalid request data.
401 Unauthorized: Missing or invalid token.
Get all events
Endpoint: /events

Method: GET

Response:

200 OK: Returns an array of events.
Get an event by ID
Endpoint: /events/{id}

Method: GET

Response:

200 OK: Returns the event with the given ID.
404 Not Found: Event not found.
Update an event
Endpoint: /events/{id}

Method: PATCH

Headers:

Authorization: Bearer jwt_token
Request body: (Send only the fields you want to update)

JSON
{
  "name": "Updated Event Name"
}

Response:

200 OK: Event successfully updated.
400 Bad Request: Invalid request data.
401 Unauthorized: Missing or invalid token.
404 Not Found: Event not found.
Delete an event
Endpoint: /events/{id}

Method: DELETE

Headers:

Authorization: Bearer jwt_token
Response:

200 OK: Event successfully deleted.
401 Unauthorized: Missing or invalid token.
404 Not Found: Event not found.
Tickets
Purchase a ticket
Endpoint: /tickets

Method: POST

Headers:

Authorization: Bearer jwt_token
Request body:

JSON
{
  "eventId": "event_id",
  "tierId": "tier_id",
  "userId": "user_id"
}

Response:

201 Created: Ticket successfully purchased.
400 Bad Request: Invalid request data, or no tickets available.
401 Unauthorized: Missing or invalid token.
404 Not Found: Event or ticket tier not found.
Get tickets for a user
Endpoint: /tickets/user/{userId}

Method: GET

Headers:

Authorization: Bearer jwt_token
Response:

200 OK: Returns an array of tickets for the given user.
401 Unauthorized: Missing or invalid token.
Validate a ticket
Endpoint: /tickets/validate

Method: POST

Request body:

JSON
{
  "qrCode": "qr_code_string"
}

Response:

200 OK: Ticket is valid.
JSON
{
  "message": "Ticket valid",
  "isValid": true,
  "ticket": {
    // ... ticket details
  }
}

400 Bad Request: Ticket already used.
404 Not Found: Ticket not found.
```
