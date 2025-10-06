import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function Pagination({ current, total, onChange }) {

  const go = (p) => {
    if (!onChange) return;
    if (p < 1 || p > total || p === current) return;
    onChange(p);
  };

  return (
    <div className="w-full flex justify-center py-6">
      <div className="flex items-center gap-3">
        {Array.from({ length: total }, (_, i) => i + 1).map((p) => {
          const active = p === current;
          return (
            <button
              key={p}
              onClick={() => go(p)}
              className={
                "w-10 h-10 rounded-md border " +
                (active
                  ? "bg-green-900 text-white border-green-900 shadow"
                  : "bg-white text-green-900 hover:bg-green-50 cursor-pointer border-gray-300")
              }
              aria-current={active ? "page" : undefined}
            >
              {p}
            </button>
          );
        })}
        <button
          onClick={() => go(current + 1)}
          disabled={current === total}
          className={
            "w-10 h-10 rounded-md border flex items-center justify-center " +
            (current === total
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white hover:bg-green-50 cursor-pointer text-green-900 border-green-900")
          }
          aria-label="Next page"
        >
          <HiArrowNarrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
