import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wrench, ChefHat, DoorOpen, ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

const floors = [
  {
    floorNum: '03',
    label: 'Third Floor',
    name: 'Astronea Experience Centre',
    description: 'Italian wardrobe & storage systems',
    link: '/astronea',
    icon: DoorOpen,
    badge: 'Luxury Wardrobes',
  },
  {
    floorNum: '01',
    label: 'First Floor',
    name: 'Blum Experience Centre',
    description: 'Austrian precision kitchen solutions',
    link: '/blum',
    icon: ChefHat,
    badge: 'Precision Kitchens',
  },
  {
    floorNum: 'GF',
    label: 'Ground Floor',
    name: 'Hardware Showroom',
    description: 'Premium architectural & furniture hardware',
    link: '/',
    icon: Wrench,
    badge: 'Architectural Fittings',
  },
];

const blueprintData = {
  'GF': {
    title: 'Ground Floor Showroom Plan',
    hotspots: [
      { x: 30, y: 40, label: 'Mortise Handles', link: '/solutions' },
      { x: 70, y: 35, label: 'Locks & Security', link: '/solutions' },
      { x: 50, y: 75, label: 'Reception & Consults', link: '/contact' },
    ],
    svgPath: (
      <g stroke="currentColor" strokeWidth="1.5" fill="none" className="text-primary/40">
        {/* Exterior walls */}
        <rect x="20" y="20" width="360" height="210" rx="4" className="text-primary/70 stroke-[2]" />
        {/* Entrance */}
        <path d="M 170,230 L 230,230" strokeWidth="3" className="text-primary stroke-[3]" />
        {/* Interior walls / sections */}
        <line x1="140" y1="20" x2="140" y2="120" />
        <line x1="260" y1="20" x2="260" y2="120" />
        <line x1="20" y1="120" x2="100" y2="120" />
        <line x1="300" y1="120" x2="380" y2="120" />
        
        {/* Shelves / Display islands */}
        <rect x="40" y="40" width="60" height="40" rx="2" className="text-primary/20 fill-primary/5" />
        <rect x="300" y="40" width="60" height="40" rx="2" className="text-primary/20 fill-primary/5" />
        {/* Center islands */}
        <rect x="170" y="50" width="60" height="24" rx="2" className="text-primary/20 fill-primary/5" />
        <circle cx="200" cy="160" r="24" className="text-primary/30 fill-primary/5" strokeDasharray="4 4" />
      </g>
    )
  },
  '01': {
    title: 'First Floor Blum Experience Plan',
    hotspots: [
      { x: 30, y: 35, label: 'Aventos Lift Bay', link: '/blum' },
      { x: 70, y: 55, label: 'Legrabox Drawers', link: '/blum' },
      { x: 50, y: 25, label: 'Live Kitchen Island', link: '/blum' },
    ],
    svgPath: (
      <g stroke="currentColor" strokeWidth="1.5" fill="none" className="text-primary/40">
        {/* Exterior walls */}
        <rect x="20" y="20" width="360" height="210" rx="4" className="text-primary/70 stroke-[2]" />
        {/* Stairs access */}
        <rect x="20" y="160" width="60" height="50" strokeDasharray="3 3" />
        <line x1="20" y1="175" x2="80" y2="175" />
        <line x1="20" y1="190" x2="80" y2="190" />
        {/* Kitchen walls */}
        <path d="M 140,20 L 140,160 M 140,160 L 380,160" />
        {/* Island Kitchen counter */}
        <rect x="180" y="60" width="100" height="40" rx="4" className="text-primary/30 fill-primary/5" />
        {/* Stools */}
        <circle cx="200" cy="120" r="6" />
        <circle cx="230" cy="120" r="6" />
        <circle cx="260" cy="120" r="6" />
        {/* Display cabinets */}
        <rect x="40" y="40" width="20" height="80" className="text-primary/20 fill-primary/5" />
        <rect x="330" y="60" width="30" height="60" className="text-primary/20 fill-primary/5" />
      </g>
    )
  },
  '03': {
    title: 'Third Floor Astronea Wardrobes Plan',
    hotspots: [
      { x: 30, y: 50, label: 'Vesta Walk-In Wardrobes', link: '/astronea' },
      { x: 65, y: 25, label: 'Lexus Sliding Wardrobes', link: '/astronea' },
      { x: 75, y: 70, label: 'Slim-Frame Air Hinges', link: '/astronea' },
    ],
    svgPath: (
      <g stroke="currentColor" strokeWidth="1.5" fill="none" className="text-primary/40">
        {/* Exterior walls */}
        <rect x="20" y="20" width="360" height="210" rx="4" className="text-primary/70 stroke-[2]" />
        {/* Elevators / Stairwell */}
        <rect x="20" y="160" width="60" height="50" strokeDasharray="3 3" />
        <line x1="50" y1="160" x2="50" y2="210" />
        {/* Wardrobe corridor walls */}
        <path d="M 120,20 L 120,130 L 280,130 L 280,20" />
        {/* Walk-in closet bays */}
        <rect x="140" y="40" width="40" height="70" className="text-primary/20 fill-primary/5" strokeDasharray="2 2" />
        <rect x="220" y="40" width="40" height="70" className="text-primary/20 fill-primary/5" strokeDasharray="2 2" />
        {/* Sliding glass partitions */}
        <line x1="120" y1="170" x2="280" y2="170" strokeDasharray="8 4" className="text-primary/60 stroke-[2]" />
        <rect x="320" y="40" width="40" height="60" className="text-primary/20 fill-primary/5" />
      </g>
    )
  }
};

export const FloorNavigator = () => {
  const [selectedFloor, setSelectedFloor] = useState<'GF' | '01' | '03'>('GF');

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Ambient background glow behind building */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="Explore Our Showroom"
          title={
            <>
              Navigate Our <span className="text-gradient-metal">Building</span>
            </>
          }
          description="Three levels of premium hardware experiences — each floor dedicated to a world-class brand."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          {/* Left: Floor Selector List (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
            {floors.map((floor) => {
              const isSelected = selectedFloor === floor.floorNum;
              return (
                <Link
                  key={floor.label}
                  to={floor.link}
                  onMouseEnter={() => setSelectedFloor(floor.floorNum as 'GF' | '01' | '03')}
                  className={`block relative p-5 border rounded-sm transition-all duration-300 group ${
                    isSelected
                      ? 'bg-secondary/80 border-primary shadow-[0_0_20px_rgba(212,163,89,0.15)]'
                      : 'bg-card border-border/80 hover:border-border hover:bg-secondary/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Floor circle/badge */}
                    <div className={`relative shrink-0 w-12 h-12 rounded-sm border flex flex-col items-center justify-center transition-all ${
                      isSelected ? 'border-primary bg-primary/10' : 'border-border bg-card'
                    }`}>
                      <span className="text-lg font-serif font-bold text-gradient-metal">{floor.floorNum}</span>
                      <span className="text-[7px] text-muted-foreground uppercase font-sans font-bold -mt-0.5">Floor</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] tracking-wider uppercase font-semibold text-primary">{floor.label}</span>
                        <span className="px-1.5 py-0.5 text-[8px] bg-secondary/80 text-muted-foreground border border-border/40 rounded-sm">{floor.badge}</span>
                      </div>
                      <h4 className="text-lg font-serif font-medium text-foreground mt-0.5 group-hover:text-primary transition-colors">
                        {floor.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{floor.description}</p>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right: Blueprint Visualizer (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#050e1a] border border-primary/20 rounded-sm p-6 relative overflow-hidden flex flex-col min-h-[350px] lg:min-h-[420px] shadow-2xl justify-between">
            {/* Blueprint Grid Lines Overlay */}
            <div 
              className="absolute inset-0 opacity-40 pointer-events-none" 
              style={{
                backgroundImage: 'linear-gradient(rgba(212,163,89,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,163,89,0.08) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />
            {/* Blueprint Blueprint Frame Outline */}
            <div className="absolute inset-4 border border-primary/10 border-dashed pointer-events-none" />

            {/* Header info */}
            <div className="relative z-10 flex justify-between items-start border-b border-primary/15 pb-3">
              <div>
                <span className="text-[10px] font-sans tracking-widest text-primary/60 uppercase">Architectural Blueprint</span>
                <h4 className="text-lg font-serif font-medium text-primary leading-tight mt-0.5">
                  {blueprintData[selectedFloor].title}
                </h4>
              </div>
              <span className="text-xs font-mono text-primary/50 tracking-wider">
                SCALE: 1:50
              </span>
            </div>

            {/* SVG Interactive Map Area */}
            <div className="relative z-10 flex-1 flex items-center justify-center py-4 my-2">
              <svg 
                viewBox="0 0 400 250" 
                className="w-full h-full max-h-[220px] transition-all duration-500"
              >
                {blueprintData[selectedFloor].svgPath}

                {/* Render interactive Hotspot Pins */}
                {blueprintData[selectedFloor].hotspots.map((pin, index) => {
                  const cx = (pin.x * 400) / 100;
                  const cy = (pin.y * 250) / 100;
                  return (
                    <Link key={index} to={pin.link} className="cursor-pointer group/pin">
                      {/* Pulsing indicator ring */}
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r="12" 
                        className="fill-primary/5 stroke-primary/30 stroke-[1] animate-ping"
                        style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: '3s' }}
                      />
                      {/* Interactive click link circle */}
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r="6" 
                        className="fill-primary stroke-[#050e1a] stroke-[1.5] group-hover/pin:fill-white group-hover/pin:scale-125 transition-transform"
                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                      />
                      
                      {/* Tooltip badge on hover */}
                      <foreignObject 
                        x={cx - 75} 
                        y={cy - 44} 
                        width="150" 
                        height="36"
                        className="opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300 pointer-events-none"
                      >
                        <div className="bg-[#0b1a30]/95 border border-primary/50 px-2.5 py-1 text-center rounded-sm shadow-xl">
                          <p className="text-[10px] font-medium text-white truncate">{pin.label}</p>
                          <p className="text-[8px] font-sans text-primary/80 uppercase tracking-widest font-semibold -mt-0.5">Explore →</p>
                        </div>
                      </foreignObject>
                    </Link>
                  );
                })}
              </svg>
            </div>

            {/* Footer data lines */}
            <div className="relative z-10 border-t border-primary/15 pt-3 flex justify-between items-center text-[9px] font-mono text-primary/45 tracking-widest uppercase">
              <span>HYDERABAD HARDWARE • EXPERIENCE PLAZA</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                SYSTEM ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
