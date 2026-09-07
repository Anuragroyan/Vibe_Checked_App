🎨 VibeCheck

VibeCheck is a React Native micro-journaling application that allows users to capture their daily mood using emojis, colors, and short 3-word phrases. It transforms individual mood check-ins into a dynamic Mood Mosaic, providing a simple visual way to reflect on daily emotions while demonstrating modern React Native development practices.

✨ Key Features

* 🎨 Daily mood check-ins
* 😊 Emoji-based mood selection
* 🌈 Color-based mood representation
* 📝 3-word mood journaling
* 🧩 Dynamic Mood Mosaic
* ➕ Create mood entries
* ✏️ Update existing entries
* 🗑️ Delete mood entries
* 🔍 Browse and review previous check-ins
* 🔄 Redux Toolkit state management
* 🎯 Redux selectors for derived state
* 💾 Local data persistence
* 🧭 React Navigation
* 📱 Clean and interactive React Native UI

🏗️ Architecture & Workflow

The application uses Redux Toolkit to manage mood-related application state, with selectors used to efficiently derive and display mood data. Users create daily check-ins containing an emoji, color, and short phrase, which are stored locally and transformed into the visual Mood Mosaic. CRUD operations allow users to maintain their journal entries over time.

🛠️ Tech Stack

React Native • JavaScript • Redux Toolkit • Redux Selectors • React Navigation • Local Storage • CRUD Operations

▶️ Run the App

1. Install dependencies

npm install

2. Start Metro

npm start

3. Run on Android

npm run android

🎯 Project Purpose

This project demonstrates how to build a state-driven React Native application with Redux Toolkit, navigation, CRUD operations, selectors, and local persistence. It provides practical experience in managing structured user-generated data and transforming it into an interactive visual experience.
