# CrowdCounter Microbit - Replit Configuration

## Overview

CrowdCounter Microbit is an AI-powered people counting Android application that uses real-time computer vision to detect and count people through the device camera. The app integrates with micro:bit devices via Bluetooth Low Energy (BLE) to send count updates and overcrowding alerts. Built with React, TensorFlow.js, and Capacitor, it provides configurable sampling intervals, detection thresholds, history tracking, and CSV export capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack**
- **React 19** with TypeScript for UI components and state management
- **Vite** as the build tool and development server
- **TailwindCSS** for utility-first styling
- Component-based architecture with clear separation of concerns

**Component Structure**
The application follows a modular component design:
- `App.tsx` - Main application container managing global state and orchestrating all features
- `CameraPreview.tsx` - Video display with optional debug overlay for bounding boxes
- `CountDisplay.tsx` - Visual counter with alert state indication
- `ControlPanel.tsx` - Settings interface for intervals, thresholds, and BLE connection
- `HistoryLog.tsx` - Detection history display with export and clear functionality
- `DebugPanel.tsx` - Real-time diagnostic information panel

**Custom Hooks Pattern**
Business logic is encapsulated in custom React hooks for reusability:
- `useCamera.ts` - Camera stream management and permissions
- `useAIDetection.ts` - TensorFlow.js model loading and people detection
- `useBLE.ts` - Bluetooth LE connection and communication with micro:bit

### Mobile Architecture

**Capacitor Native Integration**
- **Capacitor 6** bridges web code to native Android functionality
- Native plugins provide camera access, BLE communication, file system operations, and local storage
- Build target: Android (API level 33)
- App ID: `com.crowdcounter.microbit`

**Camera Integration**
- Uses browser MediaDevices API (`getUserMedia`) for video streaming
- Configurable frame capture intervals (1-10 seconds)
- Environment-facing camera mode by default

**State Persistence**
- Capacitor Preferences API for local key-value storage
- Saves user settings (sampling interval, alert threshold, debug mode)
- Stores detection history for later retrieval and export

### AI/ML Architecture

**TensorFlow.js Integration**
- **Model**: COCO-SSD (Common Objects in Context - Single Shot Detector)
- Detects 90 object classes, filtered to only count "person" class
- Backend strategy: WebGL preferred, fallback to CPU if WebGL fails
- Returns predictions with bounding boxes, class labels, and confidence scores

**Detection Pipeline**
1. Video element captured at configurable intervals
2. Frame passed to COCO-SSD model
3. Predictions filtered for "person" class only
4. Results formatted with count, bounding boxes, and timestamp
5. Detection triggers BLE message transmission

**Error Handling**
- Try-catch wrapper around detection calls
- Graceful degradation from WebGL to CPU backend
- Null return on detection failures to prevent crashes

### Bluetooth Low Energy (BLE)

**micro:bit UART Protocol**
- Service UUID: `6e400001-b5a3-f393-e0a9-e50e24dcca9e`
- TX Characteristic UUID: `6e400002-b5a3-f393-e0a9-e50e24dcca9e`
- Message format: Plain text with newline termination

**Communication Protocol**
- `COUNT:<n>\n` - Sent after each detection with person count
- `ALERT:OVERCROWD\n` - Sent when count exceeds configured threshold
- Device discovery via service filtering
- Connection state tracking with disconnect callbacks

**Plugin**: `@capacitor-community/bluetooth-le` for cross-platform BLE support

### Data Management

**Local Storage Schema**
- **Settings**: JSON object with `samplingInterval`, `alertThreshold`, `debugMode`
- **History**: Array of `HistoryEntry` objects with `count`, `timestamp`, `alert` boolean

**Export Functionality**
- CSV generation from history entries
- Format: `Timestamp,Count,Alert Status`
- Uses Capacitor Filesystem API for file operations

### Type System

**TypeScript Interfaces**
- `DetectionResult` - AI detection output with predictions array
- `HistoryEntry` - Historical detection record
- `Settings` - User configuration object
- `BLEState` - Bluetooth connection state

Strict TypeScript configuration enforces type safety across the application.

## External Dependencies

### AI/ML Services
- **TensorFlow.js** (`@tensorflow/tfjs` v4.20.0) - WebGL/CPU-based inference engine
- **COCO-SSD Model** (`@tensorflow-models/coco-ssd` v2.2.3) - Pre-trained object detection model

### Native Mobile Capabilities
- **Capacitor Core** (`@capacitor/core` v6.0.0) - Web-to-native bridge
- **Capacitor Camera** (`@capacitor/camera` v6.0.0) - Camera permissions and access
- **Capacitor Filesystem** (`@capacitor/filesystem` v6.0.0) - File read/write operations
- **Capacitor Preferences** (`@capacitor/preferences` v6.0.0) - Key-value local storage
- **Capacitor Bluetooth LE** (`@capacitor-community/bluetooth-le` v6.0.1) - BLE communication

### Hardware Integration
- **micro:bit** - External device receiving count data via BLE UART service
- Communication is one-way (app sends to micro:bit)

### Build Tools
- **Vite** - Development server and production bundler
- **TypeScript** - Static type checking
- **ESLint** - Code quality and consistency
- **TailwindCSS + PostCSS + Autoprefixer** - Styling pipeline

### Development Environment Requirements
- Node.js 18+
- Java Development Kit (JDK) 17
- Android SDK (API level 33)
- Android Studio (optional, for emulator testing)

### Browser APIs
- **MediaDevices.getUserMedia** - Camera stream access
- **Canvas API** - Bounding box rendering in debug mode