# BinGo Mobile Application

A React Native/Expo mobile application built with TypeScript, featuring a modern UI and comprehensive user management system.

## Features

- 🔐 Authentication System
  - User login and signup
  - Secure logout functionality
  - Account management and deletion
- 🏠 Home Screen
  - Main feed with detailed view
  - Interactive content display
- 🔍 Search Functionality
  - Advanced search capabilities
  - Filtered results
- 👤 User Profile
  - Profile management
  - User settings
- 🔔 Notifications
  - Real-time notifications
  - Notification preferences
- ⚙️ Settings
  - Application preferences
  - User preferences

## Tech Stack

- React Native / Expo
- TypeScript
- Expo Router for navigation
- React Navigation
- Various Expo modules:
  - expo-blur
  - expo-haptics
  - expo-image
  - expo-linking
  - And more...

## Project Structure

```
├── app/                    # Main application code
│   ├── (tabs)/            # Tab-based navigation
│   ├── home.tsx           # Home screen
│   ├── home-detail.tsx    # Detailed view
│   ├── profile.tsx        # User profile
│   ├── login.tsx          # Authentication
│   ├── signup.tsx         # User registration
│   └── ...                # Other screens
├── components/            # Reusable components
├── hooks/                # Custom React hooks
├── constants/            # Application constants
├── assets/              # Static assets
└── lib/                 # Utility functions
```

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the development server
   ```bash
   npx expo start
   ```

3. Choose your platform:
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web
   - Scan QR code with Expo Go app

## Development

- The project uses file-based routing with Expo Router
- TypeScript for type safety
- ESLint for code quality
- Follows modern React Native best practices

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the Android app
- `npm run ios` - Start the iOS app
- `npm run web` - Start the web app
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset the project to a clean state

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is private and proprietary.
