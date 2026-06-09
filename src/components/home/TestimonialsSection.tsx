import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

const testimonials = [
  {
    text: 'Exceptional quality hardware. The Blum products transformed our kitchen completely. Best showroom in Hyderabad.',
    name: 'Priya Reddy',
    role: 'Interior Designer',
  },
  {
    text: 'One-stop shop for all hardware needs. Their team guided us through every selection perfectly.',
    name: 'Rajesh Kumar',
    role: 'Architect',
  },
  {
    text: 'The Astronea wardrobe systems are phenomenal. Smooth operation and premium finish.',
    name: 'Ananya Sharma',
    role: 'Homeowner',
  },
  {
    text: "We've been sourcing from Hyderabad Hardware for 3 years. Consistently excellent quality and service.",
    name: 'Mohammed Irfan',
    role: 'Contractor',
  },
  {
    text: 'Their Blum Experience Centre is a must-visit. Helped us understand exactly what we needed.',
    name: 'Kavitha Nair',
    role: 'Interior Designer',
  },
  {
    text: 'Premium products with knowledgeable staff. They helped design our entire kitchen hardware layout.',
    name: 'Suresh Patel',
    role: 'Homeowner',
  },
  {
    text: 'The wardrobe fittings from Astronea are world-class. Our clients love the soft-close mechanisms.',
    name: 'Deepa Murthy',
    role: 'Architect',
  },
  {
    text: 'Best hardware showroom in Hyderabad. The variety and quality is unmatched.',
    name: 'Vikram Singh',
    role: 'Builder',
  },
];

const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(4, 8);

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) => (
  <div className="w-[340px] sm:w-[380px] shrink-0 bg-card border border-border rounded-sm p-6 hover:border-primary/30 transition-colors duration-300">
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-primary text-primary"
        />
      ))}
    </div>

    {/* Review Text */}
    <p className="text-foreground/90 text-sm leading-relaxed line-clamp-3 mb-5">
      "{testimonial.text}"
    </p>

    {/* Reviewer */}
    <div>
      <p className="font-serif font-medium text-foreground text-base">
        {testimonial.name}
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {testimonial.role === 'Interior Designer' ||
        testimonial.role === 'Architect'
          ? testimonial.role
          : `${testimonial.role} · via Google Reviews`}
      </p>
    </div>
  </div>
);

const marqueeKeyframes = `
  @keyframes marquee-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marquee-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
`;

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-card overflow-hidden">
      <style>{marqueeKeyframes}</style>

      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="Testimonials"
          title={
            <>
              What Our Clients{' '}
              <span className="text-gradient-metal">Say</span>
            </>
          }
        />

        {/* Google Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-6 mb-14"
        >
          <a
            href="https://www.google.com/maps/search/?api=1&query=Hyderabad+Hardware+Srinagar+Colony+Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary hover:bg-primary/20 transition-colors duration-300"
          >
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium">4.8★ on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="group mb-5"
      >
        <div
          className="flex gap-5 w-max"
          style={{
            animation: 'marquee-left 35s linear infinite',
            animationPlayState: 'running',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running';
          }}
        >
          {[...row1, ...row1].map((testimonial, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={testimonial} />
          ))}
        </div>
      </motion.div>

      {/* Marquee Row 2 — scrolls right */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="group"
      >
        <div
          className="flex gap-5 w-max"
          style={{
            animation: 'marquee-right 38s linear infinite',
            animationPlayState: 'running',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running';
          }}
        >
          {[...row2, ...row2].map((testimonial, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={testimonial} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
