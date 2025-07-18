# 🛡️ Secure Nest – Modern Insurance Platform

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-brightgreen)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-4.1-teal)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%2FDB-orange)](https://firebase.google.com/)
[![React Router](https://img.shields.io/badge/React%20Router-v7-blueviolet)](https://reactrouter.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-4.x-ff69b4)](https://tanstack.com/query)
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-11.x-ffb347)](https://sweetalert2.github.io/)
[![React Toastify](https://img.shields.io/badge/React%20Toastify-9.x-ff9800)](https://fkhadra.github.io/react-toastify/)

---

## 🌐 Live Demo

- **Client:** [https://secure-nest-client.vercel.app/](https://secure-nest-client.vercel.app/)
- **Server:** [https://secure-nest-server.vercel.app/](https://secure-nest-server.vercel.app/)

---

## ✨ Features

- 🔒 Secure authentication (Firebase)
- 🏠 Home, policy, agent, and blog pages
- 🧑‍💼 Role-based dashboards (Admin, Agent, Customer)
- 📄 Policy application & claim management
- 💬 Blog system for agents/admins
- 📊 Real-time data with React Query
- 🌙 Light/dark mode support
- 📱 Fully responsive & mobile-friendly
- 📨 Newsletter subscription

---

## 🧰 Installation & Setup

```bash
git clone https://github.com/your-username/secure-nest-client.git
cd secure-nest-client
yarn
yarn run dev
```

Runs app at `http://localhost:5173`

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project and add a Web App
3. Copy your Firebase config
4. Create a `.env` file in your project root:

    ```
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

5. See [`src/firebase/firebase.js`](src/firebase/firebase.js) for integration.

---

## 🛠️ Technologies Used

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-brightgreen)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-teal)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%2FDB-orange)](https://firebase.google.com/)
[![React Router](https://img.shields.io/badge/React%20Router-v7-blueviolet)](https://reactrouter.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-4.x-ff69b4)](https://tanstack.com/query)
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-11.x-ffb347)](https://sweetalert2.github.io/)
[![React Toastify](https://img.shields.io/badge/React%20Toastify-9.x-ff9800)](https://fkhadra.github.io/react-toastify/)

---

## 📁 Project Structure

```
src/
  components/
  context/
  dashboard/
  firebase/
  hooks/
  pages/
  routes/
  utils/
public/
```

---
