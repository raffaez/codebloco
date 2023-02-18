import { create } from 'zustand';

type SearchStore = {
  cidade: string;
  setCidade: (cidade: string) => void;
  nomeBloco: string;
  setNomeBloco: (nomeBloco: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  cidade: '',
  setCidade: (cidade: string) => set({ cidade }),
  nomeBloco: '',
  setNomeBloco: (nomeBloco: string) => set({ nomeBloco }),
}));