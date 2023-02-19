import axios from 'axios';

const baseUrl = `https://${import.meta.env.VITE_SANITY_PROJECT_ID}.api.sanity.io/v${import.meta.env.VITE_SANITY_API_VERSION}/data/query`;

export const api = axios.create({
  baseURL: baseUrl
});