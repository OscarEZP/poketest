import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function PokemonCard({ item, onClick, onHover }) {
    return (_jsxs("button", { onClick: onClick, onMouseEnter: onHover, className: "group rounded-2xl border bg-white p-4 shadow hover:shadow-md transition text-left", "aria-label": `Ver detalles de ${item.name}`, children: [_jsx("img", { src: item.image, alt: item.name, className: "w-28 h-28 object-contain mx-auto" }), _jsxs("div", { className: "mt-2 flex justify-between items-center", children: [_jsx("span", { className: "capitalize font-semibold", children: item.name }), _jsxs("span", { className: "text-slate-500", children: ["#", item.id] })] })] }));
}
