// Import the axios library to create an API client
import axios from "axios";

// Create an axios instance with a base URL for the API endpoints
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default apiClient;