import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function FloatingChatbot() {
  const { t, language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: language === 'hi' 
        ? 'नमस्ते! मैं आपकी सहायता के लिए यहां हूं। आप मुझसे कुछ भी पूछ सकते हैं।'
        : language === 'mr'
        ? 'नमस्कार! मी तुमची मदत करण्यासाठी येथे आहे. तुम्ही मला काहीही विचारू शकता.'
        : 'Hello! I\'m here to help you. Ask me anything about farming!',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = language === 'hi' 
    ? ['फसल रोग', 'मौसम', 'उर्वरक सलाह']
    : language === 'mr'
    ? ['पीक रोग', 'हवामान', 'खत सल्ला']
    : ['Crop Diseases', 'Weather', 'Fertilizer Tips'];

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    const responses: Record<string, Record<string, string>> = {
      en: {
        'disease': 'I can help identify crop diseases. Please use the Disease Scanner to upload an image of your crop.',
        'weather': 'Check the Alert Center for current weather conditions and forecasts.',
        'fertilizer': 'For fertilizer recommendations, I suggest using balanced NPK (19:19:19) for most crops. Soil testing is recommended.',
        'default': 'I can help with crop diseases, weather updates, and farming tips. What would you like to know?',
      },
      hi: {
        'disease': 'मैं फसल रोगों की पहचान में मदद कर सकता हूं। कृपया अपनी फसल की तस्वीर अपलोड करने के लिए रोग स्कैनर का उपयोग करें।',
        'weather': 'वर्तमान मौसम की स्थिति और पूर्वानुमान के लिए अलर्ट सेंटर देखें।',
        'fertilizer': 'उर्वरक सिफारिशों के लिए, मैं अधिकांश फसलों के लिए संतुलित NPK (19:19:19) का सुझाव देता हूं।',
        'default': 'मैं फसल रोगों, मौसम अपडेट और खेती युक्तियों में मदद कर सकता हूं। आप क्या जानना चाहेंगे?',
      },
      mr: {
        'disease': 'मी पीक रोग ओळखण्यात मदत करू शकतो. कृपया तुमच्या पिकाचा फोटो अपलोड करण्यासाठी रोग स्कॅनर वापरा.',
        'weather': 'सध्याच्या हवामान स्थिती आणि अंदाजासाठी सूचना केंद्र पहा.',
        'fertilizer': 'खत शिफारशींसाठी, मी बहुतेक पिकांसाठी संतुलित NPK (19:19:19) सुचवितो.',
        'default': 'मी पीक रोग, हवामान अद्यतने आणि शेती टिपांमध्ये मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?',
      },
    };

    const langResponses = responses[language] || responses.en;
    
    for (const [key, response] of Object.entries(langResponses)) {
      if (lowerQuery.includes(key)) {
        return response;
      }
    }
    return langResponses.default;
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: getBotResponse(inputText),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('chatAssistant')}</h3>
                  <p className="text-xs text-green-100">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl p-3 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={t('typeMessage')}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
