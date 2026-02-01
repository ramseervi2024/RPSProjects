# DreamShotsStudio

DreamShotsStudio is a premium photography booking mobile app built with React Native.

## Features
- **Dark Premium Theme**: Gold and Navy aesthetics.
- **Browse Photographers**: Filter by category (Wedding, Events, etc.).
- **View Portfolios**: High-quality image galleries.
- **Book Sessions**: Mock booking flow with date selection.
- **Chat**: Simulate conversations with photographers.

## Tech Stack
- React Native CLI
- React Navigation (Stack + Bottom Tabs)
- Lucide React Native Icons

## Getting Started

### Prerequisites
- Node.js & Watchman
- XCode (for iOS) or Android Studio (for Android)

### Installation

1. **Initialize the project** (if not already done):
   ```bash
   npx react-native init DreamShotsStudio
   ```

2. **Install Dependencies**:
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context lucide-react-native react-native-svg
   ```

3. **Install Pods (iOS only)**:
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the App**:
   - iOS:
     ```bash
     npx react-native run-ios
     ```
   - Android:
     ```bash
     npx react-native run-android
     ```

## Project Structure
- `src/data`: Dummy data for photographers.
- `src/screens`: Application screens.
- `src/components`: Reusable UI components.
- `src/navigation`: Navigation setup.
