import { create } from "zustand";
export const usePokemonStore = create((set) => ({
    page: 1,
    pageSize: 20,
    query: "",
    selectedId: null,
    setPage: (n) => set({ page: n }),
    setPageSize: (n) => set({ pageSize: n }),
    setQuery: (q) => set({ query: q, page: 1 }),
    select: (id) => set({ selectedId: id }),
}));
