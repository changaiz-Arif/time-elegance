import { motion } from "framer-motion";
import { Menu, StickyNote as StickyIcon, SlidersHorizontal } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import type { SortKind } from "@/context/NotesContext";
import { forwardRef } from "react";

type Props = {
  query: string;
  setQuery: (q: string) => void;
  sort: SortKind;
  setSort: (s: SortKind) => void;
  onOpenSidebar: () => void;
};

export const Header = forwardRef<HTMLInputElement, Props>(function Header({ query, setQuery, sort, setSort, onOpenSidebar }, searchRef) {
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-6">
        <button aria-label="Open filters" onClick={onOpenSidebar} className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent md:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 shadow">
            <StickyIcon className="h-4.5 w-4.5 text-amber-950" />
          </div>
          <span className="hidden text-lg font-semibold tracking-tight sm:inline">Stickies</span>
        </div>
        <div className="flex-1" />
        <SearchBar ref={searchRef} value={query} onChange={setQuery} />
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden sm:block">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKind)}
              aria-label="Sort notes"
              className="h-10 appearance-none rounded-full border border-border bg-background/70 pl-8 pr-4 text-sm outline-none backdrop-blur transition hover:bg-accent focus:border-primary"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="edited">Last edited</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
});