# BinGo - Smart Waste Management Application

BinGo is a mobile application built with React Native and Expo that helps users manage and monitor waste bins efficiently.

## Repository Contents

- `BinGoApp/` - Main application directory
  - `app/` - Application screens and components
  - `assets/` - Images, icons, and other static assets
  - `GlobalStyles.ts` - Global styling constants

## Available Pages

1. **Authentication**
   - Login (`/login`)
   - Signup (`/signup`)

2. **Main Pages**
   - Home (`/home`) - Main dashboard with bin cards
   - Home Detail (`/home-detail`) - Detailed view of a specific bin
   - Search (`/search`) - Search for bins
   - Profile (`/profile`) - User profile
   - Settings (`/settings`) - Application settings
   - Notifications (`/notification`) - User notifications

## How to Run

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn
   - Expo CLI (`npm install -g expo-cli`)

2. **Installation**
   ```bash
   # Navigate to the project directory
   cd BinGoApp

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Running the Application**
   ```bash
   # Start the development server
   npm start
   # or
   yarn start
   ```

4. **Testing on Device**
   - Install Expo Go on your mobile device
   - Scan the QR code shown in the terminal or Expo DevTools
   - The app will load on your device

## Development Notes

- The application uses Expo Router for navigation
- Styling is managed through React Native StyleSheet
- Icons are imported as SVG components
- The app follows a consistent color scheme defined in GlobalStyles