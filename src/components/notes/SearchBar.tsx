import { forwardRef } from "react";
import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export const SearchBar = forwardRef<HTMLInputElement, Props>(function SearchBar({ value, onChange }, ref) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={ref}
        type="search"
        placeholder="Search notes…  (Ctrl+F)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search notes"
        className="h-11 w-full rounded-full border border-border bg-background/70 pl-10 pr-10 text-sm outline-none backdrop-blur transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {value && (
        <button
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});