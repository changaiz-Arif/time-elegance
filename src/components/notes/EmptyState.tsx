import { motion } from "framer-motion";
import { StickyNote as StickyIcon, Plus } from "lucide-react";

export function EmptyState({ onCreate }: { onCreate?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mt-16 flex max-w-md flex-col items-center rounded-3xl border border-dashed border-border bg-card/40 p-10 text-center backdrop-blur"
    >
      <div className="relative">
        <div className="absolute -inset-6 rounded-full bg-primary/10 blur-2xl" aria-hidden />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-200 to-orange-200 shadow-lg dark:from-amber-500/40 dark:to-orange-500/30">
          <StickyIcon className="h-7 w-7 text-amber-900 dark:text-amber-100" />
        </div>
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-tight">No notes yet</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Capture a thought, a to-do, a lyric. Everything stays private on this device.
      </p>
      {onCreate && (
        <button
          onClick={onCreate}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> New note
        </button>
      )}
      <p className="mt-4 text-xs text-muted-foreground">Tip: press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">Ctrl+N</kbd> anywhere</p>
    </motion.div>
  );
}