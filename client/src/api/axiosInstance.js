import axios from 'axios'
import { baseUrl } from '../api/url'



const axiosInstance = axios.create({
  baseURL: baseUrl, 

});

export default axiosInstance;

export const imagePath = (path) => {
   if (!path) return "";
  return `${baseUrl}${path.replace(/\\/g, '/')}`; // Replace backslashes with slashes
};