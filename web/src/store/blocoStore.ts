import { create } from 'zustand';
import { Bloco } from '../models/Bloco';
import { fetchBlocos } from '../service/fetchBlocos';

interface BlocoStore {
  blocos: Bloco[];
  blocosFiltrados: Bloco[];
  loading: boolean;
  fetchBlocos: () => Promise<void>;
}

export const useBlocosStore = create<BlocoStore>((set) => ({
  blocos: [],
  blocosFiltrados: [],
  loading: false,
  fetchBlocos: async () => {
    set({ loading: true });
    try {
      const response = await fetchBlocos();
      set({ blocos: response, loading: false });
    } catch (error) {
      console.error('Error fetching blocos: ', error);
      set({ loading: false });
    }
  },
}))