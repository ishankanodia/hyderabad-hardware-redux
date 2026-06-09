import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Play, Sparkles, Sliders, RefreshCw, HelpCircle, Hand } from 'lucide-react';

export const MotionSimulator = () => {
  // Aventos State
  const [aventosOpen, setAventosOpen] = useState(false);

  // Tip-on State
  // 'closed' | 'pushing' | 'open'
  const [tiponState, setTiponState] = useState<'closed' | 'pushing' | 'open'>('closed');

  // Blumotion State
  const dragX = useMotionValue(160); // start open so user sees it
  const [drawerX, setDrawerX] = useState(160);
  const [isSlamming, setIsSlamming] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  // Sync motion value with React state for drawing calculations
  useEffect(() => {
    const unsubscribe = dragX.on('change', (latest) => {
      setDrawerX(latest);
    });
    return () => unsubscribe();
  }, [dragX]);

  // Aventos lift arm calculations (side profile)
  const armEndX = aventosOpen ? 220 + 80 * Math.sin(-60 * Math.PI / 180) : 220;
  const armEndY = aventosOpen ? 30 + 80 * Math.cos(-60 * Math.PI / 180) : 110;

  // Handle Tip-on push sequence
  const handleTiponClick = () => {
    if (tiponState === 'closed') {
      setTiponState('pushing');
      setTimeout(() => {
        setTiponState('open');
      }, 120);
    } else if (tiponState === 'open') {
      setTiponState('closed');
    }
  };

  // Drawer X position for Tip-on based on state
  const getTiponX = () => {
    switch (tiponState) {
      case 'pushing':
        return -5;
      case 'open':
        return 60;
      case 'closed':
      default:
        return 0;
    }
  };

  // Handle Blumotion drag release
  const handleDragEnd = (event: any, info: any) => {
    if (isSlamming) return;
    const currentPos = dragX.get();
    const velocity = info.velocity.x;

    // If released moving left or close to closed state (< 80px)
    if (currentPos < 80 || velocity < -150) {
      // Trigger Blumotion soft close
      animate(dragX, 0, {
        type: 'tween',
        ease: [0.25, 1, 0.5, 1], // slow down cushion
        duration: 0.9,
        onComplete: () => {
          setRippleActive(true);
          setTimeout(() => setRippleActive(false), 800);
        }
      });
    } else {
      // Snap to fully open
      animate(dragX, 160, {
        type: 'spring',
        stiffness: 150,
        damping: 18
      });
    }
  };

  // Trigger Blumotion "Slam & Soft-Close" demo
  const triggerSlamDemo = () => {
    if (isSlamming) return;
    setIsSlamming(true);
    
    // First ensure drawer is fully open
    dragX.set(160);
    
    // Slam simulation:
    // Move from 160 to 45 extremely fast (0.2s), then catch and slow down from 45 to 0 (0.8s)
    animate(dragX, [160, 45, 0], {
      duration: 1.0,
      times: [0, 0.2, 1],
      easings: ['easeIn', 'easeOut'],
      onComplete: () => {
        setIsSlamming(false);
        setRippleActive(true);
        setTimeout(() => setRippleActive(false), 800);
      }
    });
  };

  // Reset drawer to open
  const resetDrawer = () => {
    animate(dragX, 160, {
      type: 'spring',
      stiffness: 120,
      damping: 15
    });
  };

  return (
    <section className="py-20 relative bg-background/50 border-y border-border/50">
      {/* Decorative Blueprint Background Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(rgba(212,163,89,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,163,89,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase block mb-3">
            Interactive Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
            Motion & Soft-Close <span className="text-gradient-metal">Simulator</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground">
            Interact with our simulated mechanisms below to experience Blum's world-class physics. 
            Click, drag, or slam the components to see BLUMOTION cushioning in action.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: AVENTOS Lift System */}
          <div className="bg-[#0b121f] border border-primary/15 rounded-sm p-6 flex flex-col justify-between shadow-2xl relative group hover:border-primary/30 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 text-[9px] bg-primary/10 text-primary border border-primary/20 rounded-sm font-semibold tracking-wider uppercase">
                  Aventos HF
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/60">BI-FOLD LIFT</span>
              </div>
              <h3 className="text-xl font-serif text-foreground mt-3">AVENTOS Lift System</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Bi-fold door folds upward, providing full clearance overhead. Click the door or the trigger button to toggle the soft-close lift action.
              </p>
            </div>

            {/* Interactive Area */}
            <div className="my-8 h-48 bg-[#070b14] border border-border/60 rounded-sm relative flex items-center justify-center overflow-hidden cursor-pointer"
                 onClick={() => setAventosOpen(!aventosOpen)}>
              
              {/* Cabinet outline (Side View) */}
              <svg viewBox="0 0 300 220" className="w-full h-full p-2 select-none">
                {/* Metallic Linear Gradients */}
                <defs>
                  <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8d94a2" />
                    <stop offset="50%" stopColor="#cbd2e1" />
                    <stop offset="100%" stopColor="#5d6371" />
                  </linearGradient>
                  <linearGradient id="glowGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#7c5b3f" />
                  </linearGradient>
                </defs>

                {/* Cabinet Back and Frame */}
                <path d="M 60,30 L 220,30 L 220,190 L 60,190" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                <line x1="60" y1="110" x2="220" y2="110" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />

                {/* Inside shelving items (decorative outline) */}
                <rect x="70" y="60" width="30" height="40" rx="1" stroke="#334155" strokeWidth="1" fill="none" className="opacity-40" />
                <rect x="110" y="75" width="45" height="25" rx="1" stroke="#334155" strokeWidth="1" fill="none" className="opacity-40" />
                <circle cx="100" cy="150" r="15" stroke="#334155" strokeWidth="1" fill="none" className="opacity-40" />

                {/* Cabinet hinges */}
                <circle cx="220" cy="30" r="4" fill="#475569" />

                {/* Simulated Scissor Lift Arm (draws from wall to door hinge) */}
                <motion.line 
                  x1="120" 
                  y1="100" 
                  x2={armEndX} 
                  y2={armEndY} 
                  stroke="url(#glowGold)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  animate={{ opacity: aventosOpen ? 0.9 : 0.4 }}
                  transition={{ type: 'spring', stiffness: aventosOpen ? 100 : 70, damping: aventosOpen ? 18 : 12 }}
                />
                <motion.circle 
                  cx="120" 
                  cy="100" 
                  r="3.5" 
                  fill="#7c5b3f" 
                />
                <motion.circle 
                  cx={armEndX} 
                  cy={armEndY} 
                  r="3.5" 
                  fill="#d4af37" 
                  animate={{ scale: aventosOpen ? 1.2 : 1 }}
                />

                {/* Top Hinge Door Panel Assembly */}
                <g transform="translate(220, 30)">
                  <motion.g
                    animate={{ rotate: aventosOpen ? -60 : 0 }}
                    transition={{ type: 'spring', stiffness: aventosOpen ? 100 : 70, damping: aventosOpen ? 18 : 12 }}
                    style={{ transformOrigin: '0px 0px' }}
                  >
                    {/* Top Panel Door line */}
                    <line x1="0" y1="0" x2="0" y2="80" stroke="url(#metalGradient)" strokeWidth="5" strokeLinecap="round" />
                    
                    {/* Middle Hinge pin */}
                    <circle cx="0" cy="80" r="2.5" fill="#d4af37" />

                    {/* Bottom Panel Door line */}
                    <motion.g
                      transform="translate(0, 80)"
                      animate={{ rotate: aventosOpen ? 85 : 0 }}
                      transition={{ type: 'spring', stiffness: aventosOpen ? 100 : 70, damping: aventosOpen ? 18 : 12 }}
                      style={{ transformOrigin: '0px 0px' }}
                    >
                      <line x1="0" y1="0" x2="0" y2="80" stroke="url(#metalGradient)" strokeWidth="5" strokeLinecap="round" />
                      {/* Handle */}
                      <rect x="2.5" y="55" width="3.5" height="18" rx="1" fill="#d4af37" />
                    </motion.g>
                  </motion.g>
                </g>
              </svg>

              {/* Pulsing trigger ring overlay */}
              {!aventosOpen && (
                <div className="absolute right-8 bottom-16 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center animate-pulse">
                  <Hand className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>

            <button
              onClick={() => setAventosOpen(!aventosOpen)}
              className={`w-full py-2.5 rounded-sm text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                aventosOpen 
                  ? 'bg-secondary border-primary/40 text-primary hover:bg-secondary/80' 
                  : 'bg-primary text-primary-foreground border-transparent hover:bg-champagne-dark'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${aventosOpen ? 'animate-spin' : ''}`} />
              {aventosOpen ? 'Trigger Soft-Close' : 'Open Lift System'}
            </button>
          </div>

          {/* Card 2: TIP-ON Drawer */}
          <div className="bg-[#0b121f] border border-primary/15 rounded-sm p-6 flex flex-col justify-between shadow-2xl relative group hover:border-primary/30 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 text-[9px] bg-primary/10 text-primary border border-primary/20 rounded-sm font-semibold tracking-wider uppercase">
                  Tip-On
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/60">PUSH-TO-OPEN</span>
              </div>
              <h3 className="text-xl font-serif text-foreground mt-3">TIP-ON Drawer</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Handle-less mechanical opening. Push the drawer front inward to release the spring mechanism, and push it again to lock it shut.
              </p>
            </div>

            {/* Interactive Area */}
            <div className="my-8 h-48 bg-[#070b14] border border-border/60 rounded-sm relative flex items-center justify-center overflow-hidden cursor-pointer"
                 onClick={handleTiponClick}>
              
              {/* Drawer Side Profile Representation */}
              <svg viewBox="0 0 300 220" className="w-full h-full p-2 select-none">
                {/* Cabinet Box frame outline */}
                <rect x="30" y="50" width="180" height="120" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                
                {/* Drawer Runner rail */}
                <line x1="35" y1="130" x2="260" y2="130" stroke="#334155" strokeWidth="3" strokeLinecap="round" className="opacity-80" />
                
                {/* Moving Drawer Box Container */}
                <motion.g
                  animate={{ x: getTiponX() }}
                  transition={
                    tiponState === 'pushing' 
                      ? { duration: 0.1, ease: 'easeOut' }
                      : tiponState === 'open'
                      ? { type: 'spring', stiffness: 280, damping: 16 }
                      : { type: 'spring', stiffness: 140, damping: 20 }
                  }
                >
                  {/* Inside items */}
                  <rect x="45" y="80" width="120" height="48" rx="2" fill="#111827" stroke="#334155" strokeWidth="1" />
                  <circle cx="80" cy="104" r="12" fill="none" stroke="#1e293b" />
                  <rect x="115" y="94" width="30" height="20" rx="1" fill="none" stroke="#1e293b" />

                  {/* Drawer Box wooden structure */}
                  <path d="M 40,70 L 175,70 L 175,128 L 40,128 Z" fill="#1b2436" stroke="#475569" strokeWidth="1.5" />
                  
                  {/* Drawer Front Panel (Slab) */}
                  <rect x="175" y="62" width="8" height="76" rx="1" fill="url(#metalGradient)" stroke="#d4af37" strokeWidth="0.5" />

                  {/* Tip-On Unit Mechanism inside cabinet */}
                  <rect x="35" y="115" width="40" height="8" fill="#475569" rx="0.5" />
                  <motion.rect 
                    x="75" 
                    y="117" 
                    width="15" 
                    height="4" 
                    fill="#d4af37"
                    animate={{ x: tiponState === 'open' ? 10 : tiponState === 'pushing' ? -4 : 0 }}
                    transition={{ duration: 0.15 }}
                  />
                </motion.g>

                {/* Status Glow Indicators */}
                <circle cx="270" cy="30" r="5" fill={tiponState === 'open' ? '#10b981' : '#64748b'} className="animate-pulse" />
              </svg>

              {/* Status Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#0b121f] px-2 py-0.5 border border-border/80 rounded-sm">
                <div className={`w-1.5 h-1.5 rounded-full ${tiponState === 'open' ? 'bg-green-500 animate-pulse' : tiponState === 'pushing' ? 'bg-yellow-500' : 'bg-red-400'}`} />
                <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                  {tiponState === 'open' ? 'UNLATCHED' : tiponState === 'pushing' ? 'TRIGGERING' : 'LOCKED'}
                </span>
              </div>

              {/* Push Prompt */}
              {tiponState === 'closed' && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-[#0b121f]/90 border border-primary/40 px-2 py-1 rounded-sm text-center">
                  <p className="text-[9px] font-medium text-foreground tracking-wider uppercase animate-pulse">Tap Front to Push</p>
                </div>
              )}
            </div>

            <button
              onClick={handleTiponClick}
              className="w-full py-2.5 bg-secondary hover:bg-secondary/80 border border-primary/20 hover:border-primary/40 text-foreground rounded-sm text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-3 h-3 text-primary" />
              {tiponState === 'open' ? 'Close & Lock' : 'Simulate Hand Push'}
            </button>
          </div>

          {/* Card 3: BLUMOTION Soft-Close Runner */}
          <div className="bg-[#0b121f] border border-primary/15 rounded-sm p-6 flex flex-col justify-between shadow-2xl relative group hover:border-primary/30 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 text-[9px] bg-primary/10 text-primary border border-primary/20 rounded-sm font-semibold tracking-wider uppercase">
                  Blumotion
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/60">SOFT-CLOSE SLIDE</span>
              </div>
              <h3 className="text-xl font-serif text-foreground mt-3">BLUMOTION Runner</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Experience hydraulic cushioning. Drag the drawer handle right, then release it or slam it shut to watch the soft-close zone absorb the shock.
              </p>
            </div>

            {/* Interactive Area */}
            <div className="my-8 h-48 bg-[#070b14] border border-border/60 rounded-sm relative flex flex-col justify-center items-center overflow-hidden">
              
              {/* Slider Drag Area */}
              <div className="w-full h-full relative">
                
                {/* SVG Rails */}
                <svg viewBox="0 0 300 160" className="absolute inset-0 w-full h-full p-2 select-none pointer-events-none">
                  {/* Fixed outer rail */}
                  <rect x="20" y="115" width="200" height="4" fill="#334155" rx="1" />
                  
                  {/* Hydraulic Blumotion Damper Cylinder */}
                  <rect x="35" y="104" width="40" height="8" fill="#1e293b" stroke="#334155" strokeWidth="1" rx="1" />
                  {/* Fluid cylinder details */}
                  <rect x="71" y="104" width="4" height="8" fill="#d4af37" />
                  
                  {/* Dynamic Piston rod connecting to sliding drawer */}
                  <rect 
                    x="75" 
                    y="106" 
                    width={Math.max(5, drawerX * 0.7 + 5)} 
                    height="4" 
                    fill="#94a3b8" 
                  />

                  {/* Impact Ripple Effect */}
                  {rippleActive && (
                    <circle cx="75" cy="108" r="15" className="fill-none stroke-primary/50 stroke-[1.5] animate-ping" />
                  )}
                </svg>

                {/* Drag Handle & Drawer Body (Uses absolute positioning to map to drawerX) */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 160 }}
                  dragElastic={0.05}
                  dragMomentum={false}
                  onDragEnd={handleDragEnd}
                  style={{ x: dragX }}
                  className="absolute left-20 top-8 w-28 h-20 bg-secondary/80 border border-primary/20 rounded-sm flex items-center justify-center cursor-grab active:cursor-grabbing z-20 group/drawer shadow-lg"
                >
                  {/* Drawer Front panel (Side view outline) */}
                  <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-[#cbd2e1] via-[#8d94a2] to-[#5d6371] rounded-r-sm border-l border-primary/30" />
                  
                  {/* Small gold pull tab */}
                  <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#d4af37] rounded-r-sm group-hover/drawer:bg-white transition-colors" />

                  {/* Wood grain veneer visual */}
                  <div className="text-[9px] font-mono text-primary/50 font-bold select-none uppercase tracking-wider flex items-center gap-1">
                    <Sliders className="w-3 h-3" />
                    Drag Me
                  </div>
                </motion.div>

                {/* Soft-close zone indicator overlay */}
                <div className="absolute left-20 bottom-12 h-6 border-l border-primary/20 border-dashed pointer-events-none" />
                <div className="absolute left-[130px] bottom-12 h-6 border-l border-primary/20 border-dashed pointer-events-none" />
                <div className="absolute left-20 bottom-13 right-[170px] h-4 bg-primary/5 pointer-events-none border-y border-dashed border-primary/10 flex items-center justify-center">
                  <span className="text-[7px] text-primary/60 font-mono uppercase tracking-widest">Damping Zone</span>
                </div>
              </div>

              {/* Metric readout */}
              <div className="absolute bottom-2 left-3 font-mono text-[9px] text-muted-foreground/60 flex gap-3">
                <span>POS: {Math.round(drawerX)}mm</span>
                <span>VEL: {isSlamming ? 'MAX' : 'SYNC'}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={triggerSlamDemo}
                disabled={isSlamming}
                className="flex-1 py-2.5 bg-primary disabled:bg-primary/50 text-primary-foreground font-semibold rounded-sm text-xs transition-all flex items-center justify-center gap-1.5 hover:bg-champagne-dark"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Slam Drawer!
              </button>
              <button
                onClick={resetDrawer}
                disabled={isSlamming}
                className="px-3 py-2.5 bg-secondary border border-border hover:border-muted-foreground/45 rounded-sm transition-all"
                title="Reset Open"
              >
                <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
