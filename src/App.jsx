
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import LoginPage from '@/pages/LoginPage';
import CrmLayout from '@/components/layout/CrmLayout';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const AppRoutes = () => {
  // DESARROLLO: Sin login para mostrar a socios
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<CrmLayout />} />
    </Routes>
  );
};


function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
           <AuthProvider>
            <Helmet>
              <title>L.U.C.I CRM Universal - Sistema Ejecutivo Inteligente</title>
              <meta name="description" content="Learning & Universal Cognitive Intelligence - Sistema CRM ejecutivo con IA integrada" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
              <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet" />
            </Helmet>
            <AppRoutes />
            <Toaster />
           </AuthProvider>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
