import { NOTE_COLORS, type NoteColor } from "@/context/NotesContext";
import { Check } from "lucide-react";

type Props = {
  value: NoteColor;
  onChange: (c: NoteColor) => void;
};

export function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Note color">
      {NOTE_COLORS.map((c) => {
        const selected = c.key === value;
        return (
          <button
            key={c.key}
            role="radio"
            aria-checked={selected}
            aria-label={c.name}
            onClick={() => onChange(c.key)}
            className="relative h-6 w-6 rounded-full border border-black/10 transition hover:scale-110"
            style={{ backgroundColor: c.light }}
          >
            {selected && <Check className="absolute inset-0 m-auto h-3.5 w-3.5 text-black/70" />}
          </button>
        );
      })}
    </div>
  );
}