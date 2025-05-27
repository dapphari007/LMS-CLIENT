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
  return post<LoginResponse>('/api/auth/login', credentials);
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