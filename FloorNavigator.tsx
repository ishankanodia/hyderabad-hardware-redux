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

const buildingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const FloorNavigator = () => {
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

        {/* Subtle Building Facade Cross-Section */}
        <motion.div
          variants={buildingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20 max-w-4xl mx-auto relative px-4 sm:px-8"
        >
          {/* Building Structural Outer Frame */}
          <div className="relative border-x border-border bg-card/15 shadow-2xl rounded-t-lg overflow-hidden">
            
            {/* 🏢 Architectural Roof Canopy */}
            <div className="relative h-12 bg-gradient-to-b from-[#1c1917] to-[#12100e] border-b border-border/80 flex items-center justify-between px-6">
              {/* Roof Columns & Trim */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-border/40" />
                <div className="w-3 h-3 rounded-full bg-border/40" />
              </div>
              {/* Penthouse Glass Accent Line */}
              <div className="absolute bottom-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <span className="text-[10px] font-sans font-medium tracking-widest text-muted-foreground uppercase opacity-60">
                Sai Avenue Showroom Building
              </span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-border/40" />
                <div className="w-3 h-3 rounded-full bg-border/40" />
              </div>
            </div>

            {/* 🏢 Floors Layer Stack */}
            <div className="divide-y divide-border/60">
              {floors.map((floor) => {
                const IconComponent = floor.icon;

                return (
                  <Link
                    key={floor.label}
                    to={floor.link}
                    onClick={() => {
                      if (floor.link === '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="block relative group overflow-hidden"
                  >
                    {/* Interactive Glass Facade Pane Backdrop (4 structural window panes) */}
                    <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-0">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-full border-r border-border/20 last:border-r-0 transition-all duration-700 group-hover:bg-primary/[0.02] group-hover:shadow-[inset_0_0_15px_rgba(212,163,89,0.02)]"
                        />
                      ))}
                    </div>

                    {/* Left/Right structural column highlights */}
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-border/40 group-hover:bg-primary/50 transition-colors duration-500" />
                    <div className="absolute top-0 bottom-0 right-0 w-1 bg-border/40 group-hover:bg-primary/50 transition-colors duration-500" />

                    {/* Floor glow trigger on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.01] via-transparent to-primary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    
                    {/* Hover light highlight (interior lights on) */}
                    <div className="absolute inset-x-8 bottom-0 top-0 bg-primary/[0.03] opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 pointer-events-none" />

                    {/* Actual Content Layout */}
                    <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300">
                      
                      {/* Left: Building Pillar Plaque & Floor Marker */}
                      <div className="flex items-center gap-6">
                        <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-secondary border border-border flex flex-col items-center justify-center shadow-md group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(212,163,89,0.15)] transition-all duration-300">
                          <span className="text-2xl sm:text-3xl font-serif font-semibold text-gradient-metal">
                            {floor.floorNum}
                          </span>
                          <span className="text-[9px] font-sans font-semibold tracking-wider text-muted-foreground uppercase mt-0.5">
                            Floor
                          </span>
                          {/* LED indicator light */}
                          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-primary transition-colors duration-300 shadow-[0_0_8px_rgba(212,163,89,0.5)]" />
                        </div>

                        {/* Title details */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                              {floor.label}
                            </span>
                            <span className="px-2 py-0.5 text-[10px] bg-secondary/80 text-muted-foreground border border-border/60 rounded-sm">
                              {floor.badge}
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-serif font-medium text-foreground mt-1.5 group-hover:text-primary transition-colors duration-300">
                            {floor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 max-w-md">
                            {floor.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: Icon Showcase & Navigation Call */}
                      <div className="flex items-center gap-6 justify-between md:justify-end border-t border-border/40 md:border-none pt-4 md:pt-0">
                        {/* Floor-specific brand icon decoration */}
                        <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                          <IconComponent className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        </div>

                        {/* Interactive action indicator */}
                        <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                          <span className="hidden sm:inline-block tracking-wider uppercase text-xs">
                            Enter Level
                          </span>
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                            <ArrowRight className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 🏢 Solid Stone Foundation Block */}
            <div className="relative h-6 bg-gradient-to-b from-[#1e1e1e] to-[#121212] border-t border-border/80 flex items-center justify-center">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              {/* Foundation structural anchors/bolts */}
              <div className="absolute inset-x-8 flex justify-between pointer-events-none">
                <div className="w-8 h-1.5 bg-neutral-800 rounded-sm" />
                <div className="w-16 h-1.5 bg-neutral-800 rounded-sm" />
                <div className="w-8 h-1.5 bg-neutral-800 rounded-sm" />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
