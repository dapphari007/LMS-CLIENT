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
  fetch(config.apiUrl + '/health', { 
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      console.log('Network test successful ✅');
      console.log('Status:', response.status);
      return response.text();
    })
    .then(text => {
      try {
        const data = JSON.parse(text);
        console.log('Response data:', data);
      } catch (e) {
        console.log('Response text:', text);
      }
    })
    .catch(error => {
      console.error('Network test failed ❌', error);
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