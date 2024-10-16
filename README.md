# E-Wallet - Basic Version

This is a basic version of an E-wallet application where users can sign up, sign in, and receive a web token (JWT) upon successful login. The token is stored in the browser's local storage to keep users logged in. Additionally, the app features a transaction handling system that ensures if a money transfer fails, the debited amount is credited back to the source account.

## Features

- **User Authentication**: Sign up and sign in functionality with JWT-based authentication. The token is stored in local storage for persistent sessions.
- **Transaction Handling**: If a money transfer transaction fails in between, the debited money is automatically credited back to the source account.
  
## Technologies Used

- **Frontend**:
  - [React]: A JavaScript library for building user interfaces.
  - [Tailwind CSS]: A utility-first CSS framework for designing responsive web pages.
  - [Zod]: A TypeScript-first schema declaration and validation library used for input validation.
  - [Axios]: A promise-based HTTP client for sending API requests to the backend.

- **Backend**:
  - [Node.js]: A JavaScript runtime environment for building server-side applications.
  - [Express.js]: A web framework for Node.js for building RESTful APIs.
  - [MongoDB]: A NoSQL database for storing user data and transaction records.

## Setup and Installation

### Prerequisites

Make sure you have the following installed on your local development environment:

- [Node.js]
- [MongoDB]

### Steps

1. **Clone the repository**:
   ```bash
  install npm in both backend and frontend
