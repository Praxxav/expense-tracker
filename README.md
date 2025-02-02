# Expense Tracker

This is an expense tracker application built with a backend that implements JWT authentication, Prisma ORM with PostgreSQL, and various features such as sign-in and sign-up functionality along with expense insight routes.

## Features

- **Sign-In / Sign-Up**: 
  - JWT Authentication is implemented to secure user login and registration.
  
- **Expense Insight Routes**:
  - Routes to add, update, and view expenses.
  - Provides total spending per category and percentage distribution of expenses across categories.

- **Database**:
  - Uses PostgreSQL as the database for storing user data and expenses.
  - Prisma ORM is used for interacting with the database.

## Technologies Used

- **Node.js**: Backend server.
- **Hono.js**: A minimal and fast web framework for building APIs.
- **JWT (JSON Web Token)**: Authentication mechanism for secure user login and access.
- **Prisma ORM**: Used to interact with the PostgreSQL database.
- **PostgreSQL**: Database for storing user data and expenses.

## Setup

To get started, follow the steps below:

### 1. Clone the repository
```bash
git clone https://github.com/Praxxav/expense-tracker-backend.git
cd expense-tracker-backend
