import { create } from "zustand";

type State = {
  page: number;
  pageSize: number;
  query: string;
  selectedId: number | null;
};
type Actions = {
  setPage: (n: number) => void;
  setPageSize: (n: number) => void;
  setQuery: (q: string) => void;
  select: (id: number | null) => void;
};

export const usePokemonStore = create<State & Actions>((set) => ({
  page: 1,
  pageSize: 20,
  query: "",
  selectedId: null,
  setPage: (n) => set({ page: n }),
  setPageSize: (n) => set({ pageSize: n }),
  setQuery: (q) => set({ query: q, page: 1 }),
  select: (id) => set({ selectedId: id }),
}));
