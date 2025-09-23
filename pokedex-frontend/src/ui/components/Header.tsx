export default function Header(){
  return (
    <header className="sticky top-0 z-10 bg-red-600 text-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="size-6 rounded-full bg-white border-4 border-slate-800" />
        <h1 className="text-xl font-bold tracking-wide">Pokédex</h1>
      </div>
    </header>
  );
}
