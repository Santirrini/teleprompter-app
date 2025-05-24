# My Teleprompter App

A React Native application for recording videos and audio while reading from a scrolling teleprompter.

## Features

- 📱 Cross-platform (iOS & Android)
- 🎥 Video recording with teleprompter overlay
- 🎤 Audio-only recording mode
- 📝 Script input and management
- ⚡ Adjustable scroll speed and font size
- 💾 Recording management (save, rename, delete)
- 👤 User authentication
- 🎨 Dark theme UI

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Install iOS dependencies (iOS only):
   \`\`\`bash
   cd ios && pod install
   \`\`\`
4. Run the app:
   \`\`\`bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   \`\`\`

## Project Structure

\`\`\`
src/
├── assets/                 # Images, fonts, etc.
├── components/             # Reusable components
│   ├── Auth/              # Authentication components
│   ├── Common/            # Generic components (buttons, inputs)
│   ├── Teleprompter/      # Teleprompter specific components
│   └── MyRecordings/      # Recording list components
├── contexts/              # React Context providers
├── navigation/            # Navigation configuration
├── screens/               # Screen components
│   ├── Auth/              # Authentication screens
│   └── AppCore/           # Main app screens
├── services/              # Business logic and API calls
├── styles/                # Global styles and themes
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
\`\`\`

## Key Components

### Screens
- **LoginScreen**: User authentication
- **WelcomeScreen**: Mode selection (video/audio)
- **ScriptInputScreen**: Text input for teleprompter
- **RecordingScreen**: Main recording interface with teleprompter
- **ReviewScreen**: Playback and save recorded content
- **MyRecordingsScreen**: Manage saved recordings

### Services
- **authService**: Handle user authentication
- **recordingService**: Manage recording operations

## Dependencies

- React Native 0.72+
- React Navigation 6+
- React Native Camera
- React Native Video
- React Native Vector Icons
- AsyncStorage

## Permissions

The app requires the following permissions:
- Camera (for video recording)
- Microphone (for audio recording)
- Storage (for saving recordings)

## Development Notes

- Uses TypeScript for type safety
- Implements dark theme throughout
- Modular component architecture
- Context API for state management
- AsyncStorage for local data persistence

## Future Enhancements

- Cloud storage integration
- Voice-controlled teleprompter scrolling
- Advanced video editing features
- Social sharing capabilities
- Multiple script templates
