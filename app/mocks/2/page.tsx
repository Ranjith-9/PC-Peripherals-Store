"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  User,
} from "lucide-react";

const products = [
  {
    name: "Endgame Gear OP1 8K",
    price: 7499,
    dpi: "26K",
    poll: "8K",
    weight: "56g",
    img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
  },
  {
    name: "Lamzu Atlantis OG V2 4K",
    price: 9299,
    dpi: "32K",
    poll: "4K",
    weight: "49g",
    img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop",
  },
  {
    name: "Pulsar X2H Mini",
    price: 9499,
    dpi: "26K",
    poll: "1K",
    weight: "52g",
    img: "https://images.unsplash.com/photo-1616071357740-9ceb8ecb534f?w=400&h=400&fit=crop",
  },
  {
    name: "Glorious Model O 2 Wired",
    price: 5299,
    dpi: "26K",
    poll: "1K",
    weight: "59g",
    img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop",
  },
  {
    name: "HyperX Pulsefire Haste 2",
    price: 7999,
    dpi: "26K",
    poll: "8K",
    weight: "61g",
    img: "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?w=400&h=400&fit=crop",
  },
  {
    name: "Corsair M75 Air Wireless",
    price: 9999,
    dpi: "26K",
    poll: "2K",
    weight: "60g",
    img: "https://images.unsplash.com/photo-1615680022647-99c397cbcaea?w=400&h=400&fit=crop",
  },
];

const filters = [
  "Polling Rate",
  "Connectivity",
  "RGB",
  "Mouse Weight",
  "DPI",
  "FPI",
];

export default function BenchmarkLab() {
  const [open, setOpen] = useState("Polling Rate");

  return (
    <div
      className="min-h-screen bg-[#FAFAF7] text-[#14171A]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap');`}</style>

      {/* ruler ticks */}
      <div className="h-3 flex items-end bg-[#FAFAF7] border-b border-[#E5E4DF] px-4">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i % 5 === 0 ? "h-2" : "h-1"} border-l border-[#D8D7D0]`}
          />
        ))}
      </div>

      {/* header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-[#E5E4DF]">
        <div className="flex items-baseline gap-2">
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            GAMING STORE
          </span>
          <span className="font-mono text-[10px] text-[#FF6A3D] font-bold">
            XYZ.LAB
          </span>
        </div>
        <div className="flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B9A94]" />
          <input
            placeholder="search benchmark id, model..."
            className="w-full font-mono text-sm bg-transparent border-b border-[#D8D7D0] pl-6 pb-1 focus:border-[#FF6A3D] outline-none placeholder:text-[#B3B2AC]"
          />
        </div>
        <div className="flex items-center gap-5 text-sm font-mono">
          <User className="w-4 h-4" />
          <span>LOGOUT</span>
          <div className="flex items-center gap-1 border border-[#14171A] rounded px-2 py-1">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="font-bold">0</span>
          </div>
        </div>
      </header>

      {/* category nav */}
      <nav className="flex gap-8 px-8 py-3 border-b border-[#E5E4DF] font-mono text-xs tracking-widest uppercase">
        {["Gaming", "Streaming", "Components", "PC Builds", "Monitors"].map(
          (c) => (
            <span
              key={c}
              className="cursor-pointer hover:text-[#FF6A3D] transition-colors"
            >
              {c}
            </span>
          ),
        )}
      </nav>

      <div className="flex">
        {/* sidebar */}
        <aside className="w-64 shrink-0 border-r border-[#E5E4DF] px-6 py-8">
          <div className="font-mono text-[10px] tracking-widest text-[#9B9A94] mb-4">
            FILTER SPEC —
          </div>
          {filters.map((f) => (
            <div key={f} className="border-b border-[#EDECE7] py-3">
              <button
                onClick={() => setOpen(open === f ? "" : f)}
                className="w-full flex items-center justify-between text-sm font-medium"
              >
                {f}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${open === f ? "rotate-180 text-[#FF6A3D]" : "text-[#9B9A94]"}`}
                />
              </button>
              {open === f && (
                <div className="mt-2 flex flex-col gap-1.5 font-mono text-xs text-[#6B6A63]">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-[#FF6A3D]" />{" "}
                    Option A
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-[#FF6A3D]" />{" "}
                    Option B
                  </label>
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* product grid */}
        <main className="flex-1 px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[10px] tracking-widest text-[#9B9A94]">
              {products.length} UNITS BENCHMARKED
            </span>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#9B9A94]">SORT</span>
              <span className="font-bold border-b border-[#14171A]">
                LATEST
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {products.map((p) => (
              <div
                key={p.name}
                className="group bg-white border border-[#E5E4DF] hover:border-[#FF6A3D] transition-colors"
              >
                <div className="aspect-square bg-[#F1F0EB] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex gap-1.5 mb-2 font-mono text-[9px] text-[#6B6A63]">
                    <span className="border border-[#E5E4DF] px-1.5 py-0.5">
                      {p.dpi} DPI
                    </span>
                    <span className="border border-[#E5E4DF] px-1.5 py-0.5">
                      {p.poll}Hz
                    </span>
                    <span className="border border-[#E5E4DF] px-1.5 py-0.5">
                      {p.weight}
                    </span>
                  </div>
                  <div
                    className="font-semibold text-sm mb-1 leading-snug"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {p.name}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-mono font-bold text-[#FF6A3D]">
                      ${p.price.toLocaleString()}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#9B9A94] group-hover:text-[#FF6A3D] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="font-mono text-xs tracking-widest border border-[#14171A] px-6 py-3 hover:bg-[#14171A] hover:text-white transition-colors">
              LOAD MORE —
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
