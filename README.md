# Auth0 Multi-Device Session Management & Forced Logout System

## Overview

This project implements a **secure multi-device session management flow** using **Auth0**, **Next.js App Router**, and **Prisma**. The core idea is simple:

> When a user logs in from a new device, they can choose to **log out other devices**, ensuring only one active trusted session at a time.

This setup is ideal for applications where security is critical — banking apps, admin dashboards, productivity tools, etc.

The project provides routes, logic, and database handling for safely detecting devices, managing multiple sessions, and force‑logging out previously active sessions.

---

## Key Features

### 🔐 1. Multi-Device Session Tracking

Each login creates a **session record** in the database with:

* Device ID
* Browser info
* Status (LogIn / LogOut)
* Timestamps

### 🚫 2. Forced Logout of Old Devices

When a user logs in on a new device, they are redirected to:

```
/logoutolddevice?newDeviceId=XYZ
```

Where they can trigger a forced logout of older sessions.

### 🌐 3. Auth0 Secure Session Handling

Uses:

* `auth0.getSession()` to fetch logged-in user
* Redirects users who aren't authenticated

### 🧠 4. Clean Session Filtering

On login, the backend selects only sessions with `status === "LogIn"` and determines which ones should be invalidated.

---


---

## Setup Instructions

### 1. Install Dependencies

```
pm install
```

### 2. Setup Environment Variables

```
AUTH0_SECRET=...
AUTH0_BASE_URL=...
AUTH0_CLIENT_ID=...
AUTH0_CLIENT_SECRET=...
DATABASE_URL=...
```

### 3. Prisma Migrate

```
npx prisma migrate dev
```

### 4. Run

```
pm run dev
```

---

