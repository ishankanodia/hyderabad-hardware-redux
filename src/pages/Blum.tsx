import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, ExternalLink } from 'lucide-react';
import blumImage from '@/assets/blum-hardware.jpg';
import drawerImage from '@/assets/drawer-system.jpg';
import kitchenImage from '@/assets/hero-kitchen.jpg';

const products = [
  {
    category: 'BLUMOTION',
    title: 'Soft-Close Technology',
    description: 'Silent, gentle closing for drawers and doors. The integrated soft-close ensures furniture closes softly and effortlessly.',
  },
  {
    category: 'SERVO-DRIVE',
    title: 'Electrical Opening Support',
    description: 'Touch to open technology for a handle-less furniture design. Gentle touch or pull activates the electric drive.',
  },
  {
    category: 'LEGRABOX',
    title: 'Premium Drawer System',
    description: 'Slim design drawer system with superior functionality. Elegant aesthetics combined with whisper-quiet operation.',
  },
  {
    category: 'TIP-ON',
    title: 'Mechanical Opening',
    description: 'Handle-less opening for minimalist designs. A gentle push opens the door or drawer with precision.',
  },
  {
    category: 'AVENTOS',
    title: 'Lift Systems',
    description: 'Innovative solutions for upper cabinets. Lift systems that make accessing overhead storage effortless.',
  },
  {
    category: 'CLIP top',
    title: 'Hinge Systems',
    description: 'Concealed hinges with tool-free adjustment. Premium quality for years of reliable performance.',
  },
];

const features = [
  'Live product demonstrations',
  'Expert consultation available',
  'Full Blum product range on display',
  'Hands-on experience with motion technologies',
  'Cabinet applications and solutions',
  'Material samples and finishes',
];

const Blum = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={kitchenImage}
            alt="Blum kitchen hardware"
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
              Blum Experience{' '}
              <span className="text-gradient-metal">Centre</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover the world of Blum motion technologies at our dedicated experience centre. 
              Touch, feel, and experience world-class furniture fittings that transform everyday use.
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
                href="https://www.blum.com/in/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Blum Website
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
            >
              <img
                src={blumImage}
                alt="Blum hardware close-up"
                className="w-full rounded-sm"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-primary text-sm font-medium tracking-widest uppercase">
                About Blum
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                Austrian Quality, Global Standard
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Blum is an Austrian family-owned company that has been developing and manufacturing 
                furniture fittings since 1952. Today, Blum is one of the world's leading manufacturers 
                of hinges, lift systems, and drawer systems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At our Blum Experience Centre, you can explore the complete range of motion 
                technologies – from soft-close systems to electrical opening support. Our trained 
                staff will guide you through the possibilities.
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
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="Featured Technologies"
            title={<>Blum Motion <span className="text-gradient-metal">Technologies</span></>}
            description="Experience the innovation and quality that has made Blum a global leader in furniture fittings."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-card border border-border rounded-sm hover:border-primary/50 transition-all duration-300"
              >
                <span className="text-xs font-medium text-primary tracking-wider uppercase">
                  {product.category}
                </span>
                <h3 className="mt-2 text-xl font-serif font-medium text-foreground">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {product.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="In Action"
            title={<>See Blum <span className="text-gradient-metal">Quality</span></>}
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/3] overflow-hidden rounded-sm"
            >
              <img
                src={drawerImage}
                alt="Blum drawer system"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-[4/3] overflow-hidden rounded-sm"
            >
              <img
                src={kitchenImage}
                alt="Kitchen with Blum hardware"
                className="w-full h-full object-cover"
              />
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
              title={<>Visit Our Blum <span className="text-gradient-metal">Showroom</span></>}
              description="Located on the first floor of Hyderabad Hardware, our Blum Experience Centre offers hands-on demonstrations and expert guidance."
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

export default Blum;
