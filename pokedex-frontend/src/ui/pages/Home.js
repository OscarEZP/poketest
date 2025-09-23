import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { usePokemonFacade } from "@/app/facade/pokemon.facade";
import SearchBar from "@/ui/components/SearchBar";
import Grid from "@/ui/components/Grid";
import Pagination from "@/ui/components/Pagination";
import DetailModal from "@/ui/components/DetailModal";
export default function Home() {
    const { page, pageSize, query, setPage, setQuery, select, selectedId, list, listLoading, listError, detail, detailLoading, prefetchDetail } = usePokemonFacade();
    const items = list?.items ?? [];
    const total = list?.total ?? 0;
    return (_jsxs("div", { className: "max-w-5xl mx-auto p-4", children: [_jsx("div", { className: "flex items-center justify-between gap-3 mb-4", children: _jsx(SearchBar, { value: query, onChange: setQuery }) }), listError && _jsx("div", { className: "p-3 bg-red-100 border border-red-200 rounded", children: "Error cargando lista" }), listLoading && _jsx("div", { className: "p-4 text-slate-500", children: "Cargando..." }), !listLoading && items.length === 0 && _jsx("div", { className: "p-4 text-slate-500", children: "Sin resultados" }), items.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Grid, { items: items, onSelect: (id) => select(id), onHover: (id) => prefetchDetail(id) }), _jsx(Pagination, { page: page, total: total, pageSize: pageSize, onPage: setPage })] })), _jsx(DetailModal, { open: !!selectedId, onClose: () => select(null), name: detail?.name || "", id: detail?.id || 0, types: detail?.types || [], sprites: detail?.sprites, height: detail?.height || 0, weight: detail?.weight || 0 })] }));
}
