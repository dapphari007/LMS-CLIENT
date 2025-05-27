// Utility to test the connection to the server
import api from '../services/api';
import config from '../config';

export async function testServerConnection() {
  console.log('Testing connection to server...');
  console.log('API URL:', config.apiUrl);
  
  try {
    // Try to connect to the server's health endpoint
    const response = await api.get('/health');
    console.log('Server connection successful!');
    console.log('Server response:', response.data);
    return {
      success: true,
      message: 'Connected to server successfully',
      data: response.data
    };
  } catch (error) {
    console.error('Server connection failed:', error);
    return {
      success: false,
      message: 'Failed to connect to server',
      error
    };
  }
}

// Function to test authentication
export async function testAuthentication(email: string, password: string) {
  console.log('Testing authentication...');
  
  try {
    // Try to authenticate with the server
    const response = await api.post('/auth/login', { email, password });
    console.log('Authentication successful!');
    return {
      success: true,
      message: 'Authentication successful',
      data: response.data
    };
  } catch (error) {
    console.error('Authentication failed:', error);
    return {
      success: false,
      message: 'Authentication failed',
      error
    };
  }
}

// Export a function that can be called from the browser console
if (typeof window !== 'undefined') {
  (window as any).testServerConnection = testServerConnection;
  (window as any).testAuthentication = testAuthentication;
}