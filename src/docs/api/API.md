# API Documentation for NovusCap

## Overview

The NovusCap API provides a set of endpoints for managing users, organizations, and authentication within the NovusCap application. This document outlines the available API endpoints, their methods, and the expected request and response formats.

## Base URL

The base URL for all API requests is:

```
https://api.novuscap.com/api
```

## Authentication

All endpoints require a valid JWT token for authentication. The token should be included in the `Authorization` header as follows:

```
Authorization: Bearer <token>
```

## Endpoints

### Users

#### Register a New User

- **POST** `/users/register`
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "roleId": "string"
  }
  ```
- **Response:**
  - **201 Created**
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string"
  }
  ```

#### User Login

- **POST** `/users/login`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK**
  ```json
  {
    "token": "string",
    "refreshToken": "string"
  }
  ```

#### Get Current User

- **GET** `/users/me`
- **Response:**
  - **200 OK**
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "roleId": "string"
  }
  ```

### Organizations

#### Get All Organizations

- **GET** `/organizations`
- **Response:**
  - **200 OK**
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "logoUrl": "string",
      "website": "string"
    }
  ]
  ```

#### Get Organization by ID

- **GET** `/organizations/{id}`
- **Response:**
  - **200 OK**
  ```json
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "logoUrl": "string",
    "website": "string"
  }
  ```

#### Create a New Organization

- **POST** `/organizations`
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "logoUrl": "string",
    "website": "string"
  }
  ```
- **Response:**
  - **201 Created**
  ```json
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "logoUrl": "string",
    "website": "string"
  }
  ```

#### Update an Organization

- **PUT** `/organizations/{id}`
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "logoUrl": "string",
    "website": "string"
  }
  ```
- **Response:**
  - **200 OK**
  ```json
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "logoUrl": "string",
    "website": "string"
  }
  ```

#### Delete an Organization

- **DELETE** `/organizations/{id}`
- **Response:**
  - **204 No Content**

### Organization Types

#### Get All Organization Types

- **GET** `/organization-types`
- **Response:**
  - **200 OK**
  ```json
  [
    {
      "id": "string",
      "typeName": "string"
    }
  ]
  ```

## Error Handling

All error responses will have a standard format:

```json
{
  "status": "error",
  "message": "Error message here"
}
```

## Conclusion

This API documentation provides a comprehensive overview of the endpoints available in the NovusCap application. For further details, please refer to the source code or contact the development team.