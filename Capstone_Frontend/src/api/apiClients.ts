// Import and configure Axios for API calls
import axios from "axios";

// Create an Axios instance with the base URL set to the API URL defined in the environment variables
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//  Add a request interceptor to include the authentication token in the headers of each request if it exists in localStorage
export default apiClient;