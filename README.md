# Candle Order API

This repository contains the Candle Order API, which allows users to manage candle fragrances.

## Installation

To install the Candle Order API, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/candle-order-api.git`
2. Navigate to the project directory: `cd candle-order-api`
3. Install the dependencies: `npm install`

## This API uses Redis for the DB and ORM

To install Redis Stack locally via docker

1. Have docker installed - `https://www.docker.com/`
2. Run these commands for Redis Stack locally

```
# Pull the Redis Stack Docker image
docker pull redis/redis-stack

# Run Redis Stack
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack
```

## Usage

To start the Candle Order API, run the following command:

```
node app.js
```

Once the server is running, you can access the API at `http://localhost:3000`.

## API Endpoints

The following endpoints are available:

- `Get /fragrance`: Get a list of all fragrance
- `POST /fragrance`: Update an existing fragrance
- `PUT /fragrance`: Create a fragrance
- `DELETE /fragrance/:id`: Delete a fragrance

There is a postman collection in the postman folder to use.
