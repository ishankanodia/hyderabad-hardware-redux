import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, ExternalLink } from 'lucide-react';
import wardrobeImage from '@/assets/wardrobe-system.jpg';

const collections = [
  {
    name: 'Vesta Plus Series',
    description: 'Premium openable wardrobe system with Air Hinges made in Italy. Maximum door size up to 600mm x 3000mm with elegant finishes.',
    finishes: ['Black Matt', 'Brush Gold', 'Bronze', 'Champagne'],
  },
  {
    name: 'Vesta Series Pro',
    description: 'Advanced door frame system with soft-close hinges. Features 105° opening angle and accommodates 5mm glass panels.',
    finishes: ['Black Matt', 'Brush Gold', 'Bronze'],
  },
  {
    name: 'Pegasus Series',
    description: 'Designer wardrobe collection with Italian craftsmanship. Premium aluminum profiles with glass insert systems.',
    finishes: ['Premium Aluminum', 'Custom Options'],
  },
  {
    name: 'Lexus Series',
    description: 'Luxury sliding wardrobe mechanisms with smooth operation. Perfect for contemporary and minimalist interiors.',
    finishes: ['Multiple Options Available'],
  },
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
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={wardrobeImage}
            alt="Astronea wardrobe system"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        </div>

        <div className="relative container mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Experience Centre • First Floor
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
                to="/contact"
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

      {/* Collections */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="Designer Collections"
            title={<>Astronea Wardrobe <span className="text-gradient-metal">Systems</span></>}
            description="Explore our curated selection of premium wardrobe systems from Astronea's designer collection."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-card border border-border rounded-sm hover:border-primary/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-serif font-medium text-foreground">
                  {collection.name}
                </h3>
                <p className="mt-4 text-muted-foreground">
                  {collection.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Finishes:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {collection.finishes.map((finish, fIndex) => (
                      <span
                        key={fIndex}
                        className="px-3 py-1 text-xs bg-secondary text-foreground rounded-sm"
                      >
                        {finish}
                      </span>
                    ))}
                  </div>
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

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              subtitle="Experience Centre"
              title={<>Visit Our Astronea <span className="text-gradient-metal">Showroom</span></>}
              description="Located on the first floor of Hyderabad Hardware, our Astronea Experience Centre showcases the finest Italian wardrobe systems."
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
                Get Directions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Astronea;
