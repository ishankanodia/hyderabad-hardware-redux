import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

// Original Blum showroom photos
import blumShowroom1 from '@/assets/gallery/blum/blum-showroom-1.jpg';
import blumShowroom2 from '@/assets/gallery/blum/blum-showroom-3.jpg';
import blumShowroom3 from '@/assets/gallery/blum/blum-showroom-4.jpg';
import blumShowroom4 from '@/assets/gallery/blum/blum-showroom-8.jpg';

// Original Astronea showroom photos
import astroneaShowroom1 from '@/assets/gallery/astronea/astronea-showroom-1.jpg';
import astroneaShowroom2 from '@/assets/gallery/astronea/astronea-showroom-2.jpg';
import astroneaShowroom3 from '@/assets/gallery/astronea/astronea-showroom-3.jpg';
import astroneaShowroom4 from '@/assets/gallery/astronea/astronea-showroom-4.jpg';

const centres = [
  {
    name: 'Blum Experience Centre',
    description: 'Discover the world of Blum motion technologies. Experience soft-close systems, lift mechanisms, and innovative drawer solutions that transform everyday furniture use.',
    features: ['BLUMOTION soft-close', 'SERVO-DRIVE electrical systems', 'LEGRABOX drawer systems', 'TIP-ON mechanical opening'],
    images: [blumShowroom1, blumShowroom2, blumShowroom3, blumShowroom4],
    link: '/blum',
    floor: 'Premium Fittings',
  },
  {
    name: 'Astronea Experience Centre',
    description: 'Explore premium Italian wardrobe concepts featuring designer walk-ins, sliding systems, and luxury aluminum profiles in stunning finishes.',
    features: ['Designer walk-in systems', 'Sliding wardrobe mechanisms', 'Premium aluminum profiles', 'Luxury finish options'],
    images: [astroneaShowroom1, astroneaShowroom2, astroneaShowroom3, astroneaShowroom4],
    link: '/astronea',
    floor: 'Italian Wardrobes',
  },
];

const MotionLink = motion(Link);

const CardCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000 + Math.random() * 1000); // Slightly staggered cycles
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          alt={alt}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export const ExperienceCentres = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="Dedicated Spaces"
          title={
            <>
              Experience Centres at <span className="text-gradient-metal">Our Location</span>
            </>
          }
          description="Visit our dedicated experience centres to explore world-class hardware solutions. Touch, feel, and experience the quality before you decide."
        />

        <div className="mt-16 space-y-12">
          {centres.map((centre, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -36 : 36, y: 24 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.65, ease: 'easeOut' }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <MotionLink
                  to={centre.link}
                  className="group block relative overflow-hidden rounded-sm aspect-[4/3] border border-border"
                  whileHover={{ scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
                  <CardCarousel images={centre.images} alt={centre.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <span className="inline-flex items-center text-primary font-medium">
                      Explore Centre <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </MotionLink>
              </div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 36 : -36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.15, duration: 0.65, ease: 'easeOut' }}
                className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <span className="text-sm text-primary font-medium tracking-wider uppercase">
                  {centre.floor}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                  {centre.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {centre.description}
                </p>
                <ul className="grid grid-cols-2 gap-3">
                  {centre.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={centre.link}
                  className="inline-flex items-center gap-2 text-primary hover:text-champagne-light transition-colors font-medium"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
