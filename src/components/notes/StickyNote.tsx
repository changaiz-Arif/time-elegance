import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pin, PinOff, Star, Archive, ArchiveRestore, Copy, Download, Trash2, Palette } from "lucide-react";
import { toast } from "sonner";
import { NOTE_COLORS, type Note, type NoteColor } from "@/context/NotesContext";
import { ColorPicker } from "./ColorPicker";
import { VoiceRecorder } from "./VoiceRecorder";

function colorStyle(c: NoteColor) {
  const cfg = NOTE_COLORS.find((x) => x.key === c) || NOTE_COLORS[0];
  return cfg;
}

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return formatDate(ts);
}

type Props = {
  note: Note;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<Note>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onTogglePin: () => void;
  onToggleFavorite: () => void;
  onToggleArchive: () => void;
};

function StickyNoteBase({ note, isSelected, onSelect, onChange, onDelete, onDuplicate, onTogglePin, onToggleFavorite, onToggleArchive }: Props) {
  const cfg = colorStyle(note.color);
  const [showColors, setShowColors] = useState(false);
  const [interim, setInterim] = useState("");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [note.content, interim]);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(`${note.title ? note.title + "\n\n" : ""}${note.content}`);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Could not copy");
    }
  }

  function downloadTxt() {
    const body = `${note.title || "Untitled"}\n\n${note.content}\n`;
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(note.title || "note").replace(/[^\w\-]+/g, "_").slice(0, 40) || "note"}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const displayContent = interim ? note.content + (note.content && !note.content.endsWith(" ") ? " " : "") + interim : note.content;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      whileHover={{ y: -3 }}
      onClick={onSelect}
      tabIndex={0}
      aria-label={`Note ${note.title || "untitled"}`}
      className={`group relative mb-4 break-inside-avoid rounded-2xl p-4 shadow-[var(--shadow-note)] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-primary ${isSelected ? "ring-2 ring-primary/60" : ""}`}
      style={{ backgroundColor: `light-dark(${cfg.light}, ${cfg.dark})` as any }}
    >
      {/* Fallback bg (older browsers) via inline dual style */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-2xl" style={{ backgroundColor: cfg.light }} />
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden rounded-2xl dark:block" style={{ backgroundColor: cfg.dark }} />

      {/* Top row */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <input
          value={note.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Title"
          aria-label="Note title"
          className="min-w-0 flex-1 bg-transparent text-base font-semibold text-neutral-900 placeholder:text-neutral-500/70 outline-none dark:text-neutral-50 dark:placeholder:text-neutral-300/60"
        />
        <div className="flex items-center gap-0.5 text-neutral-800 dark:text-neutral-100">
          <button aria-label={note.pinned ? "Unpin note" : "Pin note"} onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/10 dark:hover:bg-white/15 ${note.pinned ? "text-amber-700 dark:text-amber-300" : ""}`}>
            {note.pinned ? <Pin className="h-4 w-4 fill-current" /> : <PinOff className="h-4 w-4" />}
          </button>
          <button aria-label={note.favorite ? "Unfavorite note" : "Favorite note"} onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/10 dark:hover:bg-white/15 ${note.favorite ? "text-yellow-600 dark:text-yellow-300" : ""}`}>
            <Star className={`h-4 w-4 ${note.favorite ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Body */}
      <textarea
        ref={contentRef}
        value={displayContent}
        onChange={(e) => { setInterim(""); onChange({ content: e.target.value }); }}
        placeholder="Take a note…"
        aria-label="Note content"
        rows={3}
        className="w-full resize-none bg-transparent text-sm leading-relaxed text-neutral-800 placeholder:text-neutral-500/70 outline-none dark:text-neutral-100 dark:placeholder:text-neutral-300/60"
      />

      {/* Meta */}
      <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-700/70 dark:text-neutral-200/70">
        <span title={`Created ${formatDate(note.createdAt)}`}>Edited {formatRelative(note.updatedAt)}</span>
        <span>{note.content.length} chars</span>
      </div>

      {/* Actions */}
      <div className="mt-2 flex items-center justify-between gap-1 text-neutral-800 dark:text-neutral-100">
        <div className="relative flex items-center gap-0.5">
          <button aria-label="Change color" onClick={(e) => { e.stopPropagation(); setShowColors((s) => !s); }} className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/10 dark:hover:bg-white/15">
            <Palette className="h-4 w-4" />
          </button>
          <VoiceRecorder
            onFinalText={(text) => { setInterim(""); onChange({ content: (note.content + (note.content && !note.content.endsWith(" ") ? " " : "") + text).trim() }); }}
            onInterim={setInterim}
          />
          <button aria-label="Copy note" onClick={(e) => { e.stopPropagation(); copyToClipboard(); }} className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/10 dark:hover:bg-white/15">
            <Copy className="h-4 w-4" />
          </button>
          <button aria-label="Download as text file" onClick={(e) => { e.stopPropagation(); downloadTxt(); }} className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/10 dark:hover:bg-white/15">
            <Download className="h-4 w-4" />
          </button>
          {showColors && (
            <div className="absolute left-0 top-10 z-10 rounded-2xl border border-black/10 bg-white/95 p-2 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-900/95" onClick={(e) => e.stopPropagation()}>
              <ColorPicker value={note.color} onChange={(c) => { onChange({ color: c }); setShowColors(false); }} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <button aria-label="Duplicate note" onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/10 dark:hover:bg-white/15">
            <Copy className="h-4 w-4 rotate-180" />
          </button>
          <button aria-label={note.archived ? "Unarchive note" : "Archive note"} onClick={(e) => { e.stopPropagation(); onToggleArchive(); }} className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/10 dark:hover:bg-white/15">
            {note.archived ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
          </button>
          <button aria-label="Delete note" onClick={(e) => { e.stopPropagation(); onDelete(); }} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-red-600 transition hover:bg-red-500/15 dark:text-red-300">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export const StickyNote = memo(StickyNoteBase);