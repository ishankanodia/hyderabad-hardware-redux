import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionTitleProps {
  subtitle?: string;
  title: string | ReactNode;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionTitle = ({ subtitle, title, description, align = 'center' }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
    >
      {subtitle && (
        <span className="text-primary text-sm font-medium tracking-widest uppercase">
          {subtitle}
        </span>
      )}
      <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};
