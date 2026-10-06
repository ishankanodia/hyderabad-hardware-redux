import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

interface BlueprintSliderProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  type: 'general' | 'blum' | 'astronea';
}

export const BlueprintSlider = ({ title, subtitle, description, image, type }: BlueprintSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Use Motion Value for high-performance split percentage
  const dragXPercent = useMotionValue(50);
  const smoothPercent = useSpring(dragXPercent, { stiffness: 300, damping: 30 });
  const [percentState, setPercentState] = useState(50);

  // Sync state with motion value
  useEffect(() => {
    return smoothPercent.on('change', (latest) => {
      setPercentState(latest);
    });
  }, [smoothPercent]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    dragXPercent.set(percentage);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) {
      handleMove(e.clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0b0c10] border-t border-border/20">
      {/* Background decorations */}
      <div className="absolute top-12 left-12 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> {subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Interactive Slider Card */}
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          className="relative w-full max-w-5xl mx-auto aspect-[16/10] md:aspect-[16/9] rounded-md border border-border/80 bg-card overflow-hidden shadow-elevated select-none cursor-ew-resize group"
        >
          {/* LAYER 1: The Reality (Underlay) */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img
              src={image}
              alt="Completed Showroom Space"
              className="w-full h-full object-cover"
            />
            {/* Vignette bottom shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* LAYER 2: The Blueprint (Overlay with Clip Path) */}
          <motion.div
            style={{
              clipPath: `polygon(0 0, ${percentState}% 0, ${percentState}% 100%, 0 100%)`,
            }}
            className="absolute inset-0 w-full h-full z-10 pointer-events-none bg-[#09152b]"
          >
            {/* Blueprint mechanical drafting grids */}
            <div className="absolute inset-0 bg-grid-pattern opacity-15" />

            {/* Inverted blueprint style schematic background */}
            <img
              src={image}
              alt="CAD Blueprint"
              className="w-full h-full object-cover opacity-20 filter invert grayscale brightness-[1.6] contrast-[1.3]"
            />

            {/* CAD SVG blueprint outlines based on page context type */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 1000 562"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Primary grid borders */}
              <rect x="2%" y="3%" width="96%" height="94%" fill="none" stroke="#d4a359" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.3" />

              {/* Render Blum-specific blueprints (Interactive Machinery & Mechanics) */}
              {type === 'blum' && (
                <>
                  {/* Dimension lines */}
                  <line x1="50" y1="50" x2="950" y2="50" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
                  <text x="500" y="42" fill="#d4a359" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
                    INTERNAL MACHINERY SCANNER: BLUM SYSTEMS
                  </text>
                  
                  {/* 1. Aventos HF Lift Mechanism (Animated) */}
                  {/* Lift Mechanism Outer casing / bracket */}
                  <path d="M 120 120 L 320 120 L 320 230 L 120 230 Z" fill="none" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="5 5" opacity="0.4" />
                  
                  {/* Rotating Power Gear */}
                  <g style={{ transform: `rotate(${percentState * 1.8}deg)`, transformOrigin: '280px 175px' }}>
                    <circle cx="280" cy="175" r="28" fill="none" stroke="#d4a359" strokeWidth="1.2" />
                    {/* Gear teeth */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line
                        key={i}
                        x1="280"
                        y1="142"
                        x2="280"
                        y2="147"
                        stroke="#d4a359"
                        strokeWidth="2.5"
                        style={{ transform: `rotate(${i * 30}deg)`, transformOrigin: '280px 175px' }}
                      />
                    ))}
                    {/* Spokes */}
                    <circle cx="280" cy="175" r="8" fill="none" stroke="#d4a359" strokeWidth="0.8" />
                    <line x1="252" y1="175" x2="308" y2="175" stroke="#d4a359" strokeWidth="0.8" opacity="0.7" />
                    <line x1="280" y1="147" x2="280" y2="203" stroke="#d4a359" strokeWidth="0.8" opacity="0.7" />
                  </g>

                  {/* Helical Tension Spring (Compresses / Expands with slider) */}
                  <g style={{ transform: `scaleX(${0.65 + (100 - percentState) / 285})`, transformOrigin: '140px 175px' }}>
                    <path 
                      d="M 140 175 
                         L 152 155 L 164 195 
                         L 176 155 L 188 195 
                         L 200 155 L 212 195 
                         L 224 155 L 236 195 
                         L 248 175" 
                      fill="none" 
                      stroke="#d4a359" 
                      strokeWidth="2.5" 
                    />
                  </g>
                  {/* Spring mounts */}
                  <circle cx="140" cy="175" r="4" fill="#d4a359" />
                  <circle cx="250" cy="175" r="4" fill="#d4a359" />

                  {/* Hydraulic Soft-Close Damping Piston */}
                  {/* Cylinder body */}
                  <rect x="140" y="202" width="65" height="14" rx="2" fill="none" stroke="#d4a359" strokeWidth="1.2" />
                  {/* Piston shaft moving inside cylinder */}
                  <line 
                    x1="205" 
                    y1="209" 
                    x2={205 + (percentState * 0.45)} 
                    y2="209" 
                    stroke="#d4a359" 
                    strokeWidth="3.5" 
                  />
                  <circle cx={205 + (percentState * 0.45)} cy="209" r="4" fill="#d4a359" />

                  {/* Aventos Leverage Arm (Pivots with slider) */}
                  <g style={{ transform: `rotate(${(percentState / 100) * 35}deg)`, transformOrigin: '280px 175px' }}>
                    {/* Main solid linkage arm */}
                    <line x1="280" y1="175" x2="380" y2="125" stroke="#d4a359" strokeWidth="3.5" />
                    <line x1="280" y1="175" x2="380" y2="125" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
                    <circle cx="380" cy="125" r="6" fill="#d4a359" stroke="#ffffff" strokeWidth="1" />
                    {/* Double joint arm */}
                    <line x1="380" y1="125" x2="420" y2="185" stroke="#d4a359" strokeWidth="2.5" strokeDasharray="3 1" />
                    <circle cx="420" cy="185" r="4" fill="#d4a359" />
                  </g>

                  {/* Aventos Callouts */}
                  <line x1="320" y1="120" x2="440" y2="80" stroke="#d4a359" strokeWidth="0.8" opacity="0.8" />
                  <text x="450" y="78" fill="#d4a359" fontSize="10" fontFamily="monospace" textAnchor="start">
                    AVENTOS HF ENGINE: POWER FACTOR 960-2200
                  </text>
                  <text x="450" y="92" fill="#d4a359" fontSize="8" fontFamily="monospace" textAnchor="start" opacity="0.6">
                    [SPRING SECTOR: {Math.round(100 - percentState)}% COMPRESSED // DAMPER SHAFT: {Math.round(percentState * 0.45)}mm EXTENDED]
                  </text>


                  {/* 2. Legrabox Drawer Slider system (Animated Slide Out) */}
                  {/* Outer drawer profile track frame */}
                  <rect x="580" y="300" width="320" height="170" fill="none" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.4" />
                  
                  {/* Stationary Cabinet Runner Rail (Static) */}
                  <line x1="590" y1="410" x2="890" y2="410" stroke="#d4a359" strokeWidth="2" opacity="0.6" />
                  
                  {/* Moving Drawer Cabinet Profile (Slides horizontally) */}
                  <g style={{ transform: `translateX(${(percentState - 50) * 1.4}px)` }}>
                    {/* Drawer Inner profile slide */}
                    <line x1="620" y1="400" x2="870" y2="400" stroke="#ffffff" strokeWidth="2.5" />
                    {/* Drawer panel wireframe wrapper */}
                    <rect x="620" y="320" width="250" height="80" fill="none" stroke="#d4a359" strokeWidth="1.2" />
                    
                    {/* Internal hydraulic bumper inside drawer slide */}
                    <rect x="640" y="380" width="40" height="8" rx="1" fill="none" stroke="#d4a359" strokeWidth="0.8" />
                    <line x1="680" y1="384" x2="700" y2="384" stroke="#d4a359" strokeWidth="1.5" />
                    
                    {/* Drawer text identifier inside moving group */}
                    <text x="745" y="355" fill="#d4a359" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.7">
                      LEGRABOX DRAWER SYSTEM
                    </text>
                  </g>

                  {/* Ball Bearing Retainer Cage (Rolls at half speed of slide) */}
                  <g style={{ transform: `translateX(${(percentState - 50) * 0.7}px)` }}>
                    <rect x="650" y="403" width="130" height="4" rx="1" fill="#d4a359" opacity="0.4" />
                    {/* 4 Ball Bearings rolling inside runner */}
                    <circle cx="665" cy="405" r="4.5" fill="none" stroke="#d4a359" strokeWidth="1.5" />
                    <circle cx="700" cy="405" r="4.5" fill="none" stroke="#d4a359" strokeWidth="1.5" />
                    <circle cx="735" cy="405" r="4.5" fill="none" stroke="#d4a359" strokeWidth="1.5" />
                    <circle cx="770" cy="405" r="4.5" fill="none" stroke="#d4a359" strokeWidth="1.5" />
                  </g>

                  {/* Gear synchronizer */}
                  <g style={{ 
                    transform: `translateX(${(percentState - 50) * 0.7}px) rotate(${(percentState - 50) * 1.5}deg)`, 
                    transformOrigin: `735px 405px` 
                  }}>
                    <circle cx="735" cy="405" r="9" fill="none" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="3 2" />
                  </g>

                  {/* Legrabox Callouts */}
                  <line x1="820" y1="380" x2="740" y2="260" stroke="#d4a359" strokeWidth="0.8" opacity="0.8" />
                  <text x="730" y="255" fill="#d4a359" fontSize="10" fontFamily="monospace" textAnchor="end">
                    BLUMOTION RUNNER CARRIAGE: CAPACITY 40-70KG
                  </text>
                  <text x="730" y="269" fill="#d4a359" fontSize="8" fontFamily="monospace" textAnchor="end" opacity="0.6">
                    [ROLLERS SPEED: 50% SPEED INDEX // DISPLACEMENT: {Math.round((percentState - 50) * 1.4)}px]
                  </text>


                  {/* 3. Clip Top Hinge with Damping Cylinder (Pivots on rotation) */}
                  {/* Cabinet door frame wall (Static) */}
                  <rect x="50" y="310" width="30" height="150" fill="none" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
                  
                  {/* Hinge baseplate (Mounted to wall) */}
                  <rect x="80" y="355" width="40" height="40" fill="none" stroke="#d4a359" strokeWidth="1.2" />
                  <circle cx="90" cy="365" r="2" fill="#d4a359" />
                  <circle cx="90" cy="385" r="2" fill="#d4a359" />

                  {/* Hinge Linkage Arm & Door cup (Pivots dynamically) */}
                  <g style={{ transform: `rotate(${(percentState - 50) * -0.5}deg)`, transformOrigin: '120px 375px' }}>
                    {/* Dual linkage hinge hinge plates */}
                    <line x1="120" y1="370" x2="200" y2="360" stroke="#d4a359" strokeWidth="2.5" />
                    <line x1="120" y1="380" x2="200" y2="390" stroke="#d4a359" strokeWidth="2.5" />
                    {/* Door mounting cup */}
                    <rect x="200" y="350" width="25" height="50" rx="3" fill="none" stroke="#d4a359" strokeWidth="1.5" />
                    {/* Wardrobe door board wireframe */}
                    <rect x="225" y="300" width="18" height="150" fill="none" stroke="#d4a359" strokeWidth="0.8" opacity="0.6" />
                    {/* Indicator lines */}
                    <circle cx="212" cy="375" r="5" fill="none" stroke="#d4a359" strokeWidth="1" />
                    
                    {/* Hinge text identifier inside moving group */}
                    <text x="210" y="440" fill="#d4a359" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.7" style={{ transform: `rotate(${(percentState - 50) * 0.5}deg)`, transformOrigin: '210px 440px' }}>
                      CLIP TOP 110° HINGE
                    </text>
                  </g>

                  {/* Adjustment Cam screw indicator callouts */}
                  <line x1="100" y1="360" x2="240" y2="280" stroke="#d4a359" strokeWidth="0.8" opacity="0.8" />
                  <text x="250" y="278" fill="#d4a359" fontSize="10" fontFamily="monospace" textAnchor="start">
                    3D CAM COMPRESSION AND SPIRAL SCREW
                  </text>
                  <text x="250" y="292" fill="#d4a359" fontSize="8" fontFamily="monospace" textAnchor="start" opacity="0.6">
                    [DOOR PIVOT ANGLE: {Math.round((percentState - 50) * -0.5)}° // INTEGRATED BLUMOTION CYLINDER]
                  </text>
                </>
              )}

              {/* Render Astronea-specific closet blueprints */}
              {type === 'astronea' && (
                <>
                  {/* Dimension lines */}
                  <line x1="50" y1="50" x2="950" y2="50" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
                  <text x="500" y="42" fill="#d4a359" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
                    ASTRONEA WARDROBE SYSTEM: 3800mm
                  </text>

                  {/* Coplanar sliding system details */}
                  <rect x="200" y="90" width="600" height="25" fill="none" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
                  <line x1="500" y1="115" x2="500" y2="180" stroke="#d4a359" strokeWidth="0.8" opacity="0.8" />
                  <text x="500" y="195" fill="#d4a359" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    SLIDING MECHANISM: COPLANAR OVERLAPPING TRACK
                  </text>
                  <text x="500" y="208" fill="#d4a359" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.6">
                    ITALIAN DESIGN SLIDE SYSTEM // FLUID SOFT-CLOSE
                  </text>

                  {/* LED backlight channel callouts */}
                  <line x1="120" y1="150" x2="120" y2="480" stroke="#d4a359" strokeWidth="0.8" opacity="0.8" />
                  <line x1="880" y1="150" x2="880" y2="480" stroke="#d4a359" strokeWidth="0.8" opacity="0.8" />
                  <text x="135" y="300" fill="#d4a359" fontSize="9" fontFamily="monospace" transform="rotate(-90, 135, 300)" textAnchor="middle">
                    LED CONCEALED CHANNEL // 4000K WARM GLOW
                  </text>

                  {/* Glass doors specifications */}
                  <circle cx="720" cy="350" r="25" fill="none" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.8" />
                  <line x1="720" y1="375" x2="720" y2="430" stroke="#d4a359" strokeWidth="0.8" opacity="0.8" />
                  <text x="720" y="445" fill="#d4a359" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    VETRO GLASS SCREEN: 4mm
                  </text>
                  <text x="720" y="458" fill="#d4a359" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.6">
                    options: smoked / fluted / bronze
                  </text>
                </>
              )}

              {/* Render general layout blueprints */}
              {type === 'general' && (
                <>
                  <line x1="50" y1="50" x2="950" y2="50" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
                  <text x="500" y="42" fill="#d4a359" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
                    TOTAL WIDTH: 9600mm
                  </text>
                  <line x1="50" y1="45" x2="50" y2="55" stroke="#d4a359" strokeWidth="1" />
                  <line x1="950" y1="45" x2="950" y2="55" stroke="#d4a359" strokeWidth="1" />

                  <circle cx="280" cy="220" r="35" fill="none" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.8" />
                  <line x1="315" y1="220" x2="420" y2="180" stroke="#d4a359" strokeWidth="0.8" opacity="0.8" />
                  <text x="430" y="178" fill="#d4a359" fontSize="10" fontFamily="monospace" textAnchor="start">
                    SYS: BLUM AVENTOS HF LIFT [UPPER CAP]
                  </text>
                  <text x="430" y="192" fill="#d4a359" fontSize="9" fontFamily="monospace" textAnchor="start" opacity="0.6">
                    ANGLE: 105° | CONCEALED SCISSOR BRACKET
                  </text>

                  <rect x="580" y="320" width="220" height="150" fill="none" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
                  <line x1="580" y1="395" x2="480" y2="380" stroke="#d4a359" strokeWidth="0.8" opacity="0.8" />
                  <text x="470" y="378" fill="#d4a359" fontSize="10" fontFamily="monospace" textAnchor="end">
                    SYS: LEGRABOX DOUBLE-WALL DRAWER
                  </text>
                  <text x="470" y="392" fill="#d4a359" fontSize="9" fontFamily="monospace" textAnchor="end" opacity="0.6">
                    BLUMOTION SOFT-CLOSE | RUNNER DEPTH: 500mm
                  </text>

                  <line x1="950" y1="80" x2="950" y2="480" stroke="#d4a359" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
                  <text x="962" y="280" fill="#d4a359" fontSize="10" fontFamily="monospace" transform="rotate(90, 962, 280)" textAnchor="middle" letterSpacing="1">
                    SYSTEM HEIGHT: 2800mm
                  </text>
                  <line x1="945" y1="80" x2="955" y2="80" stroke="#d4a359" strokeWidth="1" />
                  <line x1="945" y1="480" x2="955" y2="480" stroke="#d4a359" strokeWidth="1" />
                </>
              )}

              {/* CAD Crosshair grid lines */}
              <path d="M100 100 L120 100 M100 100 L100 120" stroke="#d4a359" strokeWidth="0.8" opacity="0.4" />
              <path d="M900 100 L880 100 M900 100 L900 120" stroke="#d4a359" strokeWidth="0.8" opacity="0.4" />
              <path d="M100 460 L120 460 M100 460 L100 440" stroke="#d4a359" strokeWidth="0.8" opacity="0.4" />
              <path d="M900 460 L880 460 M900 460 L900 440" stroke="#d4a359" strokeWidth="0.8" opacity="0.4" />
            </svg>
          </motion.div>

          {/* LAYER 3: The Drag Handle Line */}
          <motion.div
            style={{
              left: `${percentState}%`,
            }}
            className="absolute top-0 bottom-0 w-0.5 bg-primary z-20 pointer-events-none"
          >
            {/* Glowing light overlay behind the line */}
            <div className="absolute inset-y-0 -left-1 w-2 bg-primary/20 blur-sm" />
            
            {/* The circular handle button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-secondary border border-primary flex items-center justify-center shadow-elevated text-primary cursor-ew-resize group-hover:scale-110 transition-transform">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
