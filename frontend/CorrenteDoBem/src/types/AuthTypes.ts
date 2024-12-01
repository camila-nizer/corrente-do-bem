// src/types/AuthTypes.ts

// Tipos relacionados ao login
export interface LoginDTO {
    email: string;
    password: string;
    userType: string;
  }
  
  // Tipos para os dados de criação de usuário (inclui LoginDTO)
  export interface CreateUserDTO extends LoginDTO {
    name: string;
    cnpj: string;
    industry: string[];
  }

  // Tipos para status do usuário
  export interface UserStatusResponse {
    statusId: string;   // UUID como string
    userId: string;     // UUID como string
    userStatus: string;
    createdAt: string;  // Data no formato ISO (string)
  }
  
  // Tipos para os dados do usuário
  export interface UserResponse {
    id: string;         // UUID como string
    name: string;
    cnpj: string;
    email: string;
    industry: string[];
    userType: string;
    userStatuses: UserStatusResponse[];
  }
  
  
  // Tipos para o token de autenticação
  export interface AccessResponse {
    token: string;  // Token JWT
  }
  
  // Resposta de autenticação
  export interface AuthResponse {
    user: UserResponse;  // Dados do usuário
    auth: AccessResponse; // Token JWT
  }
  
  // Tipos para os dados armazenados no JWT (Payload)
  export interface TokenPayload {
    id: string;     // UUID como string
    email: string;
    cnpj: string;
    name: string;
    industry: string[];
    userType: string;
  }
  