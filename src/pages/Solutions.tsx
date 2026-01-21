import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import drawerImage from '@/assets/drawer-system.jpg';
import wardrobeImage from '@/assets/wardrobe-system.jpg';
import doorImage from '@/assets/door-hardware.jpg';
import kitchenImage from '@/assets/hero-kitchen.jpg';
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
  },
];

const Solutions = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Our Solutions
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground leading-tight">
              Complete Interior{' '}
              <span className="text-gradient-metal">Hardware Solutions</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              From kitchens to wardrobes, doors to furniture, we provide comprehensive hardware 
              solutions that combine world-class quality with exceptional functionality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                    {solution.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                  <ul className="space-y-3">
                    {solution.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3 text-foreground">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-primary hover:text-champagne-light transition-colors font-medium"
                  >
                    Enquire Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              subtitle="Need Expert Advice?"
              title={<>Let's Discuss Your <span className="text-gradient-metal">Project</span></>}
              description="Our team of experts is ready to help you select the perfect hardware solutions for your interior project."
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-champagne-dark transition-all duration-300"
              >
                Contact Us Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
