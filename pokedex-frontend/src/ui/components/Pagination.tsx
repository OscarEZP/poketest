export default function Pagination({ page, total, pageSize, onPage }:{
  page: number; total: number; pageSize: number; onPage: (p: number) => void;
}){
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      <button className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => onPage(Math.max(1, page - 1))} disabled={page <= 1}>Anterior</button>
      <span className="text-sm text-slate-600">Página {page} de {pages}</span>
      <button className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => onPage(Math.min(pages, page + 1))} disabled={page >= pages}>Siguiente</button>
    </div>
  );
}
