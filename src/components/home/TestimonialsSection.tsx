import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

// Real Google reviews. Cards with `text` render as full quotes; rating-only
// reviews (no `text`) render as compact star cards. Order is interleaved so
// quotes and star-only cards mix evenly across the two marquee rows.
const testimonials = [
  {
    text: 'Good collection with good customer service. Many options to select from. Good discounts with good quality.',
    name: 'Satish Patel',
    role: '',
    rating: 5,
  },
  { name: 'Rayhan Ulla', role: '', rating: 5 },
  { name: 'Imran Ansari', role: '', rating: 5 },
  {
    text: 'One of the best showrooms for hardware needs!',
    name: 'Nikhil Jain',
    role: 'Local Guide',
    rating: 5,
  },
  { name: 'Ramesh Malani', role: '', rating: 4 },
  { name: 'Narayan Ram', role: '', rating: 5 },
  {
    text: 'Range, pricing, service… satisfied on all counts.',
    name: 'Balaji Enterprises',
    role: '',
    rating: 5,
  },
  { name: 'Rajan Vishwakarma', role: '', rating: 5 },
  { name: 'Jagadish Mundada', role: '', rating: 5 },
  {
    text: 'Excellent collection and wide range of products for selection.',
    name: 'Golamari Sampath Reddy',
    role: '',
    rating: 5,
  },
  { name: 'Venkatesh Pundla', role: '', rating: 5 },
  { name: 'Poorna Polisetty', role: '', rating: 4 },
  {
    text: 'Nice collection.',
    name: 'Sampath Kumar',
    role: 'Local Guide',
    rating: 4,
  },
  { name: 'Sridhar Reddy', role: 'Local Guide', rating: 4 },
  { name: 'Rajshekhar Yadhav', role: 'Local Guide', rating: 5 },
  {
    text: 'Nice product.',
    name: 'Venkata Prasad Guttula',
    role: '',
    rating: 5,
  },
  { name: 'Akkala Babu', role: 'Local Guide', rating: 5 },
  { name: 'Kranthi Kumar', role: 'Local Guide', rating: 5 },
  {
    text: 'Great experience!',
    name: 'Ishan Kanodia',
    role: '',
    rating: 5,
  },
  { name: 'Abhishek M', role: '', rating: 5 },
  { name: 'Mohammed Zubair Sharief', role: '', rating: 5 },
];

const half = Math.ceil(testimonials.length / 2);
const row1 = testimonials.slice(0, half);
const row2 = testimonials.slice(half);

type Testimonial = {
  name: string;
  role: string;
  rating: number;
  text?: string;
};

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'
        }`}
      />
    ))}
  </div>
);

const Reviewer = ({ testimonial }: { testimonial: Testimonial }) => (
  <div>
    <p className="font-serif font-medium text-foreground text-base">
      {testimonial.name}
    </p>
    <p className="text-xs text-muted-foreground mt-0.5">
      {testimonial.role
        ? `${testimonial.role} · via Google Reviews`
        : 'via Google Reviews'}
    </p>
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  // Rating-only review (no written text) → compact star card.
  if (!testimonial.text) {
    return (
      <div className="w-[220px] sm:w-[240px] shrink-0 bg-card border border-border rounded-sm p-6 flex flex-col justify-center gap-4 hover:border-primary/30 transition-colors duration-300">
        <Stars rating={testimonial.rating} />
        <Reviewer testimonial={testimonial} />
      </div>
    );
  }

  return (
    <div className="w-[340px] sm:w-[380px] shrink-0 bg-card border border-border rounded-sm p-6 hover:border-primary/30 transition-colors duration-300">
      <div className="mb-4">
        <Stars rating={testimonial.rating} />
      </div>

      <p className="text-foreground/90 text-sm leading-relaxed line-clamp-3 mb-5">
        "{testimonial.text}"
      </p>

      <Reviewer testimonial={testimonial} />
    </div>
  );
};

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
            <span className="font-medium">4.7★ · 39 Google reviews</span>
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
