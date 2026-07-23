import { motion } from "framer-motion";
import { LayoutGrid, Pin, Star, Archive, X } from "lucide-react";
import { NOTE_COLORS, type FilterKind, type NoteColor } from "@/context/NotesContext";

type Counts = Record<FilterKind, number>;

type Props = {
  filter: FilterKind;
  setFilter: (f: FilterKind) => void;
  colorFilter: NoteColor | null;
  setColorFilter: (c: NoteColor | null) => void;
  counts: Counts;
  open: boolean;
  onClose: () => void;
};

const items: { key: FilterKind; label: string; icon: any }[] = [
  { key: "all", label: "All notes", icon: LayoutGrid },
  { key: "pinned", label: "Pinned", icon: Pin },
  { key: "favorites", label: "Favorites", icon: Star },
  { key: "archived", label: "Archived", icon: Archive },
];

export function Sidebar({ filter, setFilter, colorFilter, setColorFilter, counts, open, onClose }: Props) {
  return (
    <>
      {/* Mobile overlay */}
      <motion.div
        aria-hidden
        className="fixed inset-0 z-30 bg-black/40 md:hidden"
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
      />
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="fixed left-0 top-0 z-40 flex h-dvh w-64 flex-col border-r border-border bg-card/95 px-4 py-6 backdrop-blur md:sticky md:top-0 md:translate-x-0"
        aria-label="Filters"
      >
        <div className="mb-4 flex items-center justify-between md:hidden">
          <span className="font-semibold">Filters</span>
          <button aria-label="Close filters" onClick={onClose} className="rounded-full p-1.5 hover:bg-accent"><X className="h-4 w-4" /></button>
        </div>

        <nav className="space-y-1">
          {items.map(({ key, label, icon: Icon }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => { setFilter(key); onClose(); }}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"}`}
              >
                <span className="inline-flex items-center gap-2.5"><Icon className="h-4 w-4" />{label}</span>
                <span className="text-xs text-muted-foreground">{counts[key]}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-6">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Color</p>
          <div className="flex flex-wrap gap-1.5 px-3">
            <button
              onClick={() => setColorFilter(null)}
              aria-pressed={colorFilter === null}
              className={`h-6 rounded-full border px-2 text-xs transition ${colorFilter === null ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"}`}
            >Any</button>
            {NOTE_COLORS.map((c) => (
              <button
                key={c.key}
                onClick={() => setColorFilter(colorFilter === c.key ? null : c.key)}
                aria-label={`Filter by ${c.name}`}
                aria-pressed={colorFilter === c.key}
                className={`h-6 w-6 rounded-full border transition hover:scale-110 ${colorFilter === c.key ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-black/10"}`}
                style={{ backgroundColor: c.light }}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 text-xs text-muted-foreground">
          <p className="mb-1 font-medium text-foreground">Shortcuts</p>
          <ul className="space-y-0.5">
            <li><kbd className="rounded border border-border bg-muted px-1">Ctrl+N</kbd> New note</li>
            <li><kbd className="rounded border border-border bg-muted px-1">Ctrl+F</kbd> Search</li>
            <li><kbd className="rounded border border-border bg-muted px-1">Ctrl+D</kbd> Duplicate</li>
            <li><kbd className="rounded border border-border bg-muted px-1">Del</kbd> Delete selected</li>
          </ul>
        </div>
      </motion.aside>
    </>
  );
}