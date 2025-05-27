// Debug utility to help troubleshoot connection issues
import config from '../config';

/**
 * Debug utility to check connection configuration
 * This can be called from the browser console to check the current configuration
 */
export function debugConnection() {
  console.group('🔍 Connection Debug Information');
  
  // API configuration
  console.log('API URL:', config.apiUrl);
  console.log('Environment:', config.environment);
  console.log('API Timeout:', config.apiTimeout, 'ms');
  console.log('Logging Enabled:', config.enableLogs);
  
  // Check if the API URL is properly formatted
  try {
    const url = new URL(config.apiUrl);
    console.log('URL Protocol:', url.protocol);
    console.log('URL Host:', url.host);
    console.log('URL is valid ✅');
  } catch (error) {
    console.error('URL is invalid ❌', error);
  }
  
  // Check browser capabilities
  console.log('Browser supports Fetch API:', typeof fetch !== 'undefined');
  console.log('Browser supports localStorage:', typeof localStorage !== 'undefined');
  console.log('Browser supports sessionStorage:', typeof sessionStorage !== 'undefined');
  
  // Check for stored authentication
  const hasToken = !!localStorage.getItem('token');
  console.log('Authentication token exists:', hasToken);
  
  // Network test
  console.log('Running network test...');
  
  // Test the root endpoint
  console.log('Testing root endpoint...');
  fetch(config.apiUrl + '/', { 
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      console.log('Root endpoint test successful ✅');
      console.log('Status:', response.status);
      return response.text();
    })
    .then(text => {
      try {
        const data = JSON.parse(text);
        console.log('Root endpoint response:', data);
      } catch (e) {
        console.log('Root endpoint text:', text);
      }
    })
    .catch(error => {
      console.error('Root endpoint test failed ❌', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        code: error.code,
        stack: error.stack
      });
    });
  
  // Test the health endpoint
  console.log('Testing health endpoint...');
  fetch(config.apiUrl + '/api/health', { 
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      console.log('Health endpoint test successful ✅');
      console.log('Status:', response.status);
      return response.text();
    })
    .then(text => {
      try {
        const data = JSON.parse(text);
        console.log('Health endpoint response:', data);
      } catch (e) {
        console.log('Health endpoint text:', text);
      }
    })
    .catch(error => {
      console.error('Health endpoint test failed ❌', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        code: error.code,
        stack: error.stack
      });
    });
    
  // Test the login endpoint with a simple preflight request
  console.log('Testing login endpoint preflight...');
  fetch(config.apiUrl + '/api/auth/login', { 
    method: 'OPTIONS',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Login endpoint preflight test successful ✅');
      console.log('Status:', response.status);
      console.log('Headers:', {
        'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
        'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
        'access-control-allow-headers': response.headers.get('access-control-allow-headers'),
        'access-control-allow-credentials': response.headers.get('access-control-allow-credentials')
      });
      return response;
    })
    .catch(error => {
      console.error('Login endpoint preflight test failed ❌', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        code: error.code,
        stack: error.stack
      });
    });
  
  console.groupEnd();
  
  return {
    apiUrl: config.apiUrl,
    environment: config.environment,
    apiTimeout: config.apiTimeout,
    enableLogs: config.enableLogs,
    hasToken
  };
}

// Make the debug function available in the browser console
if (typeof window !== 'undefined') {
  (window as any).debugConnection = debugConnection;
}