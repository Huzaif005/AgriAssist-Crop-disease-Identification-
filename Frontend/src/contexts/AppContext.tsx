import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'mr';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isOnline: boolean;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    dashboard: 'Dashboard',
    diseaseScanner: 'Disease Scanner',
    voiceAssistant: 'Voice Assistant',
    reports: 'Reports',
    alerts: 'Alerts',
    settings: 'Settings',
    
    // Landing Page
    heroTitle: 'AI-Powered Smart Agriculture Assistant',
    heroSubtitle: 'Detect crop diseases instantly, get expert advice, and protect your harvest with intelligent farming solutions',
    startScan: 'Start Scan',
    uploadImage: 'Upload Crop Image',
    voiceAssist: 'Voice Assist',
    
    // Features
    features: 'Features',
    diseaseDetection: 'Disease Detection',
    diseaseDetectionDesc: 'AI-powered instant disease identification from crop images',
    voiceSupport: 'Voice Support',
    voiceSupportDesc: 'Ask questions in your language and get instant answers',
    smartAlerts: 'Smart Alerts',
    smartAlertsDesc: 'Get timely alerts about weather, diseases, and irrigation',
    expertAdvice: 'Expert Advice',
    expertAdviceDesc: 'Personalized treatment and prevention recommendations',
    
    // Disease Scanner
    uploadCropImage: 'Upload Crop Image',
    dragDrop: 'Drag & drop an image here, or click to select',
    takePhoto: 'Take Photo',
    predict: 'Analyze Disease',
    analyzing: 'Analyzing...',
    results: 'Results',
    diseaseName: 'Disease',
    confidence: 'Confidence',
    severity: 'Severity',
    treatment: 'Treatment',
    prevention: 'Prevention',
    findNearbyHelp: 'Find Nearby Agriculture Centers',
    
    // Voice Assistant
    voiceAssistantTitle: 'Voice Assistant',
    tapToSpeak: 'Tap to Speak',
    listening: 'Listening...',
    askQuestion: 'Ask me anything about farming...',
    
    // SMS Alerts
    smsAlerts: 'SMS Crop Alerts',
    phoneNumber: 'Phone Number',
    subscribe: 'Subscribe to Alerts',
    subscribed: 'Subscribed Successfully',
    
    // Dashboard
    welcomeBack: 'Welcome Back',
    recentScans: 'Recent Scans',
    cropHealth: 'Crop Health Overview',
    quickActions: 'Quick Actions',
    healthScore: 'Health Score',
    scansToday: 'Scans Today',
    activeAlerts: 'Active Alerts',
    
    // Reports
    reportsHistory: 'Reports & History',
    filterByDate: 'Filter by Date',
    filterByCrop: 'Filter by Crop',
    viewDetails: 'View Details',
    
    // Alerts
    alertCenter: 'Alert Center',
    weatherRisk: 'Weather Risk',
    diseaseOutbreak: 'Disease Outbreak',
    irrigationSuggestion: 'Irrigation Suggestion',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    
    // Chatbot
    chatAssistant: 'Chat Assistant',
    typeMessage: 'Type your message...',
    
    // Settings
    settingsTitle: 'Settings',
    languageSettings: 'Language',
    themeSettings: 'Theme',
    notifications: 'Notifications',
    profile: 'Profile',
    
    // Common
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    offline: 'Offline Mode',
    online: 'Online',
  },
  hi: {
    // Navbar
    dashboard: 'डैशबोर्ड',
    diseaseScanner: 'रोग स्कैनर',
    voiceAssistant: 'वॉयस असिस्टेंट',
    reports: 'रिपोर्ट',
    alerts: 'अलर्ट',
    settings: 'सेटिंग',
    
    // Landing Page
    heroTitle: 'एआई-संचालित स्मार्ट कृषि सहायक',
    heroSubtitle: 'फसल रोगों की तुरंत पहचान करें, विशेषज्ञ सलाह पाएं और बुद्धिमान खेती समाधानों से अपनी फसल की रक्षा करें',
    startScan: 'स्कैन शुरू करें',
    uploadImage: 'फसल की तस्वीर अपलोड करें',
    voiceAssist: 'वॉयस सहायता',
    
    // Features
    features: 'विशेषताएं',
    diseaseDetection: 'रोग का पता लगाना',
    diseaseDetectionDesc: 'फसल की तस्वीरों से एआई-संचालित तत्काल रोग पहचान',
    voiceSupport: 'वॉयस सपोर्ट',
    voiceSupportDesc: 'अपनी भाषा में सवाल पूछें और तुरंत जवाब पाएं',
    smartAlerts: 'स्मार्ट अलर्ट',
    smartAlertsDesc: 'मौसम, रोग और सिंचाई के बारे में समय पर अलर्ट पाएं',
    expertAdvice: 'विशेषज्ञ सलाह',
    expertAdviceDesc: 'व्यक्तिगत उपचार और रोकथाम की सिफारिशें',
    
    // Disease Scanner
    uploadCropImage: 'फसल की तस्वीर अपलोड करें',
    dragDrop: 'यहाँ एक तस्वीर खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
    takePhoto: 'फोटो लें',
    predict: 'रोग का विश्लेषण करें',
    analyzing: 'विश्लेषण कर रहे हैं...',
    results: 'परिणाम',
    diseaseName: 'रोग',
    confidence: 'विश्वास',
    severity: 'गंभीरता',
    treatment: 'उपचार',
    prevention: 'रोकथाम',
    findNearbyHelp: 'निकटतम कृषि केंद्र खोजें',
    
    // Voice Assistant
    voiceAssistantTitle: 'वॉयस असिस्टेंट',
    tapToSpeak: 'बोलने के लिए टैप करें',
    listening: 'सुन रहे हैं...',
    askQuestion: 'खेती के बारे में मुझसे कुछ भी पूछें...',
    
    // SMS Alerts
    smsAlerts: 'एसएमएस फसल अलर्ट',
    phoneNumber: 'फ़ोन नंबर',
    subscribe: 'अलर्ट की सदस्यता लें',
    subscribed: 'सफलतापूर्वक सदस्यता ली गई',
    
    // Dashboard
    welcomeBack: 'वापसी पर स्वागत है',
    recentScans: 'हाल की स्कैन',
    cropHealth: 'फसल स्वास्थ्य अवलोकन',
    quickActions: 'त्वरित क्रियाएं',
    healthScore: 'स्वास्थ्य स्कोर',
    scansToday: 'आज की स्कैन',
    activeAlerts: 'सक्रिय अलर्ट',
    
    // Reports
    reportsHistory: 'रिपोर्ट और इतिहास',
    filterByDate: 'तारीख के अनुसार फ़िल्टर करें',
    filterByCrop: 'फसल के अनुसार फ़िल्टर करें',
    viewDetails: 'विवरण देखें',
    
    // Alerts
    alertCenter: 'अलर्ट सेंटर',
    weatherRisk: 'मौसम जोखिम',
    diseaseOutbreak: 'रोग का प्रकोप',
    irrigationSuggestion: 'सिंचाई सुझाव',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कम',
    
    // Chatbot
    chatAssistant: 'चैट असिस्टेंट',
    typeMessage: 'अपना संदेश टाइप करें...',
    
    // Settings
    settingsTitle: 'सेटिंग',
    languageSettings: 'भाषा',
    themeSettings: 'थीम',
    notifications: 'सूचनाएं',
    profile: 'प्रोफ़ाइल',
    
    // Common
    close: 'बंद करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    offline: 'ऑफ़लाइन मोड',
    online: 'ऑनलाइन',
  },
  mr: {
    // Navbar
    dashboard: 'डॅशबोर्ड',
    diseaseScanner: 'रोग स्कॅनर',
    voiceAssistant: 'व्हॉइस असिस्टंट',
    reports: 'अहवाल',
    alerts: 'सूचना',
    settings: 'सेटिंग्ज',
    
    // Landing Page
    heroTitle: 'एआय-चालित स्मार्ट शेती सहाय्यक',
    heroSubtitle: 'पीक रोगांची त्वरित ओळख करा, तज्ञ सल्ला घ्या आणि बुद्धिमान शेती उपायांसह आपल्या पिकाचे संरक्षण करा',
    startScan: 'स्कॅन सुरू करा',
    uploadImage: 'पीक प्रतिमा अपलोड करा',
    voiceAssist: 'व्हॉइस सहाय्य',
    
    // Features
    features: 'वैशिष्ट्ये',
    diseaseDetection: 'रोग शोध',
    diseaseDetectionDesc: 'पीक प्रतिमांमधून एआय-चालित त्वरित रोग ओळख',
    voiceSupport: 'व्हॉइस सपोर्ट',
    voiceSupportDesc: 'तुमच्या भाषेत प्रश्न विचारा आणि त्वरित उत्तरे मिळवा',
    smartAlerts: 'स्मार्ट सूचना',
    smartAlertsDesc: 'हवामान, रोग आणि सिंचन बद्दल वेळेवर सूचना मिळवा',
    expertAdvice: 'तज्ञ सल्ला',
    expertAdviceDesc: 'वैयक्तिक उपचार आणि प्रतिबंध शिफारसी',
    
    // Disease Scanner
    uploadCropImage: 'पीक प्रतिमा अपलोड करा',
    dragDrop: 'येथे एक प्रतिमा ड्रॅग आणि ड्रॉप करा किंवा निवडण्यासाठी क्लिक करा',
    takePhoto: 'फोटो घ्या',
    predict: 'रोगाचे विश्लेषण करा',
    analyzing: 'विश्लेषण करत आहे...',
    results: 'परिणाम',
    diseaseName: 'रोग',
    confidence: 'आत्मविश्वास',
    severity: 'तीव्रता',
    treatment: 'उपचार',
    prevention: 'प्रतिबंध',
    findNearbyHelp: 'जवळपासची शेती केंद्रे शोधा',
    
    // Voice Assistant
    voiceAssistantTitle: 'व्हॉइस असिस्टंट',
    tapToSpeak: 'बोलण्यासाठी टॅप करा',
    listening: 'ऐकत आहे...',
    askQuestion: 'शेतीबद्दल मला काहीही विचारा...',
    
    // SMS Alerts
    smsAlerts: 'एसएमएस पीक सूचना',
    phoneNumber: 'फोन नंबर',
    subscribe: 'सूचनांची सदस्यता घ्या',
    subscribed: 'यशस्वीरित्या सदस्यता घेतली',
    
    // Dashboard
    welcomeBack: 'पुन्हा स्वागत आहे',
    recentScans: 'अलीकडील स्कॅन',
    cropHealth: 'पीक आरोग्य विहंगावलोकन',
    quickActions: 'त्वरित क्रिया',
    healthScore: 'आरोग्य स्कोअर',
    scansToday: 'आजचे स्कॅन',
    activeAlerts: 'सक्रिय सूचना',
    
    // Reports
    reportsHistory: 'अहवाल आणि इतिहास',
    filterByDate: 'तारखेनुसार फिल्टर करा',
    filterByCrop: 'पिकानुसार फिल्टर करा',
    viewDetails: 'तपशील पहा',
    
    // Alerts
    alertCenter: 'सूचना केंद्र',
    weatherRisk: 'हवामान धोका',
    diseaseOutbreak: 'रोगाचा उद्रेक',
    irrigationSuggestion: 'सिंचन सूचना',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कमी',
    
    // Chatbot
    chatAssistant: 'चॅट असिस्टंट',
    typeMessage: 'तुमचा संदेश टाइप करा...',
    
    // Settings
    settingsTitle: 'सेटिंग्ज',
    languageSettings: 'भाषा',
    themeSettings: 'थीम',
    notifications: 'सूचना',
    profile: 'प्रोफाइल',
    
    // Common
    close: 'बंद करा',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    loading: 'लोड होत आहे...',
    error: 'त्रुटी',
    success: 'यश',
    offline: 'ऑफलाइन मोड',
    online: 'ऑनलाइन',
  },
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, isOnline, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
