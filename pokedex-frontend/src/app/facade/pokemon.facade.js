import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePokemonStore } from "@/app/store/pokemon.store";
import { PokeHttpAdapter } from "@/infra/adapters/poke.http.adapter";
const api = new PokeHttpAdapter();
export function usePokemonFacade() {
    const { page, pageSize, query, selectedId, setPage, setPageSize, setQuery, select } = usePokemonStore();
    // Claves tipadas (opcional, pero ayuda con cacheo y depuración)
    const listKey = ["list", { page, pageSize, query }];
    const detailKey = ["detail", selectedId];
    const listQ = useQuery({
        queryKey: listKey,
        queryFn: () => api.list(page, pageSize, query),
        placeholderData: (prev) => prev,
        staleTime: 30_000,
    });
    const detailQ = useQuery({
        queryKey: detailKey,
        queryFn: () => selectedId != null ? api.detail(selectedId) : Promise.reject(new Error("no-id")),
        enabled: selectedId != null,
        staleTime: 60_000,
    });
    const qc = useQueryClient();
    const prefetchDetail = (id) => qc.prefetchQuery({
        queryKey: ["detail", id],
        queryFn: () => api.detail(id),
        staleTime: 60_000,
    });
    return {
        page,
        pageSize,
        query,
        selectedId,
        setPage,
        setPageSize,
        setQuery,
        select,
        list: listQ.data,
        listLoading: listQ.isLoading,
        listError: listQ.error,
        detail: detailQ.data,
        detailLoading: detailQ.isLoading,
        prefetchDetail,
    };
}
