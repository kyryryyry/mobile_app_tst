# React Native Articles App

A React Native application that displays articles from JSONPlaceholder API with offline support and caching capabilities.

## Tech Stack

- **React Native CLI** - Chosen over Expo for better control over native modules and easier APK generation
- **TypeScript** - For type safety and better developer experience
- **React Navigation** - Native stack navigator for performant navigation
- **React Query (TanStack Query)** - Data fetching and caching with 30-second TTL
- **Zustand** - Lightweight state management
- **MMKV** - Fast, secure, synchronous key-value storage (preferred over AsyncStorage)
- **React Native NetInfo** - Network state monitoring

## Architecture Decisions

### State Management
- **Zustand** for offline state management - lightweight and perfect for small-scale state needs
- **MMKV** for persistent storage - synchronous operations and better performance than AsyncStorage
- Separation of concerns: `appStateStore` for app-wide state, `articlesStore` for business data

### Data Layer
- **React Query** handles server state and caching (30-second TTL)
- **Custom hooks** (`useOfflineQuery`) abstract offline/online logic for reusability
- Clear distinction between caching (temporary, managed by React Query) and offline support (persistent, managed by Zustand + MMKV)

### Network Handling
- Three network states: `connected`, `disconnected`, `unknown`
- Graceful degradation - shows cached data when available during network determination

## Project Structure

```
src/
├── constants/          # App constants and enums
│   └── screenNames.ts
├── hooks/              # Custom hooks
│   ├── useArticle.ts
│   ├── useArticles.ts
│   ├── useNetworkStatus.ts
│   └── useOfflineQuery.ts
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── screens/            # Screen components
│   ├── ListScreen.tsx
│   └── ListItemScreen.tsx
├── storage/            # Storage configuration
│   └── mmkv.ts
├── store/              # Zustand stores
│   ├── appStateStore.ts
│   └── articlesStore.ts
└── types/              # TypeScript types
    ├── Article.ts
    └── navigation.ts
```

## Setup Instructions

### Prerequisites
- Node.js (v20.9.0 or later)
- React Native development environment set up
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Clone the repository
```bash
git clone git@github.com:trantus/mobile_app_tst.git
cd reactNativeApp
```

2. Install dependencies
```bash
npm install
```

3. Install iOS pods (iOS only)
```bash
cd ios && pod install
```

### Running the App

#### Android
```bash
npx react-native run-android
```

#### iOS
```bash
npx react-native run-ios
```


## Features

- ✅ Display list of articles from API
- ✅ View individual article details
- ✅ Offline support - previously viewed content available offline
- ✅ Data caching with 30-second TTL
- ✅ Network status indicator
- ✅ Loading states and error handling
