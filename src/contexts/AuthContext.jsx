
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('luci_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('luci_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('luci_user');
    }
  }, [user]);

  const signIn = async ({ email, password }) => {
    if (email && password) {
      // In a real app, you would verify credentials here.
      // For demo purposes, we'll set a user type based on the email.
      let userType = 'medixia'; // default
      if (email.includes('legal')) userType = 'lexia';
      if (email.includes('seguros')) userType = 'segurosia';
      if (email.includes('conta')) userType = 'contaia';
      
      const mockUser = {
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        type: userType,
      };
      
      setUser(mockUser);
      return { user: mockUser, error: null };
    }
    return { user: null, error: { message: 'Invalid credentials' } };
  };

  const signOut = () => {
    setUser(null);
  };
  
  const value = { user, signIn, signOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
