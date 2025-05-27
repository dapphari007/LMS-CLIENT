// Simple script to test server connection
const https = require('https');

// Server URL from your configuration
const serverUrl = 'https://lms-server-production-31e9.up.railway.app';

// Test endpoints to check
const endpoints = [
  '/',                  // Root/health check
  '/api/auth/login',    // Login endpoint
  '/api/users'          // Users endpoint (if available)
];

function testEndpoint(url) {
  return new Promise((resolve, reject) => {
    console.log(`Testing endpoint: ${url}`);
    
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Status code: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        
        try {
          // Try to parse as JSON if possible
          const jsonData = JSON.parse(data);
          resolve({
            url,
            statusCode: res.statusCode,
            headers: res.headers,
            data: jsonData
          });
        } catch (e) {
          // If not JSON, return as string
          resolve({
            url,
            statusCode: res.statusCode,
            headers: res.headers,
            data: data.substring(0, 200) + (data.length > 200 ? '...' : '') // Truncate long responses
          });
        }
      });
    });
    
    req.on('error', (error) => {
      console.error(`Error testing ${url}:`, error.message);
      reject({
        url,
        error: error.message
      });
    });
    
    // Set a timeout
    req.setTimeout(10000, () => {
      req.abort();
      reject({
        url,
        error: 'Request timed out after 10 seconds'
      });
    });
  });
}

async function testServerConnection() {
  console.log(`Testing connection to server: ${serverUrl}`);
  
  for (const endpoint of endpoints) {
    try {
      const result = await testEndpoint(`${serverUrl}${endpoint}`);
      console.log(`\nEndpoint ${endpoint} test result:`);
      console.log(`Status: ${result.statusCode}`);
      console.log('Response data:', result.data);
      console.log('-'.repeat(50));
    } catch (error) {
      console.error(`\nEndpoint ${endpoint} test failed:`, error.error);
      console.log('-'.repeat(50));
    }
  }
}

testServerConnection();