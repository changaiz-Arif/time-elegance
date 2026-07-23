import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type NoteColor =
  | "yellow" | "amber" | "peach" | "rose"
  | "lilac" | "sky" | "mint" | "sand" | "white";

export const NOTE_COLORS: { key: NoteColor; name: string; light: string; dark: string; ring: string }[] = [
  { key: "yellow", name: "Yellow", light: "#FEF3C7", dark: "#78581A", ring: "#F5C518" },
  { key: "amber",  name: "Amber",  light: "#FDE68A", dark: "#7A5A17", ring: "#EAB308" },
  { key: "peach",  name: "Peach",  light: "#FED7AA", dark: "#7C3F1A", ring: "#F97316" },
  { key: "rose",   name: "Rose",   light: "#FBCFE8", dark: "#7A2E4D", ring: "#EC4899" },
  { key: "lilac",  name: "Lilac",  light: "#DDD6FE", dark: "#3F2E7A", ring: "#8B5CF6" },
  { key: "sky",    name: "Sky",    light: "#BAE6FD", dark: "#1F4A6B", ring: "#0EA5E9" },
  { key: "mint",   name: "Mint",   light: "#BBF7D0", dark: "#1F5A3A", ring: "#22C55E" },
  { key: "sand",   name: "Sand",   light: "#E7E5E4", dark: "#3F3B36", ring: "#A8A29E" },
  { key: "white",  name: "White",  light: "#FFFFFF", dark: "#1F2937", ring: "#94A3B8" },
];

export type Note = {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  pinned: boolean;
  favorite: boolean;
  archived: boolean;
  createdAt: number;
  updatedAt: number;
};

export type FilterKind = "all" | "pinned" | "favorites" | "archived";
export type SortKind = "newest" | "oldest" | "edited" | "alpha";

type Ctx = {
  notes: Note[];
  filter: FilterKind;
  setFilter: (f: FilterKind) => void;
  colorFilter: NoteColor | null;
  setColorFilter: (c: NoteColor | null) => void;
  sort: SortKind;
  setSort: (s: SortKind) => void;
  query: string;
  setQuery: (q: string) => void;
  addNote: (partial?: Partial<Note>) => Note;
  updateNote: (id: string, patch: Partial<Note>) => void;
  deleteNote: (id: string) => Note | null;
  restoreNote: (n: Note) => void;
  togglePin: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleArchive: (id: string) => void;
  duplicateNote: (id: string) => Note | null;
};

const NotesCtx = createContext<Ctx | null>(null);

const uid = () =>
  (typeof crypto !== "undefined" && "randomUUID" in crypto)
    ? crypto.randomUUID()
    : `n_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useLocalStorage<Note[]>("stickies.notes.v1", []);
  const [filter, setFilter] = useLocalStorage<FilterKind>("stickies.filter.v1", "all");
  const [colorFilter, setColorFilter] = useLocalStorage<NoteColor | null>("stickies.colorFilter.v1", null);
  const [sort, setSort] = useLocalStorage<SortKind>("stickies.sort.v1", "newest");
  const [query, setQuery] = useLocalStorage<string>("stickies.query.v1", "");

  const addNote = useCallback((partial: Partial<Note> = {}): Note => {
    const now = Date.now();
    const n: Note = {
      id: uid(),
      title: "",
      content: "",
      color: "yellow",
      pinned: false,
      favorite: false,
      archived: false,
      createdAt: now,
      updatedAt: now,
      ...partial,
    };
    setNotes((prev) => [n, ...prev]);
    return n;
  }, [setNotes]);

  const updateNote = useCallback((id: string, patch: Partial<Note>) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n)));
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    let removed: Note | null = null;
    setNotes((prev) => {
      removed = prev.find((n) => n.id === id) || null;
      return prev.filter((n) => n.id !== id);
    });
    return removed;
  }, [setNotes]);

  const restoreNote = useCallback((n: Note) => {
    setNotes((prev) => (prev.some((p) => p.id === n.id) ? prev : [n, ...prev]));
  }, [setNotes]);

  const togglePin = useCallback((id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n)));
  }, [setNotes]);
  const toggleFavorite = useCallback((id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, favorite: !n.favorite, updatedAt: Date.now() } : n)));
  }, [setNotes]);
  const toggleArchive = useCallback((id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, archived: !n.archived, pinned: false, updatedAt: Date.now() } : n)));
  }, [setNotes]);

  const duplicateNote = useCallback((id: string): Note | null => {
    const src = notes.find((n) => n.id === id);
    if (!src) return null;
    const now = Date.now();
    const copy: Note = { ...src, id: uid(), title: src.title ? `${src.title} (copy)` : "", pinned: false, createdAt: now, updatedAt: now };
    setNotes((prev) => [copy, ...prev]);
    return copy;
  }, [notes, setNotes]);

  const value = useMemo<Ctx>(() => ({
    notes, filter, setFilter, colorFilter, setColorFilter, sort, setSort, query, setQuery,
    addNote, updateNote, deleteNote, restoreNote, togglePin, toggleFavorite, toggleArchive, duplicateNote,
  }), [notes, filter, colorFilter, sort, query, setFilter, setColorFilter, setSort, setQuery, addNote, updateNote, deleteNote, restoreNote, togglePin, toggleFavorite, toggleArchive, duplicateNote]);

  return <NotesCtx.Provider value={value}>{children}</NotesCtx.Provider>;
}

export function useNotes() {
  const ctx = useContext(NotesCtx);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}