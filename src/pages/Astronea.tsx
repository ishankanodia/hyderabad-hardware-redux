import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, ExternalLink, FileText } from 'lucide-react';
import { WardrobeVisualizer } from '@/components/astronea/WardrobeVisualizer';
import wardrobeImage from '@/assets/wardrobe-system.jpg';


// Original Astronea showroom photos
import astroneaShowroom1 from '@/assets/gallery/astronea/astronea-showroom-1.jpg';
import astroneaShowroom2 from '@/assets/gallery/astronea/astronea-showroom-2.jpg';
import astroneaShowroom3 from '@/assets/gallery/astronea/astronea-showroom-3.jpg';
import astroneaShowroom4 from '@/assets/gallery/astronea/astronea-showroom-4.jpg';
import astroneaShowroom5 from '@/assets/gallery/astronea/astronea-showroom-5.jpg';
import astroneaShowroom6 from '@/assets/gallery/astronea/astronea-showroom-6.jpg';
import astroneaShowroom7 from '@/assets/gallery/astronea/astronea-showroom-7.jpg';
import astroneaShowroom8 from '@/assets/gallery/astronea/astronea-showroom-8.jpg';
import astroneaShowroom9 from '@/assets/gallery/astronea/astronea-showroom-9.jpg';

const collaboratedBrands = [
  {
    name: 'Ternoscorrevoli (Italy)',
    tagline: 'Dedicated Sliding Mechanisms',
    description: 'An inspirational Italian sliding door pioneer with over 70 years of experience engineering high-end movement systems.',
  },
  {
    name: 'Effegibrevetti (Italy)',
    tagline: 'Concealed Air Hinges',
    description: 'Specialists in top-tier concealed mechanical systems, inline soft-close fittings, and modular cabinetry hardware.',
  },
  {
    name: 'PortaPivot (Belgium)',
    tagline: 'Architectural Pivot Doors',
    description: 'A premium Belgian brand offering state-of-the-art concealed pivot hinges and architectural glass partitions.',
  },
  {
    name: 'K-Zone (Profiles)',
    tagline: 'Aluminum Wardrobe Structures',
    description: 'A profile innovator since 2008, K-zone is the parent company of Astronea and pushes the limits of aluminum framing.',
  },
];

const seriesCategories = {
  openable: [
    { name: 'Continental Series', type: 'Openable Wardrobe', desc: 'Minimalist glass door system with a robust carcass structure, combining heritage cabinet styling with modern transparency.' },
    { name: 'Houston Series', type: 'Concealed Frame Openable', desc: 'Sleek framing profile with integrated soft-close hinges, offering full visual visibility and structural durability.' },
    { name: 'Greek Series', type: 'Full Glass Wardrobe', desc: 'Features full-height glass panels with integrated slim handle profiles, adding deep architectural lines.' },
    { name: 'Codex Corner Fold', type: 'Bi-Fold Corner System', desc: 'An innovative corner folding layout that wraps around cabinet corners seamlessly without central pillars.' },
    { name: 'Vesta Series', type: 'Concealed Hinge System', desc: 'Uses Italian Air Hinges milled flush into the cabinet floor and ceiling, offering clean, seamless openable profiles.' },
    { name: 'Curv Door Series', type: 'Curved Display Closet', desc: 'An avant-garde curved glass profile door system that bends around display shelving for fluid organic aesthetics.' }
  ],
  sliding: [
    { name: 'Slide Pocket Series', type: 'Pocket Sliding Door', desc: 'Sliding system that lets doors slide completely inside hidden wall cavities or double side walls.' },
    { name: 'Fine Kit Top Line', type: 'Top Hung Sliding System', desc: 'Heavy-duty top hung runners with absolute silent guide tracks, keeping the floor layout completely flush.' },
    { name: 'Chester Plus Inline', type: 'Coplanar Flush Slide', desc: 'Premium inline sliding system where doors lie flush in a single plane when closed, then slide in front of each other.' },
    { name: 'Garuda System', type: 'Designer Sliding Panel', desc: 'A tropical-inspired luxury frame system incorporating custom patterned glass inserts and textured panels.' },
    { name: 'Etihad & Qatar Series', type: 'Heavy Duty Sliding', desc: 'High-load sliding systems engineered for heavy large-format panels, up to 3000mm in height.' }
  ],
  doors: [
    { name: 'Zurich & Swiss Flush', type: 'Concealed Frame Door', desc: 'Luxury flush doors that mount flush with wall paneling, featuring invisible aluminum frames and magnetic latches.' },
    { name: 'Dublin & Burlin Glass', type: 'Slim Hinge Door', desc: 'Ultra-slim profile glass swing doors designed for modern office partitions, study entries, or luxury walk-in closets.' },
    { name: 'Jordon & Boston Partition', type: 'Glass Partitions', desc: 'Decorative grid-pattern glass doors that slide or swing, perfect for separating kitchens and living lounges.' }
  ],
  electric: [
    { name: 'Blackbird Pocket Auto', type: 'Motorised Pocket', desc: 'Touch-activated motorized pocket sliding system that hides doors silently within walls upon request.' },
    { name: 'Blackbird Synchro Auto', type: 'Motorised Synchro', desc: '2Fix + 2Slide synchronized motorized system that opens multiple panels in opposite directions simultaneously.' }
  ],
  folding: [
    { name: 'Monaco Bi-Fold Series', type: 'Sliding Folding Door', desc: 'Premium bi-folding doors with whisper-quiet top hung guide rails, opening up the entire cabinet space without blocking passageways.' },
    { name: 'Folding Pocket Series', type: 'Concealed Folding Pocket', desc: 'Dual-folding system that collapses and glides into lateral pockets inside the wardrobe structure, offering complete design cleanlines.' }
  ],
  living: [
    { name: 'Boiseries Panelling', type: 'Wall Panelling', desc: 'Exquisite wall cladding solutions combining fluted real wood veneer panels, premium leather tiles, and anodized gold profile trims.' },
    { name: 'Modena Console Island', type: 'Console Island', desc: 'Free-standing luxury closet island featuring glass countertops, integrated watch-winders, and velvet-lined jewelry drawer organizers.' }
  ],
  crockery: [
    { name: 'Tuscany Sideboard', type: 'Crockery Series', desc: 'Elegant dining vitrines featuring ultra-slim glass doors, glass shelves on integrated copper conductors, and flush smart LED lighting.' },
    { name: 'Milan Pocket Bar', type: 'Bar Unit Series', desc: 'Bespoke home bar system with sliding pocket doors that reveal a marble backsplash, stemware holders, and automated pull-out bottle drawers.' }
  ],
  bathroom: [
    { name: 'Aqua Frameless Cubicle', type: 'Shower Cubicle', desc: 'Custom-tailored glass partitions using heavy 10mm tempered glass, water-repellent coating, and solid brass magnetic hinge sets.' },
    { name: 'Oasis Sliding Enclosure', type: 'Shower Sliding System', desc: 'Sleek inline bathroom partition sliding doors featuring top hung rollers and flush guide tracks for architectural continuity.' }
  ]
};

const smartAccessories = [
  {
    name: 'Fendi Watch Winder Safe',
    category: 'Biometric Safe Series',
    details: 'Luxury winder featuring 6 integrated automatic watch winders, biometric fingerprint locking, leather jewelry chest, and interior LED lighting.'
  },
  {
    name: 'Fendi Vertical Lift Curio',
    category: 'Concealed Motorised Lift',
    details: 'A motorized vertical pop-up shelf unit that raises valuables and watches from inside cabinet drawers at the touch of a button.'
  },
  {
    name: 'Fendi Clothes Nursing Machine',
    category: 'Apparel Care System',
    details: 'Concealed wardrobe sanitizing unit that uses micro-steam and hot air to actively refresh, de-wrinkle, and sanitize fine wools and silks.'
  },
  {
    name: 'Para Leather Organiser Safe',
    category: 'Fingerprint Vault',
    details: 'High-security digital biometric vault drawer finished in hand-stitched Fendi-pattern leather with custom accessory grids.'
  },
  {
    name: '360° Revolving Shoe Rack',
    category: 'Rotating Shoe Tower',
    details: 'A dual-column rotating high-density shoe tower accommodating up to 48 pairs of shoes in a 360-degree pivoting carousel.'
  },
  {
    name: 'Fendi Electric Hanger Lifter',
    category: 'Concealed Wardrobe Lifter',
    details: 'Motorized drop-down wardrobe rod that lowers clothing racks down to accessible heights via remote control or smart home integration.'
  }
];

const features = [
  'Designer walk-in wardrobe displays',
  'Sliding and openable system demos',
  'Premium finish samples',
  'Expert design consultation',
  'Italian-made Air Hinges',
  'Custom configuration support',
];

const Astronea = () => {
  const bgImages = useMemo(() => [
    wardrobeImage,
    astroneaShowroom1,
    astroneaShowroom2,
    astroneaShowroom3,
    astroneaShowroom4,
  ], []);

  const [currentBg, setCurrentBg] = useState(0);
  const [activeCategory, setActiveCategory] = useState<'openable' | 'sliding' | 'doors' | 'electric' | 'folding' | 'living' | 'crockery' | 'bathroom'>('openable');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentBg}
              src={bgImages[currentBg]}
              alt="Astronea experience centre display"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 0.75, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          {/* Ambient gradient dim overlay - fades to transparent on the right to show the showroom clearly */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent z-10" />
        </div>

        <div className="relative z-20 container mx-auto px-6 py-32">
          {/* Navigation dot indicators */}
          <div className="absolute bottom-6 left-6 flex gap-2 z-30">
            {bgImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBg(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentBg === i ? 'bg-primary w-6' : 'bg-muted-foreground/45 hover:bg-muted-foreground'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase block mb-6">
              Experience Centre
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground leading-tight">
              Astronea Experience{' '}
              <span className="text-gradient-metal">Centre</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore premium Italian wardrobe concepts at our Astronea Experience Centre. 
              Discover designer walk-ins, sliding systems, and luxury aluminum profiles.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact#map"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-champagne-dark transition-all duration-300"
              >
                Visit Centre
                <MapPin className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="https://www.astronea.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Astronea Website
                <ExternalLink className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 space-y-6"
            >
              <span className="text-primary text-sm font-medium tracking-widest uppercase">
                About Astronea
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                Italian Wardrobe Concept
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Astronea brings Italian luxury and craftsmanship to wardrobe design. Their designer 
                collection features stellar wardrobe designs refined to perfection, with an exquisite 
                range that offers something unique for everyone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From openable wardrobe systems to sliding mechanisms, designer walk-ins to containers, 
                Astronea opens new possibilities for customization. Premium finishes including Brush Gold, 
                Bronze, and Champagne add a touch of luxury to any interior.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <img
                src={wardrobeImage}
                alt="Astronea wardrobe display"
                className="w-full rounded-sm"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engineering Collaborations */}
      <section className="py-20 border-t border-border/50 bg-[#070b14]/40">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="Italian & European Engineering"
            title={<>Exclusive Brand <span className="text-gradient-metal">Partnerships</span></>}
            description="Astronea collaborates with world-leading European hardware manufacturers to ensure unmatched kinetic precision and premium structural durability."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collaboratedBrands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-card/60 border border-border/60 rounded-sm hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest">{brand.tagline}</span>
                  <h3 className="text-xl font-serif text-foreground mt-2">{brand.name}</h3>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{brand.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure Catalog Series */}
      <section className="py-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle
            subtitle="Bespoke Architectures"
            title={<>Astronea Brochure <span className="text-gradient-metal">Series Catalog</span></>}
            description="Explore our range of sliding, folding, partition, and openable door structures designed for luxury residential spaces."
          />

          {/* Tabs Navigation */}
          <div className="mt-12 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto border-b border-border/40 pb-4">
            {[
              { id: 'openable', label: 'Openable Wardrobes' },
              { id: 'sliding', label: 'Sliding Systems' },
              { id: 'folding', label: 'Sliding Folding' },
              { id: 'doors', label: 'Premium & Partition Doors' },
              { id: 'electric', label: 'Electric Motorised' },
              { id: 'crockery', label: 'Crockery & Bar' },
              { id: 'living', label: 'Wall Panelling & Islands' },
              { id: 'bathroom', label: 'Shower Cubicles' }
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-5 py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase border transition-all ${
                    isActive 
                      ? 'bg-primary text-primary-foreground border-transparent shadow-[0_0_15px_rgba(212,163,89,0.2)]'
                      : 'bg-secondary/40 text-muted-foreground border-border hover:text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {seriesCategories[activeCategory].map((series) => (
                <motion.div
                  key={series.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 bg-card border border-border/80 rounded-sm hover:border-primary/30 transition-colors"
                >
                  <span className="px-2 py-0.5 text-[8px] bg-secondary/80 border border-border/80 rounded-sm text-primary uppercase font-mono tracking-wider">{series.type}</span>
                  <h4 className="text-xl font-serif text-foreground mt-3 font-medium">{series.name}</h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{series.desc}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Smart Safe Tech & Accessories */}
      <section className="py-24 border-y border-border/50 bg-[#070b14]/20">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="Concealed Automation & Safe Vaults"
            title={<>Fendi & Para <span className="text-gradient-metal">Smart Accessories</span></>}
            description="Luxury smart wardrobe integration including active clothes refreshment, motorized vertical storage lifts, and fingerprint safe drawers."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {smartAccessories.map((accessory, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 bg-[#0b121f]/40 border border-border/60 rounded-sm hover:border-primary/40 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Visual subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <span className="text-[9px] font-mono text-primary uppercase tracking-widest block mb-2">{accessory.category}</span>
                  <h3 className="text-xl font-serif text-foreground font-medium">{accessory.name}</h3>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{accessory.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-serif font-light text-foreground italic leading-relaxed"
            >
              "We believe that your home should tell a story about who you are 
              & a collection of what you love."
            </motion.blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-primary font-medium"
            >
              — Astronea Philosophy
            </motion.p>
          </div>
        </div>
      </section>

      {/* Interactive Wardrobe Configurator */}
      <WardrobeVisualizer />

      {/* Gallery */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="Showroom Showcase"
            title={<>Explore the Astronea <span className="text-gradient-metal">Experience</span></>}
            description="Take a visual tour through our premium glass frames, luxury profiles, and walk-in wardrobe displays."
          />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              astroneaShowroom5,
              astroneaShowroom6,
              astroneaShowroom7,
              astroneaShowroom8,
              astroneaShowroom9
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-border"
              >
                <img
                  src={img}
                  alt={`Astronea showroom display ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tour */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="relative overflow-hidden rounded-sm border border-border bg-secondary aspect-video">
                <video
                  src="/videos/astronea-inauguration.mp4"
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-6"
            >
              <span className="text-primary text-sm font-medium tracking-widest uppercase">
                Video Walkthrough
              </span>
              <h2 className="text-3xl font-serif font-medium text-foreground">
                Grand Inauguration
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Watch the highlights from the grand opening of our Astronea Experience Centre. 
                Experience the luxury and explore the premium wardrobe framing, sliding systems, 
                and walk-in configurations designed to inspire beautiful living spaces.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              subtitle="Experience Centre"
              title={<>Visit Our Astronea <span className="text-gradient-metal">Showroom</span></>}
              description="Located at Hyderabad Hardware, our Astronea Experience Centre showcases the finest Italian wardrobe systems."
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/contact#map"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-champagne-dark transition-all duration-300"
              >
                Get Directions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="/astronea-brochure.pdf"
                download="Astronea_Italian_Wardrobes_Brochure.pdf"
                className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Download Brochure
                <FileText className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Astronea;
