const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3001",
  // Environment configuration
  environment: import.meta.env.VITE_APP_ENV || "development",
  // API request timeout in milliseconds
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000"),
  // Enable detailed logging
  enableLogs: import.meta.env.VITE_ENABLE_LOGS === "true",
  // Add a timestamp to help with cache busting during development
  buildTime: new Date().toISOString(),
};

export default config;
