import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Check, Sparkles } from 'lucide-react';

// Hardware product images
import kitchenImage from '@/assets/hero-kitchen.jpg';
import drawerImage from '@/assets/drawer-system.jpg';
import wardrobeImage from '@/assets/wardrobe-system.jpg';
import doorImage from '@/assets/door-hardware.jpg';
import blumImage from '@/assets/blum-hardware.jpg';

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
  },
];
const Solutions = () => {

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

      {/* Solutions Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-28">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}
              >
                {/* Image panel */}
                <div
                  className={`lg:col-span-6 relative overflow-hidden rounded-md border border-border group ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  {/* Photo container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* Brand tag overlay */}
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-secondary border border-border text-xs text-primary font-medium tracking-wider rounded-sm shadow-md">
                    {solution.brand}
                  </span>
                </div>

                {/* Content Panel */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                    {solution.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {solution.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {solution.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3 text-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
