export default function DetailModal({ open, onClose, name, id, types, sprites, height, weight }:{
  open: boolean; onClose: () => void;
  name: string; id: number; types: string[];
  sprites?: { front?: string }; height: number; weight: number;
}){
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold capitalize">{name} <span className="text-slate-500">#{id}</span></h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Cerrar">✕</button>
        </div>
        <div className="mt-4 flex gap-4 items-center">
          <img src={sprites?.front || ""} alt={name} className="w-32 h-32 object-contain" />
          <div className="text-sm">
            <div><b>Tipos:</b> {types.join(", ")}</div>
            <div><b>Altura:</b> {height}</div>
            <div><b>Peso:</b> {weight}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
