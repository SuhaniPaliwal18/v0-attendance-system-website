# Attendance system website

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/suhanipaliwal1836-8522s-projects/v0-attendance-system-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/5r0WBhgD9K3)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/suhanipaliwal1836-8522s-projects/v0-attendance-system-website](https://vercel.com/suhanipaliwal1836-8522s-projects/v0-attendance-system-website)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/5r0WBhgD9K3](https://v0.app/chat/projects/5r0WBhgD9K3)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Local Development Setup

This project consists of a Next.js frontend and an Express.js backend with a MySQL database using Prisma.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or pnpm (used in this project)
*   MySQL Server (running locally or accessible)

### 1. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

**1.1. Install Dependencies**

```bash
npm install
```

**1.2. Configure Database Connection**

Create a `.env` file in the `backend` directory with your MySQL connection string. Replace `YOUR_PASSWORD` and `YOUR_DATABASE_NAME` with your actual credentials. Remember to URL-encode special characters in your password (e.g., `@` becomes `%40`).

```
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/YOUR_DATABASE_NAME"
```

**1.3. Run Prisma Migrations**

This will create the necessary tables in your MySQL database based on the schema defined in `prisma/schema.prisma`.

```bash
npx prisma migrate dev --name init
```
*If you encounter a "drift detected" error and are okay with losing all data in your development database, you can reset it:*
```bash
PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION="yes" npx prisma migrate reset --force
```

**1.4. Start the Backend Server**

*   **Development Mode (with live reload):**
    ```bash
    npm run dev
    ```
*   **Production Mode (build and run):**
    ```bash
    npm run build
    npm start
    ```
The backend server will typically run on `http://localhost:5000`.

### 2. Frontend Setup

Navigate back to the project root directory:

```bash
cd ..
```

**2.1. Install Dependencies**

```bash
npm install
```

**2.2. Start the Frontend Development Server**

```bash
npm run dev
```
The frontend will typically run on `http://localhost:3000`.

### 3. Running the Full Project

To run both the frontend and backend simultaneously, open two separate terminal windows.

*   In the first terminal, navigate to the `backend` directory and run:
    ```bash
    cd backend
    npm run dev
    ```
*   In the second terminal, navigate to the project root directory and run:
    ```bash
    npm run dev
    ```
