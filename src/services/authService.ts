import { post, get, put } from './api';
import { 
  ApiResponse, 
  AuthUser, 
  ChangePasswordData, 
  LoginCredentials, 
  RegisterData, 
  UpdateProfileData, 
  User 
} from '../types';

export interface LoginResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log('Attempting login with credentials:', { email: credentials.email, passwordLength: credentials.password?.length || 0 });
    
    // Use a longer timeout for login requests
    const loginConfig = {
      timeout: 60000, // 60 seconds
    };
    
    return post<LoginResponse>('/api/auth/login', credentials, loginConfig);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  return post<RegisterResponse>('/api/auth/register', data);
};

export const getProfile = async (): Promise<ApiResponse<User>> => {
  return get<ApiResponse<User>>('/api/auth/profile');
};

export const updateProfile = async (data: UpdateProfileData): Promise<ApiResponse<User>> => {
  return put<ApiResponse<User>>('/api/auth/profile', data);
};

export const changePassword = async (data: ChangePasswordData): Promise<ApiResponse<void>> => {
  return put<ApiResponse<void>>('/api/auth/change-password', data);
};