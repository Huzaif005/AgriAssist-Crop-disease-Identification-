# 🌾 AgriAssist - AI-Powered Smart Agriculture Assistant

A modern, responsive, and user-friendly web application designed to help farmers detect crop diseases, get expert advice, and make informed farming decisions using AI technology.

## ✨ Features

### 🏠 Landing Page
- Attractive hero section with agriculture theme
- Feature highlights and call-to-action buttons
- Smooth animations and modern card layouts
- Farmer-friendly UI with green and earthy tones

### 🔬 Disease Prediction Module
- Drag-and-drop or camera-based image upload
- AI-powered disease detection with confidence scores
- Detailed treatment and prevention recommendations
- Severity level indicators (Low, Medium, High)
- Google Maps integration for nearby agriculture centers

### 🎤 Voice Assistant
- Voice input with live transcription
- Multilingual support (English, Hindi, Marathi)
- Chat-style interface with quick replies
- Text-to-speech functionality
- Context-aware AI responses

### 📊 Dashboard
- Real-time crop health metrics
- Interactive charts and graphs (Line, Bar, Pie charts)
- Recent scan history
- Quick action buttons
- Disease statistics visualization

### 📱 SMS Crop Alert System
- Phone number subscription for SMS alerts
- Weather risk notifications
- Disease outbreak warnings
- Irrigation suggestions
- Priority-based alert system

### 📈 Reports & History
- Comprehensive scan history
- Advanced filtering (by date, crop type)
- Detailed report views
- Export functionality
- Search capability

### 🔔 Alert Center
- Weather forecasts (7-day)
- Real-time alerts with priority levels
- Action recommendations
- SMS subscription management
- Alert categorization

### ⚙️ Settings
- Profile management
- Language selection (EN/HI/MR)
- Dark/Light theme toggle
- Notification preferences
- PWA installation option

### 💬 Floating Chatbot
- Always-available chat assistant
- Context-aware responses
- Quick reply suggestions
- Message history

### 🌐 Additional Features
- **Offline Mode**: Indicator when internet is unavailable
- **PWA Support**: Install as mobile/desktop app
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Multilingual**: Full support for English, Hindi, and Marathi
- **Toast Notifications**: Success, error, warning, and info messages
- **Dark Mode**: System preference detection with manual toggle

## 🛠️ Tech Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API

## 🚀 Mock API Integration

The application includes mock API responses for demonstration:

- **Disease Detection**: Simulated AI analysis with realistic results
- **Voice Assistant**: Rule-based response system
- **Weather Data**: Static 7-day forecast
- **Alerts**: Pre-populated sample alerts

### Converting to Real API

To integrate with real backend APIs:

1. **Disease Detection**: Replace mock analysis in `DiseaseScanner.tsx`
```typescript
// Replace this:
const mockResult: PredictionResult = { ... }

// With actual API call:
const response = await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  body: formData
});
const result = await response.json();
```

2. **Voice Assistant**: Integrate with speech recognition API
3. **SMS Alerts**: Connect to SMS gateway service
4. **Weather Data**: Use weather API (OpenWeatherMap, etc.)

## 📱 Progressive Web App (PWA)

The app supports PWA features:
- Add to home screen
- Offline functionality
- Push notifications (configurable)
- Fast loading with caching

## 🎨 Theme Colors

- Primary Green: `#10b981` (Emerald-500)
- Secondary: `#059669` (Emerald-600)
- Accent: Various earth tones
- Dark mode: Full support with Tailwind dark: classes

## 🌍 Languages Supported

- **English** (EN)
- **हिंदी** (Hindi - HI)
- **मराठी** (Marathi - MR)

## 📂 Project Structure

```
/
├── components/
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DiseaseScanner.tsx
│   │   ├── VoiceAssistant.tsx
│   │   ├── ReportsHistory.tsx
│   │   ├── AlertCenter.tsx
│   │   └── Settings.tsx
│   ├── Navbar.tsx
│   ├── FloatingChatbot.tsx
│   └── OfflineIndicator.tsx
├── contexts/
│   ├── AppContext.tsx
│   └── ToastContext.tsx
├── styles/
│   └── globals.css
├── public/
│   └── manifest.json
└── App.tsx
```

## 🔧 Customization

### Adding More Diseases
Edit the mock responses in `DiseaseScanner.tsx` to include more disease types.

### Adding More Languages
Update `translations` object in `AppContext.tsx`:
```typescript
const translations: Record<Language, Record<string, string>> = {
  // Add your language here
}
```

### Changing Theme Colors
Modify Tailwind classes or update `globals.css` color variables.

## 📝 Notes

- All data is currently stored in component state (client-side only)
- For production, implement proper backend with database
- API keys should be stored securely (environment variables)
- Image uploads are processed client-side (base64)
- SMS functionality requires SMS gateway integration

## 🎯 Future Enhancements

- Real-time weather API integration
- User authentication and profiles
- Database for report persistence
- Advanced analytics and insights
- Community forum for farmers
- Marketplace integration
- Crop price tracking
- Soil health monitoring

## 👨‍🌾 Built For Farmers

This application is designed with farmers in mind:
- Simple, intuitive interface
- Large buttons and clear text
- Visual indicators and icons
- Voice support for low-literacy users
- Multilingual support for local languages
- Offline functionality for remote areas

---

**Made with ❤️ for the Farming Community**
