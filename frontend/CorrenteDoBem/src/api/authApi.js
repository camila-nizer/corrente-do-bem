import axios from 'axios';

// URL da API 
const API_URL = 'http://127.0.0.1:3000/api/v1/auth';

export const login = async (email, password, userType) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password , userType});
    return response.data;  // Retorna o token JWT
  } catch (error) {
    throw error.response?.data?.message || 'Erro ao fazer login';
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { userData});
    return response;
  } catch (error) {
    throw error; // Lança o erro para ser tratado no frontend
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/verify-token`, { token });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Token inválido ou expirado';
  }
};
