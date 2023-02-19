import { api } from './api';

export const fetchBlocos = async () => {
  const response = await api.get(`${import.meta.env.VITE_SANITY_DATASET}?query=${encodeURIComponent('*[_type == "bloco"]')}`);
  const blocos = response.data.result;
  return blocos;
}