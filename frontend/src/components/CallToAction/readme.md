# 📢 CallToAction Component

The **CallToAction** section is part of the `HomePage` in the **intelliDGA** web application.  
It serves as a prompt for unauthenticated users to sign up or log in and start using the platform.  
When a user is logged in, this section remains **hidden** automatically.

---

## 🚀 Purpose

To display an attractive and responsive call-to-action banner encouraging new users to:

- **Sign up** for an account, or
- **Sign in** if they already have one.

The section enhances engagement and user conversion for first-time visitors.

---

## 🧩 File Structure

intelliDGAforge/Frontend/src/
├── components/CallToAction
│ └── CallToAction.jsx
├── hooks/
│ └── useAuthStatus.js

## ⚙️ How It Works

1. The component imports and uses the custom hook [`useAuthStatus`](../hooks/useAuthStatus.js).
2. The hook calls the `getMe()` API to check the current authentication state.
3. Based on the returned `user` object:
   - If **`user` exists** → The section is **hidden**.
   - If **`user` is null** → The section is **visible**.
4. The component also hides itself while the authentication status is **loading** to prevent flicker.

---

## 🧠 Logic Overview

```mermaid
graph TD
A[Render CallToAction] --> B{useAuthStatus()}
B -->|loading| C[return null]
B -->|user != null| D[return null (hide)]
B -->|user == null| E[Render Call-To-Action Section]

```
