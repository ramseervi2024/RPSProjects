# HeritageVastra — Traditional Clothing App

A Royal Rajasthani themed traditional clothing shopping app built with React Native CLI.

## Tech Stack
- **Framework**: React Native CLI
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **Icons**: Lucide React Native
- **State Management**: React Context / Local State
- **Data**: Local Dummy JSON

## Setup Instructions

1.  **Initialize Project** (if not already done):
    ```bash
    npx react-native init HeritageVastra
    ```

2.  **Install Dependencies**:
    ```bash
    npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-svg lucide-react-native
    ```

3.  **iOS Setup** (Mac Only):
    ```bash
    cd ios && pod install && cd ..
    ```

4.  **Run the App**:
    - **Android**:
      ```bash
      npx react-native run-android
      ```
    - **iOS**:
      ```bash
      npx react-native run-ios
      ```

## Features
- **Royal Theme**: Custom gold and royal maroon color palette.
- **Product Catalog**: Browse products by category (Bandhani, Lehenga, etc.).
- **Artisan Showcase**: View profiles of local artisans.
- **Product Details**: Size/Color selection, ratings, and reviews.
- **Cart & Wishlist**: Functional UI for shopping cart and wishlist.

## Color Palette
- **Primary (Gold)**: #C59D5F
- **Secondary (Maroon)**: #4B164C
- **Background**: #0F172A
- **Card Background**: #111827
