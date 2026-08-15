import React, { useState, createContext, useContext, useEffect } from 'react';
import { translations, languages } from '../translations';
import { updateProfile } from '../services/api';

const TranslationContext = createContext();

export const speechLocales = {
  EN: 'en-IN',
  HI: 'hi-IN',
  TE: 'te-IN',
  TA: 'ta-IN',
  KA: 'kn-IN',
  ML: 'ml-IN',
  MR: 'mr-IN',
  GU: 'gu-IN',
  BN: 'bn-IN',
  PA: 'pa-IN',
  OR: 'or-IN'
};

export function TranslationProvider({ children, initialLanguage = 'EN', userToken }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('schemesathi_lang') || initialLanguage || 'EN';
  });

  const changeLanguage = async (newLang) => {
    if (!translations[newLang]) return;
    setLangState(newLang);
    localStorage.setItem('schemesathi_lang', newLang);

    // Sync preferredLanguage to backend API if token exists
    const token = localStorage.getItem('token');
    if (token || userToken) {
      try {
        await updateProfile({ preferredLanguage: newLang });
      } catch (err) {
        console.warn("Could not sync preferred language to server profile:", err);
      }
    }
  };

  const t = (key, fallbackText = '') => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    if (translations.EN && translations.EN[key]) {
      return translations.EN[key];
    }
    return fallbackText || key;
  };

  const currentSpeechLocale = speechLocales[lang] || 'en-IN';

  return (
    <TranslationContext.Provider value={{ lang, setLang: changeLanguage, t, languages, currentSpeechLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
