---

## ⚠️ Notes

Due to my ongoing university exams, I wasn’t able to complete the full CRUD operations and AI summarization feature within the given time frame.  

I managed to implement:

- User authentication (Google login and Email/Password login) using Supabase.
- A basic frontend structure for the notes feature using dummy JSON data to simulate notes.

The CRUD functionality and AI integration setup are planned, and I intend to complete them once my exams are over.

Thank you for your understanding!


## 📌 Project Status

**In Progress** — core authentication implemented, notes feature prototyped using dummy data.  
Full CRUD operations and AI summarization integration pending due to ongoing exams.



# 📝 NoteAI - AI Powered Notes App

A minimal, clean, and AI-powered notes application built with **Next.js (TypeScript)**, **Supabase**, **React Query**, **Shadcn UI**, and **DeepSeek AI Summarization API**.

Deployed live 👉 [Vercel App URL Here](https://ai-notes-app-azure.vercel.app/)

---

## 📖 Features

✅ **User Authentication**
- Sign up & Login via **Email/Password**
- Google OAuth integration via **Supabase**

✅ **Notes Management**
- Create, Edit, and Delete notes
- Notes stored securely in Supabase database

✅ **AI-Powered Summarization**
- Summarize your notes using **DeepSeek API**
- Quickly get concise summaries for long notes

✅ **State Management**
- **React Query** used for efficient data fetching, caching, and synchronizing notes data

✅ **Modern UI**
- Clean, accessible, and responsive design using **Tailwind CSS** and **Shadcn UI**

✅ **Deployed on Vercel**
- Live, production-ready app deployed via **Vercel**

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router) + TypeScript
- **Backend:** Supabase (Database + Auth)
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI
- **State Management:** React Query
- **AI API:** DeepSeek API (or Groq as fallback)
- **Deployment:** Vercel

---

## 📦 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/GAURAV07C/ai-notes-app/
cd your-repo-name


npm install
# or
yarn install
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_AI_API_KEY=your_ai_api_key
