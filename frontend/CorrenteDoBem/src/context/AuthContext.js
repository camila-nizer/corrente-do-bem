import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;

      await AsyncStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Login falhou', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // Verifique o token e carregue o usuário se necessário
      setUser({ token }); // Exemplo de usuário autenticado
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
