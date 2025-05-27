import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";

// Create axios instance
const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  // Enable sending cookies with cross-origin requests
  withCredentials: true,
  // Set timeout from configuration
  timeout: config.apiTimeout,
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Log detailed error information
    console.error("API Error:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
      baseURL: error.config?.baseURL,
    });

    // Handle network errors
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - server may be down or unreachable');
      console.error('API URL:', config.apiUrl);
      // You could implement a retry mechanism here
    }

    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

// Generic GET request with better error handling
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
  } catch (error) {
    console.error(`Error in GET request to ${url}:`, error);
    if (error instanceof AxiosError && error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response data:`, error.response.data);
      
      // Add more detailed logging for debugging
      if (error.response.status === 401) {
        console.error("Authentication error - token may be invalid or expired");
      } else if (error.response.status === 403) {
        console.error("Permission error - user may not have access to this resource");
      } else if (error.response.status === 404) {
        console.error("Resource not found - endpoint may not exist or be misconfigured");
      } else if (error.response.status >= 500) {
        console.error("Server error - backend service may be down or experiencing issues");
      }
    } else if (error instanceof Error) {
      console.error("Network or other error:", error.message);
    }
    throw error;
  }
};

// Generic POST request with better error handling
export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error in POST request to ${url}:`, error);
    if (error instanceof AxiosError && error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response data:`, error.response.data);
      
      // Add more detailed logging for debugging
      if (error.response.status === 204) {
        console.error("No content returned - server responded with 204 status code");
        // For 204 responses, return an empty object as the expected type
        return {} as T;
      } else if (error.response.status === 401) {
        console.error("Authentication error - credentials may be invalid");
      } else if (error.response.status === 403) {
        console.error("Permission error - user may not have access to this resource");
      } else if (error.response.status === 404) {
        console.error("Resource not found - endpoint may not exist or be misconfigured");
      } else if (error.response.status >= 500) {
        console.error("Server error - backend service may be down or experiencing issues");
      }
    } else if (error instanceof Error) {
      console.error("Network or other error:", error.message);
    }
    throw error;
  }
};

// Generic PUT request with better error handling
export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error in PUT request to ${url}:`, error);
    if (error instanceof AxiosError && error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response data:`, error.response.data);
      
      // Add more detailed logging for debugging
      if (error.response.status === 204) {
        console.error("No content returned - server responded with 204 status code");
        // For 204 responses, return an empty object as the expected type
        return {} as T;
      } else if (error.response.status === 401) {
        console.error("Authentication error - token may be invalid or expired");
      } else if (error.response.status === 403) {
        console.error("Permission error - user may not have access to this resource");
      } else if (error.response.status === 404) {
        console.error("Resource not found - endpoint may not exist or be misconfigured");
      } else if (error.response.status >= 500) {
        console.error("Server error - backend service may be down or experiencing issues");
      }
    } else if (error instanceof Error) {
      console.error("Network or other error:", error.message);
    }
    throw error;
  }
};

// Generic DELETE request with better error handling
export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.delete(url, config);
    return response.data;
  } catch (error) {
    console.error(`Error in DELETE request to ${url}:`, error);
    if (error instanceof AxiosError && error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response data:`, error.response.data);
      
      // Add more detailed logging for debugging
      if (error.response.status === 204) {
        console.error("No content returned - server responded with 204 status code");
        // For 204 responses, return an empty object as the expected type
        return {} as T;
      } else if (error.response.status === 401) {
        console.error("Authentication error - token may be invalid or expired");
      } else if (error.response.status === 403) {
        console.error("Permission error - user may not have access to this resource");
      } else if (error.response.status === 404) {
        console.error("Resource not found - endpoint may not exist or be misconfigured");
      } else if (error.response.status >= 500) {
        console.error("Server error - backend service may be down or experiencing issues");
      }
    } else if (error instanceof Error) {
      console.error("Network or other error:", error.message);
    }
    throw error;
  }
};

export default api;
