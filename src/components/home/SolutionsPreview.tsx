import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import drawerImage from '@/assets/drawer-system.jpg';
import wardrobeImage from '@/assets/wardrobe-system.jpg';
import doorImage from '@/assets/door-hardware.jpg';
import kitchenImage from '@/assets/hero-kitchen.jpg';

const solutions = [
  {
    title: 'Kitchen & Cabinet Hardware',
    description: 'Soft-close hinges, drawer systems, and motion technologies for seamless functionality.',
    image: kitchenImage,
    link: '/solutions',
  },
  {
    title: 'Wardrobe & Storage Systems',
    description: 'Premium wardrobe fittings, sliding mechanisms, and organized storage solutions.',
    image: wardrobeImage,
    link: '/solutions',
  },
  {
    title: 'Drawer & Motion Systems',
    description: 'Advanced drawer runners and lift systems for effortless cabinet access.',
    image: drawerImage,
    link: '/solutions',
  },
  {
    title: 'Door Hardware & Locks',
    description: 'Elegant handles, locking systems, and architectural door solutions.',
    image: doorImage,
    link: '/solutions',
  },
];

const MotionLink = motion(Link);

export const SolutionsPreview = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="What We Offer"
          title={<>Interior Solutions for <span className="text-gradient-metal">Every Space</span></>}
          description="From kitchen cabinets to wardrobes, we provide comprehensive hardware solutions that combine functionality with refined aesthetics."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MotionLink
                to={solution.link}
                className="group relative block h-80 md:h-96 overflow-hidden rounded-sm"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                        {solution.title}
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        {solution.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              </MotionLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
