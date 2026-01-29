# 🚀 Portfolio AI – Full Stack Developer Portfolio

A modern, production-ready **full-stack developer portfolio platform** built with **Next.js App Router**.  
It features an **Admin Dashboard**, **Project Management system with image & video uploads**, **AI Chat**, and a **RAG-based PDF Q&A system**.

This project is designed to be **scalable**, **secure**, and **suitable for real-world SaaS, freelance, or portfolio use**.

---

## 🌐 Live Demo

🔗 **Live URL:** _(Add your Vercel deployment link here)_  
Example: https://your-portfolio.vercel.app

---

## ✨ Features

### 👤 Public Website
- Portfolio projects listing
- Project details page (image + video support)
- Resume page
- Contact form
- AI Chat interface (ChatGPT-style)
- Fully responsive & modern UI

---

### 🔐 Admin Dashboard
- Secure admin authentication (NextAuth)
- Full CRUD for projects
- Image upload (Cloudinary via server)
- Video upload (Direct Cloudinary – supports large files with progress)
- Live URL & GitHub URL support
- Featured projects
- PDF Knowledge Management (RAG)
  - Upload PDFs
  - Vector embeddings
  - AI answers based on uploaded PDFs
- Contact messages management
- Real-time UI updates

---

### 🤖 AI & RAG System
- AI chat endpoint
- PDF document ingestion
- Vector search using embeddings
- Message source tracking

---

## 🧠 Tech Stack

### Frontend
- Next.js 16 (App Router + Turbopack)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth (Credentials-based authentication)

### AI & Search
- OpenAI / compatible LLM
- Vector embeddings
- RAG pipeline

### Media Storage
- Cloudinary (Images & Videos)
- Image upload via server
- Video upload directly from browser (no timeout, progress supported)

---

## 📁 Project Structure

portfolio-ai/
├── prisma/
│ ├── schema.prisma
│ └── migrations/
│
├── src/
│ ├── app/
│ │ ├── (public)/
│ │ ├── admin/
│ │ ├── api/
│ │ └── layout.tsx
│ │
│ ├── components/
│ │ ├── ui/
│ │ ├── navbar.tsx
│ │ └── admin-sidebar.tsx
│ │
│ ├── lib/
│ │ ├── prisma.ts
│ │ ├── auth.ts
│ │ ├── cloudinary.ts
│ │ └── ai.ts
│ │
│ └── types/
│
├── public/
├── .env
├── package.json
└── README.md


---

## 🗄️ Database Schema (Highlights)

- User / Account / Session (NextAuth)
- Project (Portfolio projects)
- PdfDocument & PdfChunk (RAG system)
- Chat / Message / MessageSource
- ContactMessage

**ORM:** Prisma  
**Database:** PostgreSQL

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://...

NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

OPENAI_API_KEY=xxxx
▶️ Run Locally
# Install dependencies
npm install

# Run development server
npm run dev
App will run at:
👉 http://localhost:3000

🏗️ Production Build
npm run build
npm start
🔐 Admin Access
Admin routes are protected

Only users with role = ADMIN can access the admin dashboard

🎯 Why This Project?
Real-world full-stack architecture

Handles large media uploads safely

Uses modern Next.js App Router

Demonstrates AI + RAG integration

Suitable for portfolio, SaaS base, or freelance projects

📌 Future Improvements
Role-based access control (RBAC)

Analytics dashboard

Project categories & tags

Rate limiting for AI chat

Dark mode toggle

👨‍💻 Author
Rahul Biswas
Full Stack Developer (MERN / Next.js)

⭐ Support
If you like this project, please ⭐ star the repository.

