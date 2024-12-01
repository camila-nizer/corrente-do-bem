import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api'; // Sua configuração do Axios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Armazenar dados do usuário
  const [token, setToken] = useState(null); // Armazenar o token JWT
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Função para fazer login
  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;

      // Armazenar o token e o usuário no AsyncStorage
      await AsyncStorage.setItem('token', token);
      setUser(user);
      setToken(token);
    } catch (error) {
      console.error('Login falhou', error);
      throw new Error('Erro ao fazer login');
    }
  };

  // Função para fazer logout
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  // Função para verificar a validade do token
  const verifyToken = async (token) => {
    try {
      const response = await api.post('/verify-token', { token }); // Endpoint para verificar o token
      return response.data.valid; // Supondo que o retorno tenha um campo `valid`
    } catch (error) {
      return false;
    }
  };

  // Função para verificar se há token salvo e validar
  const checkAuth = async () => {
    const savedToken = await AsyncStorage.getItem('token');
    if (savedToken) {
      const isValid = await verifyToken(savedToken);
      if (isValid) {
        setToken(savedToken);
        // Se o token for válido, você pode buscar o usuário
        const userResponse = await api.get('/user', { headers: { Authorization: `Bearer ${savedToken}` } });
        setUser(userResponse.data);
      } else {
        await AsyncStorage.removeItem('token'); // Se o token for inválido, removemos
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []); // Rodar apenas uma vez ao iniciar

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
