"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  Crosshair,
  User,
} from "lucide-react";

const products = [
  {
    name: "Endgame Gear OP1 8K",
    price: 7499,
    img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
  },
  {
    name: "Lamzu Atlantis OG V2 4K",
    price: 9299,
    img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop",
  },
  {
    name: "Pulsar X2H Mini",
    price: 9499,
    img: "https://images.unsplash.com/photo-1616071357740-9ceb8ecb534f?w=400&h=400&fit=crop",
  },
  {
    name: "Glorious Model O 2 Wired",
    price: 5299,
    img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop",
  },
  {
    name: "HyperX Pulsefire Haste 2",
    price: 7999,
    img: "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?w=400&h=400&fit=crop",
  },
  {
    name: "Corsair M75 Air Wireless",
    price: 9999,
    img: "https://images.unsplash.com/photo-1615680022647-99c397cbcaea?w=400&h=400&fit=crop",
  },
];

const clip = {
  clipPath:
    "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)",
};

export default function CompetitiveHud() {
  const [hover, setHover] = useState(null);

  return (
    <div
      className="min-h-screen bg-[#0B0D10] text-[#E7E9EA]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');`}</style>

      <header className="flex items-center justify-between px-8 py-4 border-b border-[#1E2226]">
        <div
          className="flex items-center gap-2"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          <Crosshair className="w-5 h-5 text-[#C6FF3D]" />
          <span className="text-xl font-bold tracking-wide">
            GAMING STORE <span className="text-[#C6FF3D]">XYZ</span>
          </span>
        </div>
        <div className="flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B6167]" />
          <input
            placeholder="Search for products..."
            className="w-full bg-[#14171A] border border-[#242830] rounded-sm pl-9 py-2 text-sm outline-none focus:border-[#C6FF3D] placeholder:text-[#5B6167]"
          />
        </div>
        <div className="flex items-center gap-5 text-sm">
          <User className="w-4 h-4 text-[#9BA0A6]" />
          <span className="text-[#9BA0A6]">Logout</span>
          <div className="flex items-center gap-1.5 bg-[#C6FF3D] text-[#0B0D10] rounded-sm px-2.5 py-1.5 font-bold">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>0</span>
          </div>
        </div>
      </header>

      <nav
        className="flex gap-8 px-8 py-3 border-b border-[#1E2226] text-sm font-semibold"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {["Gaming", "Streaming", "Components", "PC Builds", "Monitors"].map(
          (c) => (
            <span
              key={c}
              className="cursor-pointer tracking-wide text-[#C7CACD] hover:text-[#C6FF3D] transition-colors"
            >
              {c.toUpperCase()}
            </span>
          ),
        )}
      </nav>

      <div className="flex">
        <aside className="w-64 shrink-0 border-r border-[#1E2226] px-6 py-8">
          {[
            "Polling Rate",
            "Connectivity",
            "RGB",
            "Mouse Weight",
            "DPI",
            "FPI",
          ].map((f) => (
            <div
              key={f}
              className="border-b border-[#1E2226] py-3.5 flex items-center justify-between text-sm text-[#C7CACD]"
            >
              <span>{f}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5B6167]" />
            </div>
          ))}
        </aside>

        <main className="flex-1 px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-[#9BA0A6]">
              <span className="text-[#C6FF3D] font-bold">
                {products.length}
              </span>{" "}
              results
            </span>
            <div className="flex items-center gap-2 text-sm text-[#9BA0A6]">
              Sort by:{" "}
              <span className="text-[#E7E9EA] font-semibold">Latest</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.name}
                onMouseEnter={() => setHover(p.name)}
                onMouseLeave={() => setHover(null)}
                className="relative bg-[#14171A] border border-[#242830]"
                style={clip}
              >
                {hover === p.name && (
                  <Crosshair className="absolute top-3 right-3 w-4 h-4 text-[#C6FF3D] z-10" />
                )}
                <div className="aspect-square bg-[#1A1D21] overflow-hidden relative">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/60 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <div
                    className="font-semibold text-sm mb-2 leading-snug"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {p.name.toUpperCase()}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-bold text-[#C6FF3D] text-sm"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      ${p.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] tracking-widest text-[#5B6167]">
                      DETAILS →
                    </span>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#C6FF3D]"
                  style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              className="text-sm font-bold tracking-widest text-[#0B0D10] bg-[#C6FF3D] px-8 py-3 hover:brightness-110 transition-all"
              style={{ fontFamily: "'Rajdhani', sans-serif", ...clip }}
            >
              LOAD MORE
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
