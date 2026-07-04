# SUJJU Software Solutions — API Documentation

**Base URL (Production):** `https://your-backend.onrender.com`  
**Base URL (Development):** `http://localhost:5000`  
**Content-Type:** `application/json`

---

## Rate Limits

| Scope          | Limit             |
|----------------|-------------------|
| All API routes | 100 req / 15 min  |
| Contact form   | 10 req / 1 hour   |

Rate limit headers are included in all responses: `RateLimit-Limit`, `RateLimit-Remaining`.

---

## Health Check

### `GET /health`

Returns service health status. Used by Render for uptime monitoring.

**Response `200 OK`**
```json
{
  "status": "ok",
  "message": "SUJJU Software Solutions API is running",
  "timestamp": "2026-07-04T16:30:00.000Z"
}
```

---

## Contact

### `POST /api/contact`

Submits a contact form message. Saves to MongoDB and sends an email via Nodemailer.

**Request Body**
```json
{
  "name":    "string (required, min 2 chars)",
  "email":   "string (required, valid email)",
  "phone":   "string (optional, 7–20 digits)",
  "subject": "string (required, min 3 chars)",
  "message": "string (required, min 10 chars)"
}
```

**Response `201 Created`**
```json
{
  "success": true,
  "message": "Your message has been received. We will get back to you soon!"
}
```

**Response `400 Bad Request`** (validation failure)
```json
{
  "success": false,
  "message": "A valid email address is required."
}
```

**Response `429 Too Many Requests`** (rate limit hit)
```json
{
  "success": false,
  "message": "Too many messages sent. Please try again later."
}
```

**Response `500 Internal Server Error`**
```json
{
  "success": false,
  "message": "An error occurred. Please try again later."
}
```

---

## Services

### `GET /api/services`

Returns the list of services offered by SUJJU Software Solutions.

**Response `200 OK`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Software Development",
      "description": "End-to-end custom software solutions tailored to your business.",
      "category": "development"
    }
  ]
}
```

---

## Gallery

### `GET /api/gallery`

Returns project, event, and certificate gallery images.

**Response `200 OK`**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "url": "https://...",
      "category": "Events",
      "alt": "Project Expo Presentation"
    }
  ]
}
```

---

## AI Validation (Mock)

### `POST /ai/validate`

Accepts a multipart image upload and returns a mock YOLOv8 classification result. This endpoint mirrors the interface of the real Flask/YOLOv8 microservice so the frontend requires no changes when the real model is integrated.

**Request**
- **Content-Type:** `multipart/form-data`
- **Field:** `image` (any image file)

**Response `200 OK`**
```json
{
  "success": true,
  "predictedClass": "Garbage",
  "confidence": 0.96,
  "matched": true
}
```

**Response `400 Bad Request`** (no image provided)
```json
{
  "success": false,
  "message": "No image uploaded"
}
```

---

## Error Codes Summary

| Code | Meaning                  |
|------|--------------------------|
| 200  | OK                       |
| 201  | Created                  |
| 400  | Bad Request / Validation |
| 404  | Route Not Found          |
| 429  | Rate Limit Exceeded      |
| 500  | Internal Server Error    |
