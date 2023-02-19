import { create } from 'zustand';

type SearchStore = {
  cidade: string;
  nomeBloco: string;
}

export const useSearchStore = create<SearchStore>((set) => ({
  cidade: '',
  setCidade: (cidade: string) => set({ cidade }),
  nomeBloco: '',
  setNomeBloco: (nomeBloco: string) => set({ nomeBloco }),
}));