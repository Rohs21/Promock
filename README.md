# 🧠 ProMock – Your AI-Powered Interview Preparation Partner
<img width="1911" height="972" alt="image" src="https://github.com/user-attachments/assets/9764a841-e447-40c1-b47a-159331282e91" />

ProMock is an intelligent web application built for **AI-based interview preparation**. It allows users to experience **real-time mock interviews** — complete with **AI-generated questions, answers, and feedback** — helping them get ready for real-world interviews with confidence.  

🌐 **Live Demo:** [promock.vercel.app](https://promock.vercel.app)

---

## 🚀 Features

- 🎯 **AI-Generated Questions & Answers:** Automatically generates relevant interview questions and ideal answers based on the job title and description provided by the user.  
- 🗣️ **Audio & Video Interviews:** Simulates real interview sessions with both **audio** and **video** interaction.  
- 🔍 **Performance Review:** After completion, ProMock provides an **AI-powered feedback report**, helping users identify their strengths and weaknesses.  
- 🔐 **Secure Authentication:** Integrated with **Clerk** for seamless and secure user sign-in/sign-up experience.  
- 💾 **Cloud Database:** Uses **NeonDB (PostgreSQL)** to store user sessions, questions, and interview performance data.  
- ⚡ **Optimized Performance:** Built with **Next.js** for fast, server-side rendering and React for smooth interactivity.  
- ☁️ **Deployed on Vercel:** Ensures high scalability and quick global access.  

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | [Next.js](https://nextjs.org/) (React-based) |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Database** | [NeonDB](https://neon.tech/) (Serverless PostgreSQL) |
| **AI Integration** | Custom AI model for question & answer generation |
| **Hosting** | [Vercel](https://vercel.com/) |
| **Language** | JavaScript / TypeScript |

---

## ⚙️ Installation and Setup

Follow these steps to run **ProMock** locally:

### 1. Clone the repository
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
