import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { NotesProvider, useNotes, type Note } from "@/context/NotesContext";
import { useDebounce } from "@/hooks/useDebounce";
import { Header } from "@/components/notes/Header";
import { Sidebar } from "@/components/notes/Sidebar";
import { MasonryGrid } from "@/components/notes/MasonryGrid";
import { StickyNote } from "@/components/notes/StickyNote";
import { EmptyState } from "@/components/notes/EmptyState";
import { ConfirmDialog } from "@/components/notes/ConfirmDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stickies — Beautiful sticky notes in your browser" },
      { name: "description", content: "A fast, minimal sticky-notes app with voice-to-text, colors, pinning, archiving, dark mode, and local storage." },
      { property: "og:title", content: "Stickies — Sticky Notes" },
      { property: "og:description", content: "Capture ideas fast. Local, private, beautiful." },
    ],
  }),
  component: () => (
    <NotesProvider>
      <NotesApp />
    </NotesProvider>
  ),
});

function NotesApp() {
  const {
    notes, filter, setFilter, colorFilter, setColorFilter, sort, setSort, query, setQuery,
    addNote, updateNote, deleteNote, restoreNote, togglePin, toggleFavorite, toggleArchive, duplicateNote,
  } = useNotes();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 180);

  const counts = useMemo(() => ({
    all: notes.filter((n) => !n.archived).length,
    pinned: notes.filter((n) => n.pinned && !n.archived).length,
    favorites: notes.filter((n) => n.favorite && !n.archived).length,
    archived: notes.filter((n) => n.archived).length,
  }), [notes]);

  const visible = useMemo(() => {
    let list = notes.slice();
    if (filter === "archived") list = list.filter((n) => n.archived);
    else {
      list = list.filter((n) => !n.archived);
      if (filter === "pinned") list = list.filter((n) => n.pinned);
      if (filter === "favorites") list = list.filter((n) => n.favorite);
    }
    if (colorFilter) list = list.filter((n) => n.color === colorFilter);
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
    }
    switch (sort) {
      case "newest": list.sort((a, b) => b.createdAt - a.createdAt); break;
      case "oldest": list.sort((a, b) => a.createdAt - b.createdAt); break;
      case "edited": list.sort((a, b) => b.updatedAt - a.updatedAt); break;
      case "alpha": list.sort((a, b) => (a.title || a.content).localeCompare(b.title || b.content)); break;
    }
    // Pins always first (except archived tab)
    if (filter !== "archived") {
      list.sort((a, b) => Number(b.pinned) - Number(a.pinned));
    }
    return list;
  }, [notes, filter, colorFilter, sort, debouncedQuery]);

  const handleDelete = useCallback((id: string) => {
    const removed = deleteNote(id);
    if (removed) {
      const snapshot: Note = removed;
      toast("Note deleted", {
        action: { label: "Undo", onClick: () => restoreNote(snapshot) },
        duration: 5000,
      });
    }
    if (selectedId === id) setSelectedId(null);
    setConfirmId(null);
  }, [deleteNote, restoreNote, selectedId]);

  const createNote = useCallback(() => {
    const n = addNote();
    setSelectedId(n.id);
  }, [addNote]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      const ctrl = e.ctrlKey || e.metaKey;

      if (ctrl && e.key.toLowerCase() === "n") { e.preventDefault(); createNote(); return; }
      if (ctrl && e.key.toLowerCase() === "f") { e.preventDefault(); searchRef.current?.focus(); return; }
      if (ctrl && e.key.toLowerCase() === "d") {
        if (selectedId) { e.preventDefault(); const d = duplicateNote(selectedId); if (d) setSelectedId(d.id); }
        return;
      }
      if ((e.key === "Delete" || e.key === "Backspace") && !typing && selectedId) {
        e.preventDefault();
        setConfirmId(selectedId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [createNote, duplicateNote, selectedId]);

  return (
    <div className="min-h-dvh bg-[image:var(--gradient-hero)] text-foreground transition-colors dark:bg-none dark:bg-background">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-0 md:px-4">
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          colorFilter={colorFilter}
          setColorFilter={setColorFilter}
          counts={counts}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1 min-w-0">
          <Header
            ref={searchRef}
            query={query}
            setQuery={setQuery}
            sort={sort}
            setSort={setSort}
            onOpenSidebar={() => setSidebarOpen(true)}
          />

          <main className="mx-auto max-w-7xl px-4 py-8 md:px-6" id="main">
            {/* Section title */}
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {filter === "all" && "All notes"}
                  {filter === "pinned" && "Pinned"}
                  {filter === "favorites" && "Favorites"}
                  {filter === "archived" && "Archived"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {visible.length} {visible.length === 1 ? "note" : "notes"}
                  {debouncedQuery && ` matching "${debouncedQuery}"`}
                </p>
              </div>
            </div>

            {visible.length === 0 ? (
              <EmptyState onCreate={filter === "all" && !debouncedQuery && !colorFilter ? createNote : undefined} />
            ) : (
              <MasonryGrid>
                <AnimatePresence initial={false}>
                  {visible.map((n) => (
                    <StickyNote
                      key={n.id}
                      note={n}
                      isSelected={selectedId === n.id}
                      onSelect={() => setSelectedId(n.id)}
                      onChange={(patch) => updateNote(n.id, patch)}
                      onDelete={() => setConfirmId(n.id)}
                      onDuplicate={() => { const d = duplicateNote(n.id); if (d) { setSelectedId(d.id); toast.success("Note duplicated"); } }}
                      onTogglePin={() => togglePin(n.id)}
                      onToggleFavorite={() => toggleFavorite(n.id)}
                      onToggleArchive={() => { toggleArchive(n.id); toast.success(n.archived ? "Restored" : "Archived"); }}
                    />
                  ))}
                </AnimatePresence>
              </MasonryGrid>
            )}
          </main>
        </div>
      </div>

      {/* Floating action button */}
      <motion.button
        aria-label="Create new note"
        onClick={createNote}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.2 }}
        className="fixed bottom-6 right-6 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] transition hover:shadow-xl md:h-16 md:w-16"
      >
        <Plus className="h-6 w-6 md:h-7 md:w-7" />
      </motion.button>

      <ConfirmDialog
        open={!!confirmId}
        title="Delete this note?"
        description="You can undo this from the toast that appears."
        confirmLabel="Delete"
        destructive
        onConfirm={() => confirmId && handleDelete(confirmId)}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  );
}