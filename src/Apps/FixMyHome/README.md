# FixMyHome - Home Services App

This is a React Native CLI application for a Home Services booking platform.

## Prerequisites

- Node.js
- React Native CLI
- Cocoapods (for iOS)
- Android Studio / Xcode

## Setup Instructions

1.  **Initialize the Project** (if not already done)
    This code was generated assumes a React Native CLI project structure. If you haven't initialized the project yet, run:

    ```bash
    npx react-native init FixMyHome
    ```
    
    *Note: Move the generated `src` folder and `App.js` into the root of your initialized project if you are setting this up manually.*

2.  **Install Dependencies**

    ```bash
    npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-svg lucide-react-native
    ```

3.  **Install iOS Pods**

    ```bash
    cd ios && pod install && cd ..
    ```

4.  **Run the App**

    *Android:*
    ```bash
    npx react-native run-android
    ```

    *iOS:*
    ```bash
    npx react-native run-ios
    ```

## Features

- **Home Screen**: Hero carousel, search, services grid, top providers.
- **Services**: Full list of available home services.
- **Service Details**: Detailed view with price, time, and providers.
- **Booking**: Mock booking flow with date/time selection.
- **My Orders**: List of scheduled/completed bookings.
- **Live Tracking**: Mock map animation for provider tracking.
- **Support**: FAQ and chat interface.

## Tech Stack

- React Native CLI
- React Navigation (Stack + Bottom Tabs)
- Lucide React Native Icons
