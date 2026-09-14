# PrimeNest — Real Estate Marketplace

Browse, buy, sell, or rent properties — and talk to the other side in real time, without ever needing a phone number.

PrimeNest is a full-stack real estate marketplace built to close the gap between finding a property and actually reaching the person behind it. Instead of chasing unanswered calls or emails that never get opened, buyers, sellers, and renters connect directly inside the platform through built-in real-time chat. From browsing listings with rich filters to managing your own properties, proposals, and transactions, PrimeNest brings the entire buying and selling workflow into one place.

🔗 **Live URL:** [your-prime-nest.vercel.app](https://your-prime-nest.vercel.app/)

💳 **Note:** Payments run on Stripe Test Mode — use Stripe's standard test card `4242 4242 4242 4242` (any future expiry, any CVC). No real charges occur.

## ✨ Overview

PrimeNest is powered by a real-time chat layer (Socket.io), a full property management dashboard, and role-based access for regular users and admins. Every property, conversation, and transaction is persisted so users can pick up right where they left off — search today, chat tomorrow, close whenever they're ready.

## 🚀 Features

### 🔍 1. Property Browsing & Search
Find exactly what you're looking for, fast:

- Search by property name or location
- Filter by price range and status — available, pending, or sold
- Sort by price (high to low / low to high), beds, baths, or square feet

### 💬 2. Real-Time Chat
The core of PrimeNest — no more chasing unanswered calls or emails:

- Message buyers and sellers directly inside the platform, powered by Socket.io
- Messages arrive instantly, no refresh needed
- Lives in a dedicated Inbox page inside the dashboard

### 📂 3. Property Management
Full control over your own listings:

- Create, edit, delete, and view your properties
- Save and favorite properties you're interested in — they show up right on your dashboard
- New listings enter a **pending** state and go live only after admin approval

### 📊 4. Dashboard Overview
A snapshot of everything that matters, at a glance:

- Stats on your properties — total, sold, available, and pending
- Recent activity feed
- Proposals received from other users
- Quick actions for common tasks

### 💰 5. Transactions
Track the financial side of every deal:

- Visual charts of your transaction history
- Sortable transaction table
- Current balance at a glance

### 🛡️ 6. Admin: Pending Properties
A dedicated admin-only page to keep listings legitimate:

- Review every property submitted across the platform
- Approve or reject listings before they go live
- Ensures only vetted properties reach the marketplace

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React |
| **Language** | TypeScript |
| **State Management** | Zustand |
| **Data Fetching** | TanStack Query |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Forms & Validation** | React Hook Form, Zod |
| **Maps** | React Leaflet |
| **Real-Time Communication** | Socket.io |
| **Authentication** | Clerk |
| **Payments** | Stripe |
| **Image Storage & CDN** | Cloudinary |
| **Backend** | Node.js, Express |
| **Database** | MongoDB |
| **Deployment (Frontend)** | Vercel |
| **Deployment (Backend)** | Render |

## 🏗️ Architecture Highlights

- **Real-time first:** Socket.io powers instant messaging between users, eliminating the delay of email or missed calls.
- **Type-safe end to end** with TypeScript across the frontend, backed by Zod validation on forms.
- **Efficient data fetching** via TanStack Query for caching, background updates, and a responsive UI.
- **Geospatial browsing** with React Leaflet for map-based property discovery.
- **Moderated marketplace:** every listing passes through an admin approval workflow before going public, keeping listings trustworthy.
- **Secure auth & billing** through Clerk and Stripe, with a full transaction history exposed in-app.

## 📄 License

This project is licensed under the MIT License.

---

Built to help people find their next place — and actually talk to the person on the other side.
