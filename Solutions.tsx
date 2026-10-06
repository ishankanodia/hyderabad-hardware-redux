import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Check, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Hardware product images
import kitchenImage from '@/assets/hero-kitchen.jpg';
import drawerImage from '@/assets/drawer-system.jpg';
import wardrobeImage from '@/assets/wardrobe-system.jpg';
import doorImage from '@/assets/door-hardware.jpg';
import blumImage from '@/assets/blum-hardware.jpg';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    title: 'Kitchen & Cabinet Hardware',
    description: 'Transform your kitchen with premium cabinet hardware. From soft-close hinges that ensure silent operation to innovative lift systems for upper cabinets, we offer complete solutions for modern kitchens.',
    features: [
      'Soft-close hinge systems',
      'Lift systems for upper cabinets',
      'Pull-out organizers',
      'Larder unit solutions',
    ],
    image: kitchenImage,
    brand: 'Blum Experience',
    hud: 'H: 720mm | W: 900mm | D: 560mm',
    frameStyle: {
      width: '82%',
      height: '60%',
      borderRadius: '24px',
      rotateY: 8,
      rotateX: 4,
    }
  },
  {
    title: 'Drawer & Runner Systems',
    description: 'Experience the smoothest drawer operation with premium runner systems. Our drawer solutions combine full extension, soft-close technology, and high load capacity for everyday reliability.',
    features: [
      'Full-extension runners',
      'BLUMOTION soft-close technology',
      'High load capacity systems',
      'Inner drawer systems',
    ],
    image: drawerImage,
    brand: 'Blum Experience',
    hud: 'H: 180mm | W: 600mm | D: 500mm',
    frameStyle: {
      width: '76%',
      height: '68%',
      borderRadius: '12px',
      rotateY: -8,
      rotateX: -4,
    }
  },
  {
    title: 'Wardrobe & Storage Systems',
    description: 'Create organized and luxurious wardrobes with our comprehensive storage solutions. From sliding door mechanisms to internal organization systems, we have everything you need.',
    features: [
      'Sliding door systems',
      'Walk-in wardrobe solutions',
      'Internal dividers and organizers',
      'Pull-out accessories',
    ],
    image: wardrobeImage,
    brand: 'Astronea Experience',
    hud: 'H: 2400mm | W: 1800mm | D: 650mm',
    frameStyle: {
      width: '70%',
      height: '74%',
      borderRadius: '32px',
      rotateY: 10,
      rotateX: 0,
    }
  },
  {
    title: 'Door Hardware & Locks',
    description: 'Complete your interiors with elegant door hardware. Our range includes premium handles, locking systems, and architectural hardware in various finishes to complement any design.',
    features: [
      'Door handles & knobs',
      'Locking systems',
      'Hinges for all applications',
      'Premium finish options',
    ],
    image: doorImage,
    brand: 'Showroom Collection',
    hud: 'H: 2100mm | W: 1000mm | D: 45mm',
    frameStyle: {
      width: '80%',
      height: '62%',
      borderRadius: '16px',
      rotateY: -10,
      rotateX: 8,
    }
  },
  {
    title: 'Furniture Fittings',
    description: 'Precision fittings that bring furniture to life. From concealed hinges to motion technologies, our furniture fittings ensure smooth, reliable operation for years.',
    features: [
      'Concealed hinges',
      'Motion technologies',
      'Glass door solutions',
      'Corner cabinet solutions',
    ],
    image: blumImage,
    brand: 'Blum & Showroom',
    hud: 'H: 120mm | W: 80mm | D: 40mm',
    frameStyle: {
      width: '75%',
      height: '66%',
      borderRadius: '20px',
      rotateY: 0,
      rotateX: -8,
    }
  },
];

const Solutions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run scroll triggers on desktop
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    let triggers: ScrollTrigger[] = [];

    const setupTriggers = () => {
      const panels = gsap.utils.toArray('.solution-content-panel') as HTMLElement[];
      if (panels.length === 0) return;

      panels.forEach((panel, index) => {
        const trg = ScrollTrigger.create({
          trigger: panel,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(index);
            }
          },
        });
        triggers.push(trg);
      });
    };

    if (mediaQuery.matches) {
      setupTriggers();
    }

    const handleResize = () => {
      triggers.forEach((t) => t.kill());
      triggers = [];

      if (mediaQuery.matches) {
        setupTriggers();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-card overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Our Solutions
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground leading-tight">
              Complete Interior{' '}
              <span className="text-gradient-metal">Hardware Solutions</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              From kitchens to wardrobes, main entrances to architectural doors — we provide 
              comprehensive hardware setups that combine world-class quality with exceptional function.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Pinned Showcase */}
      <section ref={containerRef} className="relative bg-[#0b0c10] border-t border-border/30">
        <div ref={triggerRef} className="relative flex flex-col lg:flex-row items-start max-w-7xl mx-auto lg:border lg:border-border/40 lg:rounded-sm bg-[#07080c]/30">
          
          {/* LEFT COLUMN: Sticky visuals - Visible on lg+ */}
          <div className="sticky-visual-col hidden lg:flex w-1/2 h-screen sticky top-0 overflow-hidden bg-card/10 items-center justify-center border-r border-border/40" style={{ perspective: '1200px' }}>
            
            {/* Blueprint grid lines behind the frame */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />

            {/* 3D background glowing orb with a breathing animation */}
            <motion.div 
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-[450px] h-[450px] rounded-full bg-primary/10 blur-[100px] pointer-events-none z-0" 
            />
            
            {/* Dynamic HUD Measurement Details */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute top-12 left-12 z-30 font-mono text-[10px] tracking-widest text-primary uppercase bg-[#07080c]/60 backdrop-blur-sm px-3.5 py-1.5 border border-border rounded-sm shadow-md flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              CAD SYSTEM // {solutions[activeIndex].hud}
            </motion.div>

            {/* Morphing Product Frame Container */}
            <motion.div
              animate={{
                width: solutions[activeIndex].frameStyle.width,
                height: solutions[activeIndex].frameStyle.height,
                borderRadius: solutions[activeIndex].frameStyle.borderRadius,
                rotateY: solutions[activeIndex].frameStyle.rotateY,
                rotateX: solutions[activeIndex].frameStyle.rotateX,
              }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 18,
                mass: 1.1,
              }}
              className="relative overflow-hidden border border-white/20 bg-[#07080c] shadow-elevated flex items-center justify-center z-10"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Stacked Images inside the morphing frame */}
              {solutions.map((solution, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <motion.img
                    key={idx}
                    src={solution.image}
                    alt={solution.title}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1.05 : 1.2,
                    }}
                    transition={{
                      duration: 0.75,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                  />
                );
              })}

              {/* Gold border pulse overlay on change */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 border border-primary/50 pointer-events-none z-30 rounded-[inherit]"
              />

              {/* Glass glare effect sweeping on active slide change */}
              <motion.div
                key={activeIndex}
                initial={{ left: '-100%' }}
                animate={{ left: '200%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-20 pointer-events-none"
              />
            </motion.div>

            {/* Sidebar Dot Indicator Progress Track */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-30 bg-background/80 backdrop-blur-md px-3.5 py-7 rounded-full border border-border/60 shadow-card">
              {solutions.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    backgroundColor: idx === activeIndex ? 'hsl(var(--primary))' : 'rgba(156, 163, 175, 0.2)',
                    scale: idx === activeIndex ? 1.35 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-2 h-2 rounded-full cursor-pointer"
                  onClick={() => {
                    const targetPanel = document.querySelectorAll('.solution-content-panel')[idx];
                    if (targetPanel) {
                      targetPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                />
              ))}
            </div>

            {/* Bottom floating details watermark */}
            <div className="absolute bottom-8 left-8 right-8 z-30 flex justify-between items-center bg-[#07080c]/85 backdrop-blur-md border border-border/50 px-5 py-3.5 rounded-sm">
              <span className="text-[10px] font-mono tracking-widest text-primary uppercase">Hyderabad Hardware</span>
              <div className="text-xs font-serif font-semibold text-foreground tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Active Concept: {solutions[activeIndex].title}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Scrolling details */}
          <div className="w-full lg:w-1/2 relative z-20">
            {solutions.map((solution, idx) => (
              <div
                key={idx}
                className="solution-content-panel min-h-[65vh] lg:min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20 lg:py-24 border-b border-border/20 last:border-b-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-20%' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="max-w-md space-y-6"
                >
                  {/* Brand Tag, Step number */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-secondary/80 border border-border rounded-sm text-[10px] font-mono font-bold tracking-widest text-primary uppercase shadow-sm">
                      {solution.brand}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      0{idx + 1} &mdash; 0{solutions.length}
                    </span>
                  </div>

                  {/* Fallback Image for Mobile Viewports */}
                  <div className="block lg:hidden relative aspect-[4/3] w-full rounded-md border border-border overflow-hidden group mb-4">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-30" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground leading-tight">
                    {solution.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {solutions[idx].features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3 text-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
