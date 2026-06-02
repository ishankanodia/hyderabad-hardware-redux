import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

import hettichLogo from '@/assets/logos/hettich.png';
import saliceLogo from '@/assets/logos/salice.avif';
import grassLogo from '@/assets/logos/grass.jpg';
import dorsetLogo from '@/assets/logos/dorset.jpg';
import labachaLogo from '@/assets/logos/labacha.jpg';

const brands = [
  { name: 'Hettich', description: 'German precision engineering', logo: hettichLogo },
  { name: 'Salice', description: 'Italian design excellence', logo: saliceLogo },
  { name: 'Grass', description: 'Austrian innovation', logo: grassLogo },
  { name: 'Dorset', description: 'Premium architectural hardware', logo: dorsetLogo },
  { name: 'Labacha', description: 'Quality craftsmanship', logo: labachaLogo },
];

export const BrandsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="Trusted Partners"
          title={<>Brands We <span className="text-gradient-metal">Work With</span></>}
          description="We partner with the world's leading hardware manufacturers to ensure quality, reliability, and long-term performance in every project."
        />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 bg-white border border-border rounded-sm hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center aspect-[4/3]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-sm" />
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`}
                className="relative max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <p className="relative mt-3 text-xs text-muted-foreground text-center">
                {brand.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
