# 📓 Mini AI-Powered Notes App

A fully functional AI-integrated Notes App built with **Next.js (TypeScript)**, **TailwindCSS**, **Shadcn UI**, **Supabase**, **React Query**, and an **AI Summarization API**.  
This application allows users to securely authenticate, create, manage, and summarize their notes using AI.

---

## 📑 Features

### 🔐 User Authentication  
- **Google OAuth** via Supabase  
- **Email & Password** login/signup via Supabase Auth  

### 📝 Note Management  
- Create, Edit, and Delete notes  
- Notes stored securely in Supabase Database  

### 🧠 AI Summarization  
- Integrated AI summarization API to generate summaries of notes  
- Using **DeepSeek API** / **Groq** / **Gemini** or other available free AI APIs  

### 📦 State Management  
- Managed with **React Query** for efficient data fetching, caching, and optimistic updates  

### 💅 Modern UI  
- Built with **TailwindCSS**  
- Component library: **Shadcn UI** for clean and reusable components  

### 🌐 Deployment  
- Deployed on **Vercel**  
- 🔗 [Deployed App Link](https://ai-notes-app-azure.vercel.app/)

---

## 🛠️ Tech Stack

| Frontend     | Backend      | State Management | AI API        | Deployment |
|:------------|:-------------|:----------------|:--------------|:------------|
| Next.js (App Router, TypeScript) | Supabase (Database + Auth) | React Query | DeepSeek / Groq / Gemini | Vercel |
| TailwindCSS  |               |                  |                |            |
| Shadcn UI    |               |                  |                |            |

---

## 📥 Getting Started

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/ai-notes-app.git
cd ai-notes-app
```



### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```
### 3️⃣ Setup Environment Variables

Create a .env.local file in the project root and add the following:


```bash

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DeepSeek_API_Key=your_ai_api_key
baseURL=https://api.deepseek.com
```






## 📸 Screenshots
<img width="956" alt="image" src="https://github.com/user-attachments/assets/09e2668c-1814-4464-8534-38c81bfad645" />

<img width="959" alt="image" src="https://github.com/user-attachments/assets/0d08abf8-7af6-4440-9e27-d580621c16b9" />


---

## 📡 Live Demo  
🔗 [Deployed App Link](https://ai-notes-app-azure.vercel.app/)

---



## 📌 Final Notes  

This project demonstrates:
- Full-stack integration using **Supabase**
- Clean, modular **Next.js TypeScript** code  
- State management with **React Query**
- Secure server-side handling of AI APIs
- Deployment on **Vercel**
- Modern, responsive UI using **TailwindCSS** + **Shadcn UI**

---

## 🙌 Author  

**Gaurav Kumar**  
[LinkedIn](https://www.linkedin.com/in/gaurav07c)

⭐ If you like this project, drop a star on GitHub!
