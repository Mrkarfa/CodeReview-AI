# CodeReview AI

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)

**AI-powered code review SaaS that analyzes your GitHub repositories using Google Gemini AI**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Project Structure](#project-structure) • [API Reference](#api-reference)

</div>

---

## ✨ Features

- **🤖 AI-Powered Reviews** - Leverage Google Gemini AI for intelligent code analysis
- **🔗 GitHub Integration** - Connect repositories and select branches for review
- **📊 Dashboard** - View stats, recent reviews, and quick actions
- **📜 Custom Guidelines** - Define your team's coding standards with RAG support
- **📝 Review History** - Track all past reviews with detailed issue breakdowns
- **⚡ Background Processing** - Async review processing with Inngest
- **🔐 Secure Auth** - GitHub OAuth with Better Auth
- **🌙 Dark Mode** - Beautiful dark theme by default

---

## 🛠️ Tech Stack

| Category             | Technology                    |
| -------------------- | ----------------------------- |
| **Framework**        | Next.js 16 (App Router)       |
| **Language**         | TypeScript 5                  |
| **Styling**          | Tailwind CSS v4 + Shadcn UI   |
| **Database**         | SQLite (via Prisma + libsql)  |
| **Authentication**   | Better Auth + GitHub OAuth    |
| **AI**               | Google Gemini (via AI SDK)    |
| **Vector DB**        | Pinecone (RAG for guidelines) |
| **Background Jobs**  | Inngest                       |
| **State Management** | TanStack React Query          |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub OAuth App credentials
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd project-2

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# Authentication (Required)
BETTER_AUTH_SECRET="generate-with-openssl-rand-base64-32"
BETTER_AUTH_URL="http://localhost:3000"

# GitHub OAuth (Required - create at GitHub Developer Settings)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Google Gemini AI (Required for reviews)
GOOGLE_GEMINI_API_KEY="your-gemini-api-key"

# Pinecone - Optional (for RAG)
PINECONE_API_KEY="your-pinecone-api-key"

# Inngest - Optional (for background jobs)
INNGEST_EVENT_KEY="your-inngest-event-key"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env`

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Auth routes (login)
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── dashboard/        # Overview page
│   │   ├── review/           # Start new review
│   │   ├── history/          # Review history
│   │   │   └── [id]/         # Review details
│   │   ├── guidelines/       # Custom guidelines
│   │   └── settings/         # User settings
│   ├── api/                  # API routes
│   │   ├── auth/[...all]/    # Better Auth handler
│   │   ├── reviews/          # Review CRUD
│   │   ├── guidelines/       # Guidelines CRUD
│   │   ├── github/           # GitHub API proxy
│   │   └── inngest/          # Inngest handler
│   └── page.tsx              # Landing page
├── components/
│   ├── dashboard/            # Dashboard components
│   ├── landing/              # Landing page components
│   └── ui/                   # Shadcn UI components
├── inngest/
│   ├── client.ts             # Inngest client
│   └── functions.ts          # Background job functions
└── lib/
    ├── auth.ts               # Better Auth config
    ├── auth-client.ts        # Client-side auth
    ├── gemini.ts             # Gemini AI service
    ├── github.ts             # GitHub API client
    ├── pinecone.ts           # Pinecone RAG service
    ├── prisma.ts             # Prisma client
    └── utils.ts              # Utility functions

prisma/
├── schema.prisma             # Database schema
└── dev.db                    # SQLite database
```

---

## 📊 Database Schema

| Model            | Description                          |
| ---------------- | ------------------------------------ |
| **User**         | User profiles with GitHub connection |
| **Session**      | Auth sessions                        |
| **Account**      | OAuth provider accounts              |
| **Review**       | Code review jobs                     |
| **ReviewResult** | Individual issues found              |
| **Guideline**    | Custom coding standards              |

---

## 🔌 API Reference

### Reviews

| Endpoint            | Method | Description         |
| ------------------- | ------ | ------------------- |
| `/api/reviews`      | GET    | List user's reviews |
| `/api/reviews`      | POST   | Create new review   |
| `/api/reviews/[id]` | GET    | Get review details  |

### Guidelines

| Endpoint              | Method | Description      |
| --------------------- | ------ | ---------------- |
| `/api/guidelines`     | GET    | List guidelines  |
| `/api/guidelines`     | POST   | Create guideline |
| `/api/guidelines?id=` | DELETE | Delete guideline |

### GitHub

| Endpoint                     | Method | Description        |
| ---------------------------- | ------ | ------------------ |
| `/api/github/repos`          | GET    | List user's repos  |
| `/api/github/branches?repo=` | GET    | List repo branches |

---

## 🎨 UI Components

Built with [Shadcn UI](https://ui.shadcn.com/):

- Button, Card, Input, Label, Select
- Table, Badge, Dialog, Sheet
- Avatar, Dropdown Menu, Separator
- Tooltip, Skeleton, Switch, Textarea

---

## 🔄 Background Jobs

Reviews are processed asynchronously using Inngest:

1. **review/requested** - Triggered when user starts a review
2. **processReview** - Fetches files, runs AI analysis, stores results
3. **review/completed** - Fired when review is done

---

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

<div align="center">
  <p>Built with ❤️ using Next.js, Gemini AI, and Tailwind CSS</p>
</div>
