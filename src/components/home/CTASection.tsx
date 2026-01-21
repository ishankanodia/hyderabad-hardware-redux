import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium tracking-widest uppercase"
          >
            Visit Our Showroom
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground"
          >
            Ready to Transform <span className="text-gradient-metal">Your Space?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Visit our showroom in Hyderabad to explore our complete range of premium hardware solutions. 
            Our experts are ready to help you find the perfect fittings for your project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-champagne-dark transition-all duration-300"
            >
              Get Directions
              <MapPin className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="tel:9849244555"
              className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Now
            </a>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Srinagar Colony, Hyderabad</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary" />
              <span>9849244555 | 9676748323</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-primary" />
              <span>hydexcl@gmail.com</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
