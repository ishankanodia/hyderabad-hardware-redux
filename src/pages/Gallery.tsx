import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { X, ChevronLeft, ChevronRight, ZoomIn, Play, Film } from 'lucide-react';

// Fallback images for empty gallery folders
import blumHardware from '@/assets/blum-hardware.jpg';
import drawerSystem from '@/assets/drawer-system.jpg';
import heroKitchen from '@/assets/hero-kitchen.jpg';
import wardrobeSystem from '@/assets/wardrobe-system.jpg';
import story1 from '@/assets/story/story1.jpg';
import story2 from '@/assets/story/story2.jpg';
import story3 from '@/assets/story/story3.jpg';

/* ------------------------------------------------------------------ */
/*  Video configuration — edit this array to add/update videos        */
/* ------------------------------------------------------------------ */
const videoItems = [
  {
    title: 'Blum Experience Centre Inauguration',
    description: 'Grand opening of our Blum Experience Centre showroom',
    src: '/videos/blum-inauguration.mp4',
    poster: null as string | null,
  },
  {
    title: 'Astronea Experience Centre Inauguration',
    description: 'Grand opening of our Astronea Experience Centre showroom',
    src: '/videos/astronea-inauguration.mp4',
    poster: null as string | null,
  },
  {
    title: 'Blum India Design Reverie (Hyderabad)',
    description: 'Blum event celebration at the Taj Falaknuma Palace',
    src: '/videos/blum-design-reverie.mp4',
    poster: null as string | null,
  },
];

/* ------------------------------------------------------------------ */
/*  Dynamic image loading via Vite glob                               */
/* ------------------------------------------------------------------ */
const heroGlob = import.meta.glob<{ default: string }>(
  '../assets/hero/*.{jpg,jpeg,png,webp}',
  { eager: true },
);
const groundGlob = import.meta.glob<{ default: string }>(
  '../assets/gallery/ground/*.{jpg,jpeg,png,webp}',
  { eager: true },
);
const blumGlob = import.meta.glob<{ default: string }>(
  '../assets/gallery/blum/*.{jpg,jpeg,png,webp}',
  { eager: true },
);
const astroneaGlob = import.meta.glob<{ default: string }>(
  '../assets/gallery/astronea/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

type GalleryImage = { src: string; alt: string; category: string };

function extractImages(
  glob: Record<string, { default: string }>,
  category: string,
): GalleryImage[] {
  return Object.entries(glob).map(([path, mod]) => {
    const filename = path.split('/').pop() ?? '';
    const alt = filename
      .replace(/\.[^.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { src: mod.default, alt, category };
  });
}

/* ------------------------------------------------------------------ */
/*  Tab definitions                                                   */
/* ------------------------------------------------------------------ */
const tabs = [
  { id: 'all', label: 'All' },
  { id: 'ground', label: 'Hardware Showroom' },
  { id: 'blum', label: 'Blum Experience Centre' },
  { id: 'astronea', label: 'Astronea Experience Centre' },
  { id: 'videos', label: 'Videos' },
] as const;

type TabId = (typeof tabs)[number]['id'];

/* ================================================================== */
/*  Gallery Page Component                                            */
/* ================================================================== */
const Gallery = () => {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* ---------- Build image arrays ---------------------------------- */
  const heroImages = useMemo(() => extractImages(heroGlob, 'ground'), []);
  const groundImages = useMemo(() => extractImages(groundGlob, 'ground'), []);
  const blumImages = useMemo(() => extractImages(blumGlob, 'blum'), []);
  const astroneaImages = useMemo(
    () => extractImages(astroneaGlob, 'astronea'),
    [],
  );

  const blumFallbacks = useMemo<GalleryImage[]>(() => [
    { src: heroKitchen, alt: 'Blum Kitchen Showcase', category: 'blum' },
    { src: blumHardware, alt: 'Blum Premium Hardware', category: 'blum' },
    { src: drawerSystem, alt: 'Blum Drawer Motion System', category: 'blum' },
  ], []);

  const astroneaFallbacks = useMemo<GalleryImage[]>(() => [
    { src: wardrobeSystem, alt: 'Astronea Wardrobe System', category: 'astronea' },
    { src: story1, alt: 'Premium Wardrobes & Storage', category: 'astronea' },
    { src: story2, alt: 'Italian Designer Walk-in Wardrobe', category: 'astronea' },
    { src: story3, alt: 'Exquisite Wardrobe Solutions', category: 'astronea' },
  ], []);

  // Use fallback images when corresponding folders are empty
  const effectiveGroundImages = useMemo(
    () => (groundImages.length > 0 ? groundImages : heroImages),
    [groundImages, heroImages],
  );

  const effectiveBlumImages = useMemo(
    () => (blumImages.length > 0 ? blumImages : blumFallbacks),
    [blumImages, blumFallbacks],
  );

  const effectiveAstroneaImages = useMemo(
    () => (astroneaImages.length > 0 ? astroneaImages : astroneaFallbacks),
    [astroneaImages, astroneaFallbacks],
  );

  const allImages = useMemo(
    () => [...effectiveGroundImages, ...effectiveBlumImages, ...effectiveAstroneaImages],
    [effectiveGroundImages, effectiveBlumImages, effectiveAstroneaImages],
  );

  /* ---------- Filtered images for current tab --------------------- */
  const filteredImages = useMemo(() => {
    switch (activeTab) {
      case 'all':
        return allImages;
      case 'ground':
        return effectiveGroundImages;
      case 'blum':
        return effectiveBlumImages;
      case 'astronea':
        return effectiveAstroneaImages;
      default:
        return [];
    }
  }, [activeTab, allImages, effectiveGroundImages, effectiveBlumImages, effectiveAstroneaImages]);

  /* ---------- Lightbox navigation --------------------------------- */
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredImages.length) % filteredImages.length
        : null,
    );
  }, [filteredImages.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : null,
    );
  }, [filteredImages.length]);

  /* ---------- Keyboard navigation --------------------------------- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  /* ================================================================ */
  return (
    <Layout>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Gallery
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground leading-tight">
              Explore Our{' '}
              <span className="text-gradient-metal">Showrooms</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Take a visual tour through Hyderabad Hardware — from our curated hardware showroom to the
              dedicated Blum and Astronea experience centres.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Tabs + Grid ──────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="Visual Tour"
            title={
              <>
                A Glimpse Inside{' '}
                <span className="text-gradient-metal">Our World</span>
              </>
            }
            description="Browse photos from our experience centres and showroom, or watch videos from our grand inaugurations."
          />

          {/* ── Tab bar ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap justify-center gap-2"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="gallery-tab-bg"
                    className="absolute inset-0 rounded-sm bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* ── Photo grid ───────────────────────────────────────── */}
          {activeTab !== 'videos' && (
            <motion.div
              layout
              className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.length > 0 ? (
                  filteredImages.map((img, index) => (
                    <motion.div
                      key={img.src}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                      className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-border cursor-pointer"
                      onClick={() => openLightbox(index)}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_24px_rgba(255,255,255,0.1)]">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-20 text-center"
                  >
                    <p className="text-muted-foreground text-lg">
                      Photos coming soon — stay tuned!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Videos section ───────────────────────────────────── */}
          {activeTab === 'videos' && (
            <motion.div
              layout
              className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {videoItems.map((video, index) => {
                  const hasSrc = 'src' in video && video.src;

                  return (
                    <motion.div
                      key={video.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-sm border border-border bg-card"
                    >
                      {hasSrc ? (
                        <video
                          src={video.src as unknown as string}
                          poster={video.poster ?? undefined}
                          controls
                          preload="metadata"
                          className="w-full aspect-video object-cover"
                        />
                      ) : (
                        /* Placeholder when no video file yet */
                        <div className="relative aspect-video bg-secondary/50 flex flex-col items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-primary ml-1" />
                          </div>
                          <span className="text-muted-foreground text-sm">
                            Video coming soon
                          </span>
                          {/* Decorative film icon */}
                          <Film className="absolute top-4 right-4 w-5 h-5 text-muted-foreground/40" />
                        </div>
                      )}

                      <div className="p-6">
                        <h3 className="text-lg font-serif font-medium text-foreground">
                          {video.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {video.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Lightbox Modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-2 rounded-sm bg-card border border-border text-foreground hover:text-primary transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            {filteredImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 md:left-8 z-10 p-3 rounded-sm bg-card/80 border border-border text-foreground hover:text-primary transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={filteredImages[lightboxIndex].src}
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm shadow-[var(--shadow-elevated)]"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next button */}
            {filteredImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 md:right-8 z-10 p-3 rounded-sm bg-card/80 border border-border text-foreground hover:text-primary transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Counter */}
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-medium tabular-nums">
              {lightboxIndex + 1} / {filteredImages.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
