import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Pagination({ page, total, pageSize, onPage }) {
    const pages = Math.max(1, Math.ceil(total / pageSize));
    return (_jsxs("div", { className: "flex items-center gap-2 justify-center mt-4", children: [_jsx("button", { className: "px-3 py-1 border rounded disabled:opacity-50", onClick: () => onPage(Math.max(1, page - 1)), disabled: page <= 1, children: "Anterior" }), _jsxs("span", { className: "text-sm text-slate-600", children: ["P\u00E1gina ", page, " de ", pages] }), _jsx("button", { className: "px-3 py-1 border rounded disabled:opacity-50", onClick: () => onPage(Math.min(pages, page + 1)), disabled: page >= pages, children: "Siguiente" })] }));
}
