const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3001",
  // Add a timestamp to help with cache busting during development
  buildTime: new Date().toISOString(),
};

export default config;
