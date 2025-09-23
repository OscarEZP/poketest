import { PokemonListItem } from "@/core/ports/poke.port";

export default function PokemonCard({ item, onClick, onHover }:{
  item: PokemonListItem; onClick: () => void; onHover?: () => void;
}){
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      className="group rounded-2xl border bg-white p-4 shadow hover:shadow-md transition text-left"
      aria-label={`Ver detalles de ${item.name}`}
    >
      <img src={item.image} alt={item.name} className="w-28 h-28 object-contain mx-auto" />
      <div className="mt-2 flex justify-between items-center">
        <span className="capitalize font-semibold">{item.name}</span>
        <span className="text-slate-500">#{item.id}</span>
      </div>
    </button>
  );
}
