# 📱 grd-mobile

![Expo](https://img.shields.io/badge/Expo-SDK%2051-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.74-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-green)

**grd-mobile** is a modern mobile application built with **Expo**, **React Native**, and **Expo Router** using TypeScript.
Designed with scalable structure, reusable components, and clean navigation architecture.

---

## ✨ Features

- 🚀 Expo SDK 51
- 📁 File-based routing (Expo Router v3)
- 🧭 Bottom Tab Navigation
- 🎨 Modern UI with **NativeWind** (Tailwind CSS for React Native)
- 🖌️ Icons powered by **Lucide**
- ⚡ Fast Refresh & Hot Reload
- 📱 Cross-platform support (Android / iOS / Web)
- 🧠 TypeScript support
- 🎯 Clean project structure (Separation of Concerns)

## 🧱 Project Architecture

````
grd-mobile
├── app/                # Routes (Expo Router - File-based)
│   ├── (tabs)/         # Tab navigation group
│   │   ├── _layout.tsx # Tab navigator config
│   │   ├── home.tsx    # Home Screen
│   │   └── patrol.tsx  # Patrol Screen
│   ├── _layout.tsx     # Root layout
│   └── index.tsx       # Entry point / Splash
│
├── components/         # Reusable UI components
├── contexts/           # Global state (Context API)
├── constants/          # Colors, Fonts & Configuration
├── assets/             # Images & Fonts
├── mocks/              # Mock data for development
├── types/              # TypeScript definitions
│
├── app.json            # Expo configuration
├── babel.config.js     # Babel config (NativeWind support)
├── metro.config.js     # Metro bundler config
├── tsconfig.json       # TypeScript config
└── package.json        # Dependencies

## 🧰 Tech Stack

| Technology         | Description                       |
| ------------------ | --------------------------------- |
| Expo SDK 51        | React Native Framework            |
| React Native 0.74  | Mobile development core           |
| Expo Router        | File-based navigation             |
| TypeScript         | Type-safe development             |
| NativeWind         | Tailwind CSS styling              |
| Lucide React Native| Icon system                       |
| React Context API  | State management                  |

## ⚙️ Requirements

- Node.js (LTS v18 or v20 recommended)
- npm
- Expo Go App (for testing on physical device)

Check version:

```bash
node -v
npm -v
````

## 📦 Installation

Clone repository:

```bash
git clone https://github.com/5t4rrbu6/grd-mobile.git
cd grd-mobile
```

Install dependencies:

```bash
npm install
```

## ▶️ Running the Project

Start development server:

```bash
npx expo start
```

Clear cache (recommended if error occurs):

```bash
npx expo start -c
```

## 📱 Running on Device

1. Install **Expo Go** from App Store or Play Store.
2. Run:
   ```bash
   npx expo start
   ```
3. Scan the QR code using:
   - **Android:** Expo Go app camera.
   - **iOS:** Default Camera app (opens Expo Go automatically).

## 🎨 Icons

This project uses **Lucide React Native** for icons.

Example usage:

```tsx
import { Home, User, Bell } from 'lucide-react-native';

// Usage
<Home size={24} color="black" />
<User size={24} color="#3b82f6" />
```

## 🧪 Useful Commands

Install Expo-compatible packages:

```bash
npx expo install <package-name>
```

Check project health & dependency versions:

```bash
npx expo doctor
```

## 🧹 Troubleshooting

### Clear Metro Cache

If the app doesn't update or shows old code:

```bash
npx expo start -c
```

### Reset Dependencies (Windows PowerShell)

If `npm install` fails or node_modules seems broken:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Reset Dependencies (Mac / Linux / Git Bash)

```bash
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Future Improvements

- 🔐 Authentication (Login/Register)
- 🌐 API Integration with Backend
- 🔔 Push Notifications
- 🗄️ Offline Storage (SQLite / AsyncStorage)
- 🌙 Dark Mode Support

## 📄 License

MIT License

## 👨‍💻 Author

Built with ❤️ using Expo & React Native.

**GitHub:** [5t4rrbu6](https://github.com/5t4rrbu6)

```

```
