import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Building } from 'lucide-react';
import fallbackHeroImage from '@/assets/showroom.jpg';

const heroImageModules = import.meta.glob('../../assets/hero/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const formatImageAlt = (path: string) => {
  const fileName = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'hero image';

  return fileName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const loadedHeroSlides = Object.entries(heroImageModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath, undefined, { numeric: true }))
  .map(([path, image]) => ({
    image,
    alt: formatImageAlt(path),
  }));

const heroSlides = loadedHeroSlides.length
  ? loadedHeroSlides
  : [{ image: fallbackHeroImage, alt: 'Hyderabad Hardware showroom' }];

const CountUpValue = ({ value }: { value: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(String(target), '');
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || Number.isNaN(target)) {
      return;
    }

    let frame = 0;
    const totalFrames = 70;
    const easeOut = (progress: number) => 1 - Math.pow(1 - progress, 3);

    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      setDisplayValue(Math.round(target * easeOut(progress)));

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    };

    const animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isInView, target]);

  return (
    <p ref={ref} className="text-2xl font-serif font-semibold text-foreground">
      {displayValue}{suffix}
    </p>
  );
};

export const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <motion.div
          className="flex h-full"
          animate={{ x: `-${activeSlide * 100}%` }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {heroSlides.map((slide, index) => (
            <div key={slide.image} className="relative min-w-full h-full overflow-hidden">
              <motion.img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{
                  scale: activeSlide === index ? 1.08 : 1.03,
                  x: activeSlide === index ? ['0%', '-1.5%'] : '0%',
                  y: activeSlide === index ? ['0%', '-1%'] : '0%',
                }}
                transition={{
                  duration: 4.5,
                  ease: 'easeInOut',
                }}
              />
            </div>
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/35" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-6"
          >
            Premium Interior Solutions
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-tight mb-6"
          >
            Crafting Spaces with{' '}
            <span className="text-gradient-metal">Precision Hardware</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Hyderabad's trusted destination for premium architectural and furniture hardware. 
            We partner with the world's leading brands to bring reliability and elegance to every interior.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/solutions"
              className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-champagne-dark transition-all duration-300"
            >
              Explore Solutions
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact#map"
              className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Visit Our Showroom
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl"
        >
          {[
            { icon: Award, label: 'Premium Brands', value: '5+' },
            { icon: Users, label: 'Happy Clients', value: '2000+' },
            { icon: Building, label: 'Experience Centres', value: '2' },
          ].map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CountUpValue value={stat.value} />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {heroSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === index ? 'w-10 bg-primary' : 'w-4 bg-foreground/30 hover:bg-foreground/60'
              }`}
              aria-label={`Show hero image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
