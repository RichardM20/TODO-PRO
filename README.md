# TODO-PRO 📝

**TODO-PRO** is a professional note-taking web application designed to help users organize their ideas, tasks, and projects efficiently. The app is structured with a clear separation between frontend and backend, ensuring scalability and maintainability.

---

## ✨ Tech Stack

### Frontend (`front-end` folder)

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Backend (`back-end` folder)

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT Authentication](https://jwt.io/)

---

## 📁 Project Structure

```text
TODO-PRO/
├── back-end/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── schemas/
│       ├── services/
│       ├── types/
│       ├── utils/
│       ├── index.ts
│       └── ...
├── front-end/
│   ├── public/
│   └── src/
│       ├── app/
│       │   ├── dashboard/
│       │   ├── login/
│       │   ├── register/
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── core/
│       │   └── HttpServer.ts
│       └── features/
│           └── auth/
│               ├── components/
│               ├── hooks/
│               └── services/
└── ...
```


## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/todo-pro.git
cd todo-pro
```

### 2. Install dependencies

```bash
npm install
```

## Run project

### Backend

```bash
cd back-end
npm run start:dev
```

### Frontend

```bash
cd front-end
npm run dev --turbopack
```
