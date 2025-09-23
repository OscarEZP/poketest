import { PokemonListItem } from "@/core/ports/poke.port";
import PokemonCard from "./PokemonCard";

export default function Grid({ items, onSelect, onHover }:{
  items: PokemonListItem[]; onSelect: (id: number) => void; onHover: (id: number) => void;
}){
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((it) => (
        <PokemonCard key={it.id} item={it} onClick={() => onSelect(it.id)} onHover={() => onHover(it.id)} />
      ))}
    </div>
  );
}
