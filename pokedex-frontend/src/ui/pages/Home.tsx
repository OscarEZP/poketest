import { usePokemonFacade } from "@/app/facade/pokemon.facade";
import SearchBar from "@/ui/components/SearchBar";
import Grid from "@/ui/components/Grid";
import Pagination from "@/ui/components/Pagination";
import DetailModal from "@/ui/components/DetailModal";

export default function Home(){
  const {
    page, pageSize, query, setPage, setQuery, select, selectedId,
    list, listLoading, listError, detail, detailLoading, prefetchDetail
  } = usePokemonFacade();

  const items = list?.items ?? [];
  const total = list?.total ?? 0;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {listError && <div className="p-3 bg-red-100 border border-red-200 rounded">Error cargando lista</div>}
      {listLoading && <div className="p-4 text-slate-500">Cargando...</div>}

      {!listLoading && items.length === 0 && <div className="p-4 text-slate-500">Sin resultados</div>}

      {items.length > 0 && (
        <>
          <Grid items={items} onSelect={(id)=>select(id)} onHover={(id)=>prefetchDetail(id)} />
          <Pagination page={page} total={total} pageSize={pageSize} onPage={setPage} />
        </>
      )}

      <DetailModal
        open={!!selectedId}
        onClose={()=>select(null)}
        name={detail?.name || ""}
        id={detail?.id || 0}
        types={detail?.types || []}
        sprites={detail?.sprites}
        height={detail?.height || 0}
        weight={detail?.weight || 0}
      />
    </div>
  );
}
