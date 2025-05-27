// Utility to test the connection to the server
import api from '../services/api';
import config from '../config';

export async function testServerConnection() {
  console.log('Testing connection to server...');
  console.log('API URL:', config.apiUrl);
  
  // Test with fetch first (bypassing axios)
  console.log('Testing with native fetch API...');
  try {
    const fetchResponse = await fetch(`${config.apiUrl}/api/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors',
      credentials: 'include'
    });
    
    console.log('Fetch response status:', fetchResponse.status);
    const fetchData = await fetchResponse.json();
    console.log('Fetch response data:', fetchData);
  } catch (fetchError) {
    console.error('Fetch request failed:', fetchError);
    console.error('Error details:', {
      name: fetchError.name,
      message: fetchError.message,
      code: fetchError.code,
      stack: fetchError.stack
    });
  }
  
  // Now test with axios
  try {
    // Try to connect to the server's health endpoint
    const response = await api.get('/api/health');
    console.log('Server connection successful!');
    console.log('Server response:', response.data);
    return {
      success: true,
      message: 'Connected to server successfully',
      data: response.data
    };
  } catch (error) {
    console.error('Server connection failed:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : 'No response'
    });
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
  console.log('API URL:', config.apiUrl);
  
  // Test with fetch first (bypassing axios)
  console.log('Testing authentication with native fetch API...');
  try {
    const fetchResponse = await fetch(`${config.apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    console.log('Fetch authentication status:', fetchResponse.status);
    if (fetchResponse.ok) {
      const fetchData = await fetchResponse.json();
      console.log('Fetch authentication data:', fetchData);
    } else {
      console.error('Fetch authentication failed with status:', fetchResponse.status);
      try {
        const errorData = await fetchResponse.json();
        console.error('Error response:', errorData);
      } catch (e) {
        console.error('Could not parse error response');
      }
    }
  } catch (fetchError) {
    console.error('Fetch authentication request failed:', fetchError);
    console.error('Error details:', {
      name: fetchError.name,
      message: fetchError.message,
      code: fetchError.code,
      stack: fetchError.stack
    });
  }
  
  // Now test with axios
  try {
    // Try to authenticate with the server
    const response = await api.post('/api/auth/login', { email, password });
    console.log('Authentication successful!');
    return {
      success: true,
      message: 'Authentication successful',
      data: response.data
    };
  } catch (error) {
    console.error('Authentication failed:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : 'No response'
    });
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