import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Send, Volume2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export default function VoiceAssistant() {
  const { t, language } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      text: language === 'hi' 
        ? 'नमस्ते! मैं आपकी कृषि सहायक हूं। आप मुझसे फसलों, बीमारियों, मौसम और खेती से संबंधित कुछ भी पूछ सकते हैं।'
        : language === 'mr'
        ? 'नमस्कार! मी तुमची शेती सहाय्यक आहे. तुम्ही मला पिके, रोग, हवामान आणि शेतीशी संबंधित काहीही विचारू शकता.'
        : 'Hello! I\'m your agriculture assistant. You can ask me anything about crops, diseases, weather, and farming.',
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const mockAIResponses: Record<string, Record<string, string>> = {
    en: {
      'tomato': 'For tomato cultivation, ensure well-drained soil with pH 6.0-7.0. Water regularly and apply balanced NPK fertilizer. Watch for early blight and late blight diseases.',
      'weather': 'Based on current conditions, expect moderate temperatures. Good time for irrigation. Monitor for pest activity in humid conditions.',
      'fertilizer': 'Use balanced NPK fertilizer (19:19:19) for general crops. Apply organic compost for soil health. Conduct soil test for specific recommendations.',
      'pest': 'Common pests include aphids, whiteflies, and caterpillars. Use neem oil spray or IPM techniques. Avoid overuse of chemical pesticides.',
      'default': 'I can help with crop diseases, fertilizer recommendations, weather advice, and pest management. Please ask me specific questions about your crops.',
    },
    hi: {
      'tomato': 'टमाटर की खेती के लिए, 6.0-7.0 pH वाली अच्छी जल निकासी वाली मिट्टी सुनिश्चित करें। नियमित रूप से पानी दें और संतुलित NPK उर्वरक लगाएं।',
      'weather': 'वर्तमान स्थितियों के आधार पर, मध्यम तापमान की उम्मीद है। सिंचाई के लिए अच्छा समय है। नम स्थितियों में कीट गतिविधि पर नज़र रखें।',
      'fertilizer': 'सामान्य फसलों के लिए संतुलित NPK उर्वरक (19:19:19) का उपयोग करें। मिट्टी के स्वास्थ्य के लिए जैविक खाद लगाएं।',
      'pest': 'सामान्य कीटों में एफिड्स, व्हाइटफ्लाई और कैटरपिलर शामिल हैं। नीम तेल स्प्रे या IPM तकनीकों का उपयोग करें।',
      'default': 'मैं फसल रोगों, उर्वरक सिफारिशों, मौसम सलाह और कीट प्रबंधन में मदद कर सकता हूं। कृपया मुझे अपनी फसलों के बारे में विशिष्ट प्रश्न पूछें।',
    },
    mr: {
      'tomato': 'टोमॅटो लागवडीसाठी, 6.0-7.0 pH असलेली चांगली निचरा असलेली माती सुनिश्चित करा. नियमितपणे पाणी द्या आणि संतुलित NPK खत घाला.',
      'weather': 'सध्याच्या परिस्थितीवर आधारित, मध्यम तापमानाची अपेक्षा करा. सिंचनासाठी चांगली वेळ आहे. आर्द्र परिस्थितीत कीटकांच्या हालचालींचे निरीक्षण करा.',
      'fertilizer': 'सामान्य पिकांसाठी संतुलित NPK खत (19:19:19) वापरा. मातीच्या आरोग्यासाठी सेंद्रिय खत घाला.',
      'pest': 'सामान्य कीटकांमध्ये एफिड्स, व्हाइटफ्लाय आणि सुरवंट यांचा समावेश होतो. कडुनिंब तेल स्प्रे किंवा IPM तंत्र वापरा.',
      'default': 'मी पीक रोग, खत शिफारशी, हवामान सल्ला आणि कीटक व्यवस्थापनात मदत करू शकतो. कृपया मला तुमच्या पिकांबद्दल विशिष्ट प्रश्न विचारा.',
    },
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    const responses = mockAIResponses[language] || mockAIResponses.en;
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuery.includes(key)) {
        return response;
      }
    }
    return responses.default;
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    
    // Simulate voice recognition
    setTimeout(() => {
      const sampleQueries = language === 'hi' 
        ? ['टमाटर की खेती कैसे करें?', 'मौसम की जानकारी', 'उर्वरक की सिफारिश']
        : language === 'mr'
        ? ['टोमॅटो लागवड कशी करावी?', 'हवामानाची माहिती', 'खताची शिफारस']
        : ['How to grow tomatoes?', 'Weather information', 'Fertilizer recommendation'];
      
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setTranscript(randomQuery);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
    if (transcript.trim()) {
      sendMessage(transcript);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setTranscript('');
    setIsProcessing(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      text: getAIResponse(text),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsProcessing(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t('voiceAssistantTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('askQuestion')}
          </p>
        </motion.div>

        {/* Chat Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 h-[500px] overflow-y-auto"
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <p className="flex-1">{message.text}</p>
                    {message.type === 'assistant' && (
                      <button
                        onClick={() => speakText(message.text)}
                        className="flex-shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        aria-label="Speak text"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Voice Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl'
              }`}
            >
              {isListening ? (
                <MicOff className="w-10 h-10 text-white" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </motion.button>

            <p className="text-center font-semibold text-gray-900 dark:text-white">
              {isListening ? t('listening') : t('tapToSpeak')}
            </p>

            {/* Live Transcript */}
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-xl p-4"
              >
                <p className="text-gray-900 dark:text-white text-center italic">
                  "{transcript}"
                </p>
              </motion.div>
            )}

            {/* Text Input Alternative */}
            <div className="w-full flex gap-2">
              <input
                type="text"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(transcript)}
                placeholder={t('typeMessage')}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={() => sendMessage(transcript)}
                disabled={!transcript.trim() || isProcessing}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sample Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {(language === 'hi' 
            ? ['टमाटर की खेती कैसे करें?', 'उर्वरक की सिफारिश']
            : language === 'mr'
            ? ['टोमॅटो लागवड कशी करावी?', 'खताची शिफारस']
            : ['How to grow tomatoes?', 'Fertilizer recommendation']
          ).map((question, index) => (
            <button
              key={index}
              onClick={() => sendMessage(question)}
              className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 transition-colors text-left"
            >
              💬 {question}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
