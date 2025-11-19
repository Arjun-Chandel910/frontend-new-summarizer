import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const tl = useRef(null);

  // Create GSAP timeline once
  useEffect(() => {
    if (!menuRef.current) return;

    tl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "40%", opacity: 1, duration: 0.4, ease: "power3.out" }
      );
  }, []);

  // Play / reverse on state change
  useEffect(() => {
    if (!tl.current) return;
    if (open) tl.current.play();
    else tl.current.reverse();
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 z-5000 w-full pointer-events-none">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 px-4 pointer-events-auto">
        {/* LEFT: Summarizer glass pill */}
        <div
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-50
                     bg-white/10 border border-white/25 shadow-lg shadow-black/30
                     backdrop-blur-xl backdrop-saturate-150"
        >
          Summarizer
        </div>

        {/* DESKTOP: center + right pills */}
        <div className="hidden md:flex items-center justify-between gap-4 flex-1">
          {/* CENTER: Product + Pricing (both glass) */}
          <div className="flex items-center gap-2 rounded-full px-3 py-2 bg-white/5 border border-white/15 shadow-lg shadow-black/30 backdrop-blur-xl backdrop-saturate-150">
            <button
              className="px-4 py-1.5 text-sm rounded-full text-slate-100
                         bg-white/10 hover:bg-white/20
                         border border-white/20
                         backdrop-blur-xl transition-colors"
            >
              Product
            </button>
            <button
              className="px-4 py-1.5 text-sm rounded-full text-amber-50
                         bg-amber-400/25 hover:bg-amber-400/35
                         border border-amber-200/60 shadow-md shadow-amber-500/40
                         backdrop-blur-xl transition-colors"
            >
              Pricing
            </button>
          </div>

          {/* RIGHT: About + Contact (glass pills) */}
          <div className="flex items-center gap-2 rounded-full px-3 py-2 bg-white/5 border border-white/15 shadow-lg shadow-black/30 backdrop-blur-xl backdrop-saturate-150">
            <button
              className="px-4 py-1.5 text-sm rounded-full text-slate-100
                         bg-white/10 hover:bg-white/20
                         border border-white/20
                         backdrop-blur-xl transition-colors"
            >
              About
            </button>
            <button
              className="px-4 py-1.5 text-sm rounded-full text-slate-100
                         bg-white/10 hover:bg-white/20
                         border border-white/20
                         backdrop-blur-xl transition-colors"
            >
              Contact
            </button>
          </div>
        </div>

        {/* MOBILE: hamburger */}
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center
                     rounded-full bg-white/10 border border-white/25
                     shadow-lg shadow-black/30 backdrop-blur-xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-4 rounded bg-slate-100"></span>
            <span className="block h-0.5 w-4 rounded bg-slate-100"></span>
            <span className="block h-0.5 w-4 rounded bg-slate-100"></span>
          </div>
        </button>
      </div>

      {/* MOBILE MENU: glass panel sliding from right */}
      <div className="md:hidden mt-3 px-4 pointer-events-none">
        <div
          ref={menuRef}
          className="ml-auto max-w-xs space-y-2 rounded-3xl p-3
                     bg-white/10 border border-white/20
                     shadow-xl shadow-black/40 backdrop-blur-2xl backdrop-saturate-150
                     pointer-events-auto"
          style={{ transform: "translateX(100%)", opacity: 0 }}
        >
          <button
            className="w-full px-4 py-2 text-sm rounded-full text-slate-100
                       bg-white/10 hover:bg-white/20
                       border border-white/20
                       backdrop-blur-xl text-left transition-colors"
          >
            Product
          </button>
          <button
            className="w-full px-4 py-2 text-sm rounded-full text-amber-50
                       bg-amber-400/25 hover:bg-amber-400/35
                       border border-amber-200/70 shadow-md shadow-amber-500/40
                       backdrop-blur-xl text-left transition-colors"
          >
            Pricing
          </button>
          <button
            className="w-full px-4 py-2 text-sm rounded-full text-slate-100
                       bg-white/10 hover:bg-white/20
                       border border-white/20
                       backdrop-blur-xl text-left transition-colors"
          >
            About
          </button>
          <button
            className="w-full px-4 py-2 text-sm rounded-full text-slate-100
                       bg-white/10 hover:bg-white/20
                       border border-white/20
                       backdrop-blur-xl text-left transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
