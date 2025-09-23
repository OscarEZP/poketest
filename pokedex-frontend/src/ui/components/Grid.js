import { jsx as _jsx } from "react/jsx-runtime";
import PokemonCard from "./PokemonCard";
export default function Grid({ items, onSelect, onHover }) {
    return (_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: items.map((it) => (_jsx(PokemonCard, { item: it, onClick: () => onSelect(it.id), onHover: () => onHover(it.id) }, it.id))) }));
}
