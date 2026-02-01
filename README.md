# 🚀 Portfolio AI – Full-Stack AI Portfolio & Support System

A **production-grade portfolio web application** built with **Next.js App Router**, featuring:
- AI-powered PDF RAG chatbot
- Realtime visitor ↔ admin support chat
- Secure admin dashboard
- Modern full-stack architecture

This project demonstrates **real-world SaaS patterns**, not demo code.

---

## ✨ Features

### 🌐 Public Portfolio
- Home, Projects, Resume, Contact pages
- Dynamic project pages (slug-based)
- Modern UI with animations
- Floating support chat icon (Messenger-style)

### 🤖 AI Chat (PDF RAG)
- Upload PDFs and activate/deactivate knowledge sources
- Chunking & context-grounded answers
- Anti-hallucination rules (“I don’t know” fallback)
- Graceful handling of AI rate limits (Gemini free tier)
- Database-backed chat history

### 💬 Realtime Support Chat
- Visitor chat without login (guest ID)
- Realtime messaging using **Pusher**
- Admin inbox with conversation threads
- Global admin notification for new messages
- Optimistic UI (messages appear instantly)

### 🛠 Admin Dashboard
- Secure admin authentication (NextAuth)
- Projects CRUD
- PDF management (upload, activate, toggle)
- Contact messages
- Support chat inbox

---

## 🧱 Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL (Neon)**

### Auth
- **NextAuth.js**
- Credentials provider
- Role-based access (ADMIN)

### AI
- **Google Gemini API (Free Tier)**
- PDF-based RAG (context-only answers)
- Safe fallback on quota exhaustion

### Realtime
- **Pusher (WebSockets)**

### Storage
- **Cloudinary** (images & videos)

---

## 🗂 Database Highlights

- Users, Sessions, Accounts (NextAuth)
- Projects
- PDF Documents & Chunks
- AI Chat Messages
- Support Threads & Messages
- Contact Messages

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

# Gemini AI
GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=gemini-2.5-flash

# Pusher
PUSHER_APP_ID=xxxx
PUSHER_KEY=xxxx
PUSHER_SECRET=xxxx
PUSHER_CLUSTER=ap2

NEXT_PUBLIC_PUSHER_KEY=xxxx
NEXT_PUBLIC_PUSHER_CLUSTER=ap2

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
🧪 Local Development
npm install
npx prisma db push
npx prisma generate
npm run dev
Open:

http://localhost:3000 → Public site

http://localhost:3000/admin-login → Admin panel

🔐 Admin Access
Admin authentication via NextAuth

Role-protected routes

Guest users cannot access admin pages

🧠 Design Philosophy
Production-first mindset

Graceful failure over crashes

Clear separation of concerns

Real-time UX similar to modern SaaS tools

Defensive AI usage (rate-limit & fallback aware)

📌 Notes
Gemini free tier has rate limits; the app handles this gracefully.

Prisma + Neon dev logs may show connection warnings (expected in dev mode).

Optimized for deployment on Vercel.

📸 Screenshots
(Add screenshots or GIFs here for extra impact)

📄 License
MIT

👋 Author
Rahul Biswas
Full-Stack Developer
AI • Next.js • Prisma • Realtime Systems