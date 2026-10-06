import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

import hettichLogo from '@/assets/logos/hettich.png';
import saliceLogo from '@/assets/logos/salice.avif';
import grassLogo from '@/assets/logos/grass.jpg';
import dorsetLogo from '@/assets/logos/dorset.jpg';
import labachaLogo from '@/assets/logos/labacha.jpg';
import blumLogo from '@/assets/logos/blum.png';
import astroneaLogo from '@/assets/logos/astronea.png';

const brands = [
  {
    name: 'Hettich',
    tagline: 'German Precision Engineering',
    description: 'Hettich is one of the world\'s leading manufacturers of furniture fittings. With German engineering precision, they deliver innovative solutions for drawers, hinges, sliding doors, and organizational systems that combine functionality with elegant design.',
    categories: ['Drawer Systems', 'Hinges', 'Sliding Door Hardware', 'Organizational Systems'],
    origin: 'Germany',
    website: 'https://www.hettich.com',
    logo: hettichLogo,
  },
  {
    name: 'Salice',
    tagline: 'Italian Design Excellence',
    description: 'Salice brings Italian design sensibility to furniture hardware. Known for their innovative hinge systems and soft-close technologies, Salice products represent the perfect marriage of form and function in contemporary furniture design.',
    categories: ['Hinge Systems', 'Lift Systems', 'Drawer Runners', 'Sliding Systems'],
    origin: 'Italy',
    website: 'https://www.salice.com',
    logo: saliceLogo,
  },
  {
    name: 'Grass',
    tagline: 'Austrian Innovation',
    description: 'Grass is an Austrian company renowned for movement systems in furniture. Their products feature exceptional quality and innovative motion technologies that make furniture operation a pleasure.',
    categories: ['Drawer Systems', 'Hinges', 'Flap Systems', 'Organizational Systems'],
    origin: 'Austria',
    website: 'https://www.grass.eu',
    logo: grassLogo,
  },
  {
    name: 'Dorset',
    tagline: 'Premium Architectural Hardware',
    description: 'Dorset offers a comprehensive range of architectural and furniture hardware. From door handles to cabinet fittings, Dorset products combine durability with refined aesthetics for discerning projects.',
    categories: ['Door Handles', 'Cabinet Hardware', 'Locks & Security', 'Architectural Fittings'],
    origin: 'India',
    website: 'https://www.dorsetkaba.com',
    logo: dorsetLogo,
  },
  {
    name: 'Labacha',
    tagline: 'Quality Craftsmanship',
    description: 'Labacha delivers reliable hardware solutions with a focus on quality and value. Their range of fittings provides practical solutions for various furniture and interior applications.',
    categories: ['Furniture Fittings', 'Cabinet Hardware', 'Storage Solutions', 'Accessories'],
    origin: 'India',
    website: '#',
    logo: labachaLogo,
  },
];
const Brands = () => {
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
              Our Partners
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground leading-tight">
              Trusted Hardware{' '}
              <span className="text-gradient-metal">Brands</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              We partner with the world's leading hardware manufacturers to bring you products 
              that combine innovation, quality, and long-term reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brands List */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 bg-card border border-border rounded-sm hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-shrink-0 w-32 h-20 bg-white rounded-sm flex items-center justify-center p-4">
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                      <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                        {brand.name}
                      </h2>
                      <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-sm">
                        {brand.origin}
                      </span>
                    </div>
                    <p className="text-primary font-medium">{brand.tagline}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {brand.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {brand.categories.map((category, cIndex) => (
                        <span
                          key={cIndex}
                          className="px-3 py-1 text-xs bg-secondary text-muted-foreground rounded-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  {brand.website !== '#' && (
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-champagne-light transition-colors font-medium whitespace-nowrap"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Centres CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="Experience More"
            title={<>Dedicated Experience <span className="text-gradient-metal">Centres</span></>}
            description="In addition to these brands, we operate dedicated experience centres for Blum and Astronea at our location."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to="/blum"
                className="block p-8 bg-secondary/50 border border-border rounded-sm hover:border-primary/50 transition-all duration-300 text-center"
              >
                <div className="mb-4 h-16 flex items-center justify-center">
                  <img src={blumLogo} alt="Blum logo" className="max-h-full w-auto object-contain" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-foreground mb-2">
                  Blum Experience Centre
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  World-class motion technologies for furniture
                </p>
                <span className="inline-flex items-center text-primary font-medium">
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to="/astronea"
                className="block p-8 bg-secondary/50 border border-border rounded-sm hover:border-primary/50 transition-all duration-300 text-center"
              >
                <div className="mb-4 h-16 flex items-center justify-center">
                  <img src={astroneaLogo} alt="Astronea logo" className="max-h-full w-auto object-contain" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-foreground mb-2">
                  Astronea Experience Centre
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Italian luxury wardrobe concepts
                </p>
                <span className="inline-flex items-center text-primary font-medium">
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Brands;
