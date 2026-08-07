import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import trCommon from './tr/common.json'
import trAuth from './tr/auth.json'
import trDashboard from './tr/dashboard.json'
import trProducts from './tr/products.json'
import enCommon from './en/common.json'
import enAuth from './en/auth.json'
import enDashboard from './en/dashboard.json'
import enProducts from './en/products.json'
import ruCommon from './ru/common.json'
import ruAuth from './ru/auth.json'
import ruDashboard from './ru/dashboard.json'
import ruProducts from './ru/products.json'

export const defaultNS = 'common'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en', 'ru'],
    ns: ['common', 'auth', 'dashboard', 'products'],
    defaultNS,
    // Tarayıcı/işletim sistemi dili dikkate alınmaz; yalnızca kullanıcının
    // daha önce açıkça seçtiği dil (localStorage) hatırlanır, aksi halde tr kullanılır.
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    resources: {
      tr: { common: trCommon, auth: trAuth, dashboard: trDashboard, products: trProducts },
      en: { common: enCommon, auth: enAuth, dashboard: enDashboard, products: enProducts },
      ru: { common: ruCommon, auth: ruAuth, dashboard: ruDashboard, products: ruProducts },
    },
    interpolation: { escapeValue: false },
  })

export default i18n
