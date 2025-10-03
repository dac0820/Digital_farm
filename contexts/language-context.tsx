"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "en" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: any
}

const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.register": "Register",
    "nav.monitoring": "Monitoring",
    "nav.advisory": "AI Advisory",
    "nav.assistant": "AI Assistant",
    "nav.weather": "Weather",
    "nav.reports": "Reports",
    "nav.verification": "Verification",
    "nav.admin": "Admin",

    // Dashboard
    "dashboard.title": "Farm Dashboard",
    "dashboard.subtitle": "Monitor your farm's performance and sustainability metrics",
    "dashboard.totalFarmers": "Total Farmers",
    "dashboard.waterUsage": "Water Usage",
    "dashboard.co2Emissions": "CO₂ Emissions",
    "dashboard.cropYield": "Crop Yield",
    "dashboard.lastUpdated": "Last updated: Today",
    "dashboard.premium": "Premium",

    // Features
    "feature.farmerRegistration": "Farmer Registration",
    "feature.farmerRegistration.desc": "Simple two-step registration process for farmers to join the platform",
    "feature.activityMonitoring": "Activity Monitoring",
    "feature.activityMonitoring.desc": "Log farm activities and track crop progress with satellite data",
    "feature.aiCropAdvisory": "AI Crop Advisory",
    "feature.aiCropAdvisory.desc": "Get personalized crop recommendations with MRV insights",
    "feature.weatherUpdates": "Weather Updates",
    "feature.weatherUpdates.desc": "Real-time weather data and alerts for your farm location",
    "feature.mrvReports": "MRV Reports",
    "feature.mrvReports.desc": "Generate comprehensive sustainability and verification reports",
    "feature.dataVerification": "Data Verification",
    "feature.dataVerification.desc": "Immutable record keeping for transparency and trust",
    "feature.aiAssistant": "AI Assistant",
    "feature.aiAssistant.desc": "Chat with our AI assistant for any farm-related queries",

    // Admin
    "admin.title": "Admin Verification Center",
    "admin.subtitle": "Manage farmer verifications and system oversight",
    "admin.pendingVerifications": "Pending Verifications",
    "admin.verifiedFarmers": "Verified Farmers",
    "admin.rejectedApplications": "Rejected Applications",
    "admin.systemAlerts": "System Alerts",
    "admin.verifyFarmer": "Verify Farmer",
    "admin.rejectApplication": "Reject Application",
    "admin.viewDetails": "View Details",
    "admin.approveAll": "Approve All",
    "admin.exportData": "Export Data",

    // Admin Login
    adminLogin: {
      title: "Admin Login",
      subtitle: "Access the farm management admin panel",
      username: "Username",
      password: "Password",
      usernamePlaceholder: "Enter your username",
      passwordPlaceholder: "Enter your password",
      signIn: "Sign In",
      signingIn: "Signing In...",
      demoCredentials: {
        title: "Demo Credentials",
        admin: "Admin",
        superAdmin: "Super Admin",
      },
      validation: {
        required: "Username and password are required",
        invalid: "Invalid username or password",
      },
    },

    // Buttons
    "button.getStarted": "Get Started",
    "button.startLogging": "Start Logging",
    "button.getAdvice": "Get Advice",
    "button.viewWeather": "View Weather",
    "button.generateReport": "Generate Report",
    "button.viewRecords": "View Records",
    "button.chatNow": "Chat Now",
    "button.approve": "Approve",
    "button.reject": "Reject",
    "button.pending": "Pending",

    // Common
    "common.comingSoon": "Coming Soon",
    "common.progress": "Progress",
    "common.status": "Status",
    "common.actions": "Actions",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.export": "Export",
    "common.refresh": "Refresh",
  },
  hi: {
    // Navigation
    "nav.dashboard": "डैशबोर्ड",
    "nav.register": "पंजीकरण",
    "nav.monitoring": "निगरानी",
    "nav.advisory": "एआई सलाह",
    "nav.assistant": "एआई सहायक",
    "nav.weather": "मौसम",
    "nav.reports": "रिपोर्ट",
    "nav.verification": "सत्यापन",
    "nav.admin": "प्रशासक",

    // Dashboard
    "dashboard.title": "फार्म डैशबोर्ड",
    "dashboard.subtitle": "अपने फार्म के प्रदर्शन और स्थिरता मेट्रिक्स की निगरानी करें",
    "dashboard.totalFarmers": "कुल किसान",
    "dashboard.waterUsage": "पानी का उपयोग",
    "dashboard.co2Emissions": "CO₂ उत्सर्जन",
    "dashboard.cropYield": "फसल उत्पादन",
    "dashboard.lastUpdated": "अंतिम अपडेट: आज",
    "dashboard.premium": "प्रीमियम",

    // Features
    "feature.farmerRegistration": "किसान पंजीकरण",
    "feature.farmerRegistration.desc": "प्लेटफॉर्म में शामिल होने के लिए किसानों के लिए सरल दो-चरणीय पंजीकरण प्रक्रिया",
    "feature.activityMonitoring": "गतिविधि निगरानी",
    "feature.activityMonitoring.desc": "फार्म गतिविधियों को लॉग करें और उपग्रह डेटा के साथ फसल की प्रगति को ट्रैक करें",
    "feature.aiCropAdvisory": "एआई फसल सलाह",
    "feature.aiCropAdvisory.desc": "MRV अंतर्दृष्टि के साथ व्यक्तिगत फसल सिफारिशें प्राप्त करें",
    "feature.weatherUpdates": "मौसम अपडेट",
    "feature.weatherUpdates.desc": "आपके फार्म स्थान के लिए वास्तविक समय मौसम डेटा और अलर्ट",
    "feature.mrvReports": "MRV रिपोर्ट",
    "feature.mrvReports.desc": "व्यापक स्थिरता और सत्यापन रिपोर्ट जेनरेट करें",
    "feature.dataVerification": "डेटा सत्यापन",
    "feature.dataVerification.desc": "पारदर्शिता और विश्वास के लिए अपरिवर्तनीय रिकॉर्ड रखना",
    "feature.aiAssistant": "एआई सहायक",
    "feature.aiAssistant.desc": "किसी भी फार्म-संबंधी प्रश्न के लिए हमारे एआई सहायक के साथ चैट करें",

    // Admin
    "admin.title": "प्रशासक सत्यापन केंद्र",
    "admin.subtitle": "किसान सत्यापन और सिस्टम निरीक्षण का प्रबंधन करें",
    "admin.pendingVerifications": "लंबित सत्यापन",
    "admin.verifiedFarmers": "सत्यापित किसान",
    "admin.rejectedApplications": "अस्वीकृत आवेदन",
    "admin.systemAlerts": "सिस्टम अलर्ट",
    "admin.verifyFarmer": "किसान सत्यापित करें",
    "admin.rejectApplication": "आवेदन अस्वीकार करें",
    "admin.viewDetails": "विवरण देखें",
    "admin.approveAll": "सभी को मंजूरी दें",
    "admin.exportData": "डेटा निर्यात करें",

    // Admin Login
    adminLogin: {
      title: "प्रशासक लॉगिन",
      subtitle: "फार्म प्रबंधन प्रशासक पैनल तक पहुंच",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      usernamePlaceholder: "अपना उपयोगकर्ता नाम दर्ज करें",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      signIn: "साइन इन करें",
      signingIn: "साइन इन हो रहा है...",
      demoCredentials: {
        title: "डेमो क्रेडेंशियल",
        admin: "प्रशासक",
        superAdmin: "सुपर प्रशासक",
      },
      validation: {
        required: "उपयोगकर्ता नाम और पासवर्ड आवश्यक हैं",
        invalid: "अमान्य उपयोगकर्ता नाम या पासवर्ड",
      },
    },

    // Buttons
    "button.getStarted": "शुरू करें",
    "button.startLogging": "लॉगिंग शुरू करें",
    "button.getAdvice": "सलाह लें",
    "button.viewWeather": "मौसम देखें",
    "button.generateReport": "रिपोर्ट जेनरेट करें",
    "button.viewRecords": "रिकॉर्ड देखें",
    "button.chatNow": "अभी चैट करें",
    "button.approve": "मंजूर करें",
    "button.reject": "अस्वीकार करें",
    "button.pending": "लंबित",

    // Common
    "common.comingSoon": "जल्द आ रहा है",
    "common.progress": "प्रगति",
    "common.status": "स्थिति",
    "common.actions": "कार्य",
    "common.search": "खोजें",
    "common.filter": "फिल्टर",
    "common.export": "निर्यात",
    "common.refresh": "रीफ्रेश",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key?: string): any => {
    if (!key) {
      return translations[language]
    }
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
