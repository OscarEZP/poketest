import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export default function SearchBar({ value, onChange }) {
    const [local, setLocal] = useState(value);
    useEffect(() => { const t = setTimeout(() => onChange(local), 350); return () => clearTimeout(t); }, [local]);
    return (_jsx("input", { className: "w-full md:w-96 border rounded px-3 py-2 shadow-sm", placeholder: "Buscar por nombre...", value: local, onChange: (e) => setLocal(e.target.value) }));
}
