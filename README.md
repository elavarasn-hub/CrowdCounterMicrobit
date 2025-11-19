# 🚶 CrowdCounter Microbit

AI-powered people counting Android app with micro:bit BLE integration.

## Features

- **Real-time Person Detection**: Uses TensorFlow.js COCO-SSD model to detect and count people through camera
- **Camera Integration**: Live camera preview with configurable frame capture intervals (1-10 seconds)
- **BLE Communication**: Connects to micro:bit via Bluetooth LE UART service
  - Sends `COUNT:<n>` messages on each detection
  - Sends `ALERT:OVERCROWD` when threshold exceeded
- **Configurable Settings**:
  - Sampling interval slider (1-10 seconds)
  - Alert threshold slider (1-50 people)
  - Debug mode toggle with bounding box overlay
- **History & Analytics**:
  - Local storage of detection history
  - CSV export functionality
  - Visual history log with timestamp and alert status
- **Debug Panel**: Real-time information about AI model status, camera status, and detection details

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Mobile**: Capacitor for native Android build
- **AI/ML**: TensorFlow.js + COCO-SSD
- **Styling**: TailwindCSS
- **BLE**: Capacitor Community Bluetooth LE plugin
- **Storage**: Capacitor Preferences API

## Prerequisites

- Node.js 18+ and npm
- Java Development Kit (JDK) 17
- Android SDK (API level 33)
- Android Studio (recommended for testing on emulator)

## Local Development Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd crowdcounter-microbit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

The app will be available at `http://localhost:5000`

> **Note**: The AI model and BLE features work best when running on an actual Android device.

## Building for Android

### Option 1: Build Locally

#### 1. Build the web app

```bash
npm run build
```

#### 2. Add Android platform (first time only)

```bash
npx cap add android
```

#### 3. Sync Capacitor

```bash
npm run cap:sync
```

#### 4. Open in Android Studio

```bash
npm run cap:open
```

Then use Android Studio to build and run the APK.

#### 5. Build APK via Gradle (command line)

```bash
cd android
chmod +x ./gradlew
./gradlew assembleDebug
```

The APK will be located at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option 2: Build via GitHub Actions (Recommended)

This project includes a GitHub Actions workflow that automatically builds the Android APK.

#### 1. Push your code to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. GitHub Actions will automatically:

- Install Node.js 18
- Install Android SDK (API 33)
- Install dependencies
- Build the web app
- Add Android platform
- Build debug APK using Gradle

#### 3. Download the APK

1. Go to your GitHub repository
2. Click on "Actions" tab
3. Select the latest workflow run
4. Download the `app-debug` artifact
5. Extract the APK from the zip file
6. Transfer to your Android device and install

## Project Structure

```
/
├── src/
│   ├── hooks/
│   │   ├── useCamera.ts          # Camera capture logic
│   │   ├── useAIDetection.ts     # TensorFlow.js AI detection
│   │   └── useBLE.ts             # Bluetooth LE communication
│   ├── components/
│   │   ├── CameraPreview.tsx     # Live camera view with overlays
│   │   ├── ControlPanel.tsx      # Settings and controls
│   │   ├── CountDisplay.tsx      # Current count display
│   │   ├── HistoryLog.tsx        # Detection history table
│   │   └── DebugPanel.tsx        # Debug information
│   ├── types.ts                  # TypeScript type definitions
│   ├── App.tsx                   # Main application component
│   └── main.tsx                  # Application entry point
├── capacitor.config.ts           # Capacitor configuration
├── vite.config.ts                # Vite build configuration
├── tailwind.config.js            # TailwindCSS configuration
└── .github/workflows/
    └── build-apk.yml             # GitHub Actions workflow
```

## Usage

### 1. Start Detection

1. Open the app on your Android device
2. Grant camera permissions when prompted
3. Click "Start Detection" button
4. The app will capture frames at the configured interval (default 5s)
5. Detected people will be counted and displayed

### 2. Connect to micro:bit

1. Flash your micro:bit with BLE UART service code
2. Click "Connect to micro:bit" in the app
3. Select your micro:bit device from the list
4. Once connected, the app will send:
   - `COUNT:<n>\n` on each detection
   - `ALERT:OVERCROWD\n` when count exceeds threshold

### 3. Adjust Settings

- **Sampling Interval**: Change how often frames are captured (1-10 seconds)
- **Alert Threshold**: Set the maximum people count before triggering alerts
- **Debug Mode**: Enable to see bounding boxes around detected people

### 4. View History

- All detections are logged with timestamp and alert status
- Export history as CSV for further analysis
- Clear history to start fresh

## Error Handling

The app includes robust error handling:

- **WebGL Fallback**: If WebGL fails, automatically falls back to CPU backend
- **Detection Safety**: All detection calls wrapped in try/catch
- **BLE Error Messages**: Clear status messages for connection issues
- **Camera Permissions**: Graceful handling of denied permissions

## Permissions Required

The app requires the following Android permissions:

- **Camera**: For capturing video frames
- **Bluetooth**: For connecting to micro:bit
- **Bluetooth Scan/Connect**: For BLE device discovery

## Troubleshooting

### Camera not working
- Ensure camera permissions are granted
- Try restarting the app
- Check if another app is using the camera

### BLE connection fails
- Ensure Bluetooth is enabled on your device
- Make sure your micro:bit is powered on and nearby
- Check that the micro:bit is running BLE UART service code

### AI model loading slowly
- First load downloads the model (~10MB)
- Subsequent loads use cached model
- Slow networks may affect initial load time

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - See LICENSE file for details

## Acknowledgments

- TensorFlow.js team for COCO-SSD model
- Capacitor team for excellent native bridge
- micro:bit community for BLE documentation
