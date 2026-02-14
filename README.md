# 📱 grd-mobile

![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.81-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-green)

**grd-mobile** is a modern mobile application built with **Expo**, **React Native**, and **Expo Router** using TypeScript.
Designed with scalable structure, reusable components, and clean navigation architecture.

---

## ✨ Features

- 🚀 Expo SDK 54
- 📁 File-based routing (Expo Router)
- 🧭 Bottom Tab Navigation
- 🎨 Modern UI with reusable components
- ⚡ Fast Refresh & Hot Reload
- 📱 Cross-platform support (Android / iOS / Web)
- 🧠 TypeScript support
- 🎯 Clean project structure

---

## 🖼️ Preview

> Add screenshots here later:

```
assets/screenshots/home.png
assets/screenshots/patrol.png
```

Example:

```md
![Home Screen](assets/screenshots/home.png)
```

---

## 🧱 Project Architecture

```
grd-mobile
├── app/                # Routes (Expo Router)
│   ├── (tabs)/         # Tab navigation
│   └── _layout.tsx
│
├── components/         # Reusable UI components
├── contexts/           # Global state (Context API)
├── constants/          # Colors & configuration
├── assets/             # Images & fonts
├── mocks/              # Mock data
├── types/              # TypeScript types
│
├── app.json            # Expo configuration
├── babel.config.js     # Babel config
├── metro.config.js     # Metro bundler config
├── tsconfig.json       # TypeScript config
└── package.json        # Dependencies
```

---

## 🧰 Tech Stack

| Technology        | Description            |
| ----------------- | ---------------------- |
| Expo              | React Native Framework |
| React Native      | Mobile development     |
| Expo Router       | File-based routing     |
| TypeScript        | Type-safe development  |
| Expo Vector Icons | Icon system            |

---

## ⚙️ Requirements

- Node.js (LTS recommended)
- npm
- Expo CLI (optional)

Check version:

```bash
node -v
npm -v
```

---

## 📦 Installation

Clone repository:

```bash
git clone <your-repository-url>
cd grd-mobile
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Project

Start development server:

```bash
npx expo start
```

Clear cache (recommended if error occurs):

```bash
npx expo start -c
```

---

## 📱 Running on Device

1. Install **Expo Go** (Android / iOS)
2. Run:

```bash
npx expo start
```

3. Scan the QR code from terminal/browser.

---

## 🧭 Routing Example (Expo Router)

```
app/
 ├── index.tsx        → /
 ├── (tabs)/
 │   ├── _layout.tsx  → Tabs Layout
 │   ├── home.tsx
 │   ├── patrol.tsx
 │   └── more.tsx
```

---

## 🎨 Icons

Using:

```bash
@expo/vector-icons
```

Example:

```tsx
import { Ionicons } from "@expo/vector-icons";

<Ionicons name="home" size={24} color="black" />;
```

---

## 🧪 Useful Commands

Install Expo-compatible packages:

```bash
npx expo install <package-name> --npm
```

Check project health:

```bash
npx expo doctor
```

---

## 🧹 Troubleshooting

### Clear Metro Cache

```bash
npx expo start -c
```

### Reset Dependencies

```bash
rm -r node_modules
del package-lock.json
npm install
```

---

## 🚀 Future Improvements

- 🔐 Authentication
- 🌐 API Integration
- 🔔 Push Notifications
- 🗄️ Offline Storage
- 🌙 Dark Mode

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built with ❤️ using Expo & React Native.
