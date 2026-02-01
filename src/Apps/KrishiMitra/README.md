# KrishiMitra — Farmer Support App

KrishiMitra is a React Native CLI mobile application designed to assist farmers with daily market prices, weather updates, seed purchasing, and expert advice.

## Tech Stack
- React Native CLI
- React Navigation (Bottom Tabs + Stack)
- Lucide-React-Native Icons
- Pure React State (No Redux)
- Frontend Only (Dummy JSON Data)

## Setup Instructions

1.  **Initialize Project** (if not already done inside a workspace):
    ```bash
    npx react-native init KrishiMitra
    ```

2.  **Install Dependencies**:
    ```bash
    npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack react-native-screens react-native-safe-area-context react-native-svg lucide-react-native
    ```

3.  **Install iOS Pods** (for Mac users):
    ```bash
    cd ios && npx pod-install && cd ..
    ```

4.  **Run the App**:
    - **Android**: `npx react-native run-android`
    - **iOS**: `npx react-native run-ios`

## Project Structure
- `src/data`: Dummy JSON data for app content.
- `src/screens`: Main application screens (Home, Prices, Weather, etc.).
- `src/components`: Reusable UI components (Cards, Header).
- `src/navigation`: Navigation configuration (Tabs, Stack).

## Features
- **Daily Mandi Prices**: View daily crop prices for different markets.
- **Weather Forecast**: 5-day weather forecast with alerts.
- **Seeds Market**: Browse and view details of available seeds.
- **Expert Advice**: Connect with agricultural experts.
- **Farmer Profile**: Manage profile and settings.

## Theme
- **Primary Color**: #16A34A (Green)
- **Background**: #0F172A (Dark Navy)
- **Card Background**: #111827
