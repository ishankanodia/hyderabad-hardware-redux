import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToggleLeft, ToggleRight, Sparkles, Sliders, Info, Eye, Download } from 'lucide-react';

// Configurations
const frameFinishes = [
  { id: 'black', name: 'Nero Matt', hex: '#1A1A1A', border: '#2A2A2A', text: 'text-zinc-400', gradient: 'from-[#1A1A1A] to-[#2E2E2E]' },
  { id: 'gold', name: 'Oro Brass', hex: '#D4AF37', border: '#B8901C', text: 'text-amber-500', gradient: 'from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11]' },
  { id: 'bronze', name: 'Bronzo Matte', hex: '#7C5B3F', border: '#5A402A', text: 'text-orange-700', gradient: 'from-[#7C5B3F] via-[#A68064] to-[#593E27]' },
  { id: 'champagne', name: 'Champagne Gold', hex: '#E3D6C1', border: '#CABA94', text: 'text-[#CABA94]', gradient: 'from-[#ebdcb9] via-[#f7f2e5] to-[#caba94]' },
];

const glassTints = [
  { id: 'clear', name: 'Vetro Chiaro (Clear)', bg: 'bg-cyan-500/5 border-white/10 backdrop-blur-[0.5px]', description: 'Pure transparency, high visibility.' },
  { id: 'smoked', name: 'Vetro Fumé (Smoked)', bg: 'bg-zinc-950/70 border-white/5 backdrop-blur-[1px]', description: 'Sultry, low-translucency slate glass.' },
  { id: 'bronze', name: 'Vetro Bronzo (Bronze)', bg: 'bg-[#5c4033]/35 border-white/10 backdrop-blur-[1px]', description: 'Warm copper tone glass.' },
  { id: 'fluted', name: 'Vetro Cannettato (Fluted)', bg: 'bg-zinc-900/15 backdrop-blur-[4px]', isFluted: true, description: 'Textured vertical ribbing for privacy.' },
];

const internalCabinets = [
  { id: 'charcoal', name: 'Charcoal Oak', bg: 'bg-gradient-to-br from-[#18181b] to-[#09090b]', text: 'text-zinc-500', handle: 'bg-zinc-800' },
  { id: 'walnut', name: 'Royal Walnut', bg: 'bg-gradient-to-br from-[#3b2314] to-[#1e1109]', text: 'text-[#855e42]', handle: 'bg-[#4a2e1b]' },
  { id: 'linen', name: 'Sand Linen', bg: 'bg-gradient-to-br from-[#272522] to-[#1a1917]', text: 'text-zinc-600', handle: 'bg-zinc-800' },
];

export const WardrobeVisualizer = () => {
  const [selectedFrame, setSelectedFrame] = useState(frameFinishes[0]);
  const [selectedGlass, setSelectedGlass] = useState(glassTints[0]);
  const [selectedInternal, setSelectedInternal] = useState(internalCabinets[0]);
  const [ledOn, setLedOn] = useState(true);
  const [doorOpen, setDoorOpen] = useState(false);

  return (
    <section className="py-24 relative bg-background overflow-hidden border-t border-border/50">
      {/* Background Decorative glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase block mb-3">
            Premium Wardrobe System
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
            Slim-Frame Profile <span className="text-gradient-metal">Visualizer</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground">
            Configure your custom Italian wardrobe. Toggle metal finishes, glass selections, and LED lighting in real time. Click the door to slide it open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Panel: Configuration Controls (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-8 bg-[#0b121f]/60 border border-border/80 p-8 rounded-sm backdrop-blur-sm shadow-xl">
            
            {/* 1. Frame Finish */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono uppercase tracking-widest text-primary font-bold">1. Aluminum Frame Finish</label>
                <span className="text-xs text-muted-foreground font-medium">{selectedFrame.name}</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {frameFinishes.map((frame) => {
                  const isActive = selectedFrame.id === frame.id;
                  return (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame)}
                      className={`relative aspect-square rounded-sm border flex flex-col items-center justify-between p-2 transition-all ${
                        isActive 
                          ? 'border-primary bg-primary/10 shadow-[0_0_12px_rgba(212,163,89,0.25)]' 
                          : 'border-border bg-[#070b14] hover:border-muted-foreground/45'
                      }`}
                      title={frame.name}
                    >
                      {/* Color dot */}
                      <div 
                        className="w-6 h-6 rounded-full border border-white/10" 
                        style={{ backgroundColor: frame.hex }}
                      />
                      <span className="text-[9px] font-sans font-bold text-center leading-none mt-1 text-foreground">
                        {frame.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Glass Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono uppercase tracking-widest text-primary font-bold">2. Glass Panel Style</label>
                <span className="text-xs text-muted-foreground font-medium">{selectedGlass.name}</span>
              </div>
              <div className="space-y-2.5">
                {glassTints.map((glass) => {
                  const isActive = selectedGlass.id === glass.id;
                  return (
                    <button
                      key={glass.id}
                      onClick={() => setSelectedGlass(glass)}
                      className={`w-full flex items-center gap-4 p-3 border rounded-sm transition-all text-left ${
                        isActive 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border bg-[#070b14] hover:border-border/80 hover:bg-[#070b14]/50'
                      }`}
                    >
                      {/* Glass Texture Preview circle */}
                      <div className={`w-8 h-8 rounded-full border border-white/20 shrink-0 relative overflow-hidden ${glass.bg}`}>
                        {glass.isFluted && (
                          <div 
                            className="absolute inset-0"
                            style={{
                              backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1.5px, transparent 1.5px, transparent 5px)',
                            }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">{glass.name}</h4>
                        <p className="text-[10px] text-muted-foreground">{glass.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Internal Cabinet Material */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono uppercase tracking-widest text-primary font-bold">3. Cabinet Carcass Wood</label>
                <span className="text-xs text-muted-foreground font-medium">{selectedInternal.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {internalCabinets.map((cabinet) => {
                  const isActive = selectedInternal.id === cabinet.id;
                  return (
                    <button
                      key={cabinet.id}
                      onClick={() => setSelectedInternal(cabinet)}
                      className={`p-2.5 border rounded-sm text-center transition-all ${
                        isActive 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-[#070b14] hover:border-border/80'
                      }`}
                    >
                      {/* Wooden sample texture simulation */}
                      <div className={`w-full h-8 rounded-sm mb-1.5 ${cabinet.bg} border border-white/5 shadow-inner`} />
                      <span className="text-[10px] font-sans font-bold text-foreground">{cabinet.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Lighting and Door Action */}
            <div className="pt-4 border-t border-border flex justify-between gap-6">
              <div className="flex-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">Internal LED Light</label>
                <button
                  onClick={() => setLedOn(!ledOn)}
                  className="flex items-center gap-2 px-3 py-2 bg-secondary border border-border hover:border-border/80 rounded-sm text-xs font-semibold w-full text-foreground justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${ledOn ? 'bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]' : 'bg-zinc-600'}`} />
                    Warm White (2700K)
                  </span>
                  {ledOn ? <ToggleRight className="w-5 h-5 text-primary" /> : <ToggleLeft className="w-5 h-5 text-zinc-500" />}
                </button>
              </div>

              <div className="flex-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">Wardrobe Door</label>
                <button
                  onClick={() => setDoorOpen(!doorOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-secondary border border-border hover:border-border/80 rounded-sm text-xs font-semibold w-full text-foreground justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    {doorOpen ? 'Slid Open' : 'Closed'}
                  </span>
                  {doorOpen ? <ToggleRight className="w-5 h-5 text-primary" /> : <ToggleLeft className="w-5 h-5 text-zinc-500" />}
                </button>
              </div>
            </div>

          </div>

          {/* Right Panel: The Wardrobe Render (lg:col-span-7) */}
          <div className="lg:col-span-7 flex justify-center">
            
            {/* Wardrobe Outer Shell Container */}
            <div className="w-[330px] md:w-[380px] h-[550px] bg-[#03060a] border-[8px] border-[#070b14] rounded-sm relative shadow-2xl flex overflow-hidden">
              
              {/* Outer frame structure outlines */}
              <div className="absolute inset-0 border border-white/5 pointer-events-none z-30" />

              {/* INTERNAL WARDROBE BAY (Left and Right halves) */}
              <div className={`absolute inset-0 flex transition-all duration-500 ${selectedInternal.bg}`}>
                
                {/* Vertical Divider in the center */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 bg-[#0d0e12]/80 border-x border-white/5 z-10" />

                {/* Vertical LED Strip lighting down the sides */}
                {ledOn && (
                  <>
                    {/* Left LED strip */}
                    <div className="absolute left-1.5 top-2 bottom-2 w-1.5 bg-[#fef3c7]/65 blur-[2.5px] shadow-[0_0_12px_#fbbf24,0_0_24px_#fbbf24] z-10" />
                    {/* Right LED strip */}
                    <div className="absolute right-1.5 top-2 bottom-2 w-1.5 bg-[#fef3c7]/65 blur-[2.5px] shadow-[0_0_12px_#fbbf24,0_0_24px_#fbbf24] z-10" />
                    
                    {/* Soft glowing wash across cabinet */}
                    <div className="absolute inset-0 bg-amber-500/5 mix-blend-screen pointer-events-none z-10" />
                  </>
                )}

                {/* ================= LEFT BAY (Wardrobe Side with Hanger Rod + Shelf) ================= */}
                <div className="w-1/2 h-full relative p-4 border-r border-white/5 flex flex-col justify-between">
                  {/* Top Shelf */}
                  <div className="absolute left-0 right-0 top-[60px] h-3 bg-secondary border-y border-white/10 shadow-lg" />
                  
                  {/* Hanger Rod */}
                  <div className="absolute left-2 right-2 top-[80px] h-2 bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 rounded-full" />
                  
                  {/* Clothes hanging vector items */}
                  <div className="absolute left-4 right-4 top-[87px] flex justify-around opacity-85 select-none pointer-events-none">
                    {/* Coat 1 */}
                    <svg width="28" height="60" viewBox="0 0 28 60" className="drop-shadow-lg">
                      <path d="M14,0 L14,6 M14,6 L2,12 M14,6 L26,12" stroke="#d4af37" strokeWidth="1" fill="none" />
                      <path d="M3,12 L25,12 L24,55 L4,55 Z" fill="#2d2a29" stroke="#1c1a19" strokeWidth="1" />
                      <line x1="14" y1="12" x2="14" y2="55" stroke="#1c1a19" strokeWidth="1.5" />
                    </svg>
                    {/* Coat 2 */}
                    <svg width="28" height="62" viewBox="0 0 28 62" className="drop-shadow-lg">
                      <path d="M14,0 L14,6 M14,6 L2,12 M14,6 L26,12" stroke="#a1a1aa" strokeWidth="1" fill="none" />
                      <path d="M4,12 L24,12 L25,58 L3,58 Z" fill="#52525b" stroke="#3f3f46" strokeWidth="1" />
                    </svg>
                    {/* Dress 3 */}
                    <svg width="24" height="65" viewBox="0 0 24 65" className="drop-shadow-lg">
                      <path d="M12,0 L12,6 M12,6 L2,12 M12,6 L22,12" stroke="#d4af37" strokeWidth="1" fill="none" />
                      <path d="M4,12 C6,20 2,30 2,45 L22,45 C22,30 18,20 20,12 Z" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Middle shelf divider */}
                  <div className="absolute left-0 right-0 top-[260px] h-3 bg-secondary border-y border-white/10 shadow-lg" />
                  {/* Shelf display items */}
                  <div className="absolute left-4 right-4 top-[235px] flex justify-center gap-3 select-none pointer-events-none">
                    {/* Designer Bag */}
                    <svg width="24" height="20" viewBox="0 0 24 20">
                      <path d="M6,6 Q12,0 18,6" fill="none" stroke="#d4af37" strokeWidth="1.5" />
                      <rect x="3" y="6" width="18" height="14" rx="2" fill="#52525b" stroke="#3f3f46" strokeWidth="1" />
                      <circle cx="12" cy="12" r="2.5" fill="#d4af37" />
                    </svg>
                  </div>

                  {/* Bottom drawers */}
                  <div className="absolute bottom-4 left-3 right-3 space-y-2">
                    <div className="h-14 bg-[#0d0e12]/80 border border-white/5 rounded-sm relative flex items-center justify-center">
                      <div className="absolute left-2 right-2 top-2 bottom-2 border border-white/5 border-dashed" />
                      {/* Sleek handle aligned with chosen finish */}
                      <div className="absolute bottom-3 w-10 h-1 rounded-full transition-colors" style={{ backgroundColor: selectedFrame.hex }} />
                    </div>
                    <div className="h-14 bg-[#0d0e12]/80 border border-white/5 rounded-sm relative flex items-center justify-center">
                      <div className="absolute left-2 right-2 top-2 bottom-2 border border-white/5 border-dashed" />
                      <div className="absolute bottom-3 w-10 h-1 rounded-full transition-colors" style={{ backgroundColor: selectedFrame.hex }} />
                    </div>
                  </div>
                </div>

                {/* ================= RIGHT BAY (Wardrobe Side with Multi-Shelves) ================= */}
                <div className="w-1/2 h-full relative p-4 flex flex-col justify-between">
                  {/* Multiple shelving structure */}
                  <div className="absolute left-0 right-0 top-[100px] h-2.5 bg-secondary border-y border-white/10 shadow" />
                  <div className="absolute left-0 right-0 top-[210px] h-2.5 bg-secondary border-y border-white/10 shadow" />
                  <div className="absolute left-0 right-0 top-[320px] h-2.5 bg-secondary border-y border-white/10 shadow" />
                  <div className="absolute left-0 right-0 top-[430px] h-2.5 bg-secondary border-y border-white/10 shadow" />

                  {/* Shelf display items */}
                  {/* Shelf 1 items */}
                  <div className="absolute left-4 right-4 top-[65px] flex justify-center gap-4 select-none pointer-events-none">
                    {/* Folded clothes stacks */}
                    <div className="w-9 h-5 bg-[#3f3f46] rounded-sm border-b border-[#27272a] shadow" />
                    <div className="w-10 h-6 bg-[#71717a] rounded-sm border-b border-[#52525b] shadow" />
                  </div>

                  {/* Shelf 2 items */}
                  <div className="absolute left-4 right-4 top-[175px] flex justify-center gap-4 select-none pointer-events-none">
                    <div className="w-12 h-6 bg-[#a1a1aa] rounded-sm border-b border-[#71717a] shadow" />
                    <div className="w-8 h-5 bg-[#3f3f46] rounded-sm border-b border-[#27272a] shadow" />
                  </div>

                  {/* Shelf 3 items (Luxury Shoe/Box displays) */}
                  <div className="absolute left-4 right-4 top-[285px] flex justify-around select-none pointer-events-none">
                    {/* Shoe boxes */}
                    <div className="w-10 h-6 bg-stone-900 border border-stone-800 rounded-sm relative flex items-center justify-center">
                      <span className="text-[5px] text-stone-500 font-mono">VESTA</span>
                    </div>
                    <div className="w-10 h-6 bg-stone-900 border border-stone-800 rounded-sm relative flex items-center justify-center">
                      <span className="text-[5px] text-stone-500 font-mono">VESTA</span>
                    </div>
                  </div>

                  {/* Shelf 4 items (Premium Storage Containers) */}
                  <div className="absolute left-3 right-3 top-[385px] flex justify-around select-none pointer-events-none">
                    {/* Premium organizer drawers */}
                    <div className="w-16 h-10 bg-secondary/80 border border-white/5 rounded-sm relative flex items-center justify-center">
                      <div className="absolute top-1.5 w-6 h-1 bg-[#1e293b] rounded-full" />
                      <div className="w-12 h-0.5 bg-white/5 mt-4" />
                    </div>
                    <div className="w-16 h-10 bg-secondary/80 border border-white/5 rounded-sm relative flex items-center justify-center">
                      <div className="absolute top-1.5 w-6 h-1 bg-[#1e293b] rounded-full" />
                      <div className="w-12 h-0.5 bg-white/5 mt-4" />
                    </div>
                  </div>
                </div>

              </div>

              {/* GLASS SLIDING DOORS OVERLAY */}
              {/* Left Door Panel (Static / Behind) */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-[50.2%] border-r-[2.5px] border-y-[3.5px] border-l-[3.5px] z-20 transition-all duration-300 flex flex-col justify-between ${selectedGlass.bg}`}
                style={{ borderColor: selectedFrame.hex }}
              >
                {/* Fluted lines overlay if Vetro Cannettato is active */}
                {selectedGlass.isFluted && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2.5px, transparent 2.5px, transparent 9px)',
                    }}
                  />
                )}

                {/* Diagonal Reflection Glass Sheen */}
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.03) 100%)'
                  }}
                />

                {/* Slim Metal Frame Handle inside */}
                <div className="absolute right-1 top-4 bottom-4 w-1 rounded-sm" style={{ backgroundColor: selectedFrame.hex }} />
              </div>

              {/* Right Sliding Door Panel (Animates position based on doorOpen state) */}
              <motion.div 
                animate={{ x: doorOpen ? '-92%' : '0%' }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className={`absolute left-[50%] top-0 bottom-0 w-[50%] border-l-[2.5px] border-y-[3.5px] border-r-[3.5px] z-20 flex flex-col justify-between shadow-2xl cursor-pointer ${selectedGlass.bg}`}
                style={{ borderColor: selectedFrame.hex }}
                onClick={() => setDoorOpen(!doorOpen)}
              >
                {/* Fluted lines overlay if Vetro Cannettato is active */}
                {selectedGlass.isFluted && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2.5px, transparent 2.5px, transparent 9px)',
                    }}
                  />
                )}

                {/* Diagonal Reflection Glass Sheen */}
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.04) 100%)'
                  }}
                />

                {/* Long Slim Profile Handle (Astronea signature) */}
                <div 
                  className="absolute left-1 top-4 bottom-4 w-1.5 rounded-sm shadow-md transition-colors"
                  style={{ backgroundColor: selectedFrame.hex }}
                />
              </motion.div>

              {/* Drag instruction overlay when closed */}
              {!doorOpen && (
                <div className="absolute right-6 top-[40%] bg-black/70 border border-primary/30 py-2 px-3.5 rounded-sm pointer-events-none z-30 text-center max-w-[130px] animate-wa-ping">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">Slide Open →</p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
          <div className="p-4 bg-[#0b121f]/30 border border-border/50 rounded-sm">
            <span className="text-primary font-serif text-lg">Italian Aesthetics</span>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Designed with ultra-narrow vertical profiles (12mm) to maximize the clean glass surface and showcase interior styling.
            </p>
          </div>
          <div className="p-4 bg-[#0b121f]/30 border border-border/50 rounded-sm">
            <span className="text-primary font-serif text-lg">Air Hinges Integration</span>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Fully concealed Italian pivoting soft-close hardware milled flush into the cabinet top and floor frames.
            </p>
          </div>
          <div className="p-4 bg-[#0b121f]/30 border border-border/50 rounded-sm">
            <span className="text-primary font-serif text-lg">Smart Ambient Lighting</span>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Integrated vertical LED strip channels featuring micro-prismatic diffusers for smooth dot-free warm illumination.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
