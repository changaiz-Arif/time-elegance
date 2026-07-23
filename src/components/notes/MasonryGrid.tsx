import type { ReactNode } from "react";

export function MasonryGrid({ children }: { children: ReactNode }) {
  return (
    <div
      className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]"
    >
      {children}
    </div>
  );
}