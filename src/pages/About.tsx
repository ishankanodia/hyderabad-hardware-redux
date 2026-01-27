import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Award, Users, Target, Heart } from 'lucide-react';
import { StorySlider } from '@/components/ui/StorySlider';

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'We source only from trusted global brands, ensuring every product meets the highest standards.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'We work closely with architects, designers, and homeowners to deliver tailored solutions.',
  },
  {
    icon: Target,
    title: 'Precision Focus',
    description: 'Every fitting is selected for its precision engineering and long-term reliability.',
  },
  {
    icon: Heart,
    title: 'Lasting Relationships',
    description: 'Our commitment extends beyond the sale, with ongoing support and expertise.',
  },
];

const About = () => {
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
              About Us
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground leading-tight">
              Your Trusted Partner in{' '}
              <span className="text-gradient-metal">Interior Solutions</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Hyderabad Hardware has established itself as the premier destination for premium
              architectural and furniture hardware in Hyderabad, serving homeowners, architects,
              and interior designers with excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT: SLIDING IMAGES */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <StorySlider />
            </motion.div>

            {/* RIGHT: TEXT */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-primary text-sm font-medium tracking-widest uppercase">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground">
                Built on Quality, Driven by Design
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  What began as a vision to bring world-class hardware to Hyderabad has grown
                  into a comprehensive solution centre for interior hardware needs. Our showroom
                  in Srinagar Colony stands as a testament to our commitment to quality.
                </p>
                <p>
                  We don't just sell hardware – we provide complete solutions. Our team understands
                  that the right hinges, drawer systems, and fittings can transform furniture from
                  functional to exceptional.
                </p>
                <p>
                  With dedicated experience centres for Blum and Astronea under the same roof,
                  we offer an unparalleled opportunity to explore, compare, and choose the perfect
                  hardware for any project.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="Our Values"
            title={<>What <span className="text-gradient-metal">Drives Us</span></>}
            description="Our core values shape every interaction and decision at Hyderabad Hardware."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-secondary/50 border border-border rounded-sm hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-serif font-medium text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionTitle
              subtitle="Why Hyderabad Hardware"
              title={<>The Complete <span className="text-gradient-metal">Hardware Solution</span></>}
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: '01', title: 'Expert Guidance', text: 'Knowledgeable staff to help you choose the right solutions' },
                { number: '02', title: 'Premium Brands', text: 'Access to world-leading hardware manufacturers' },
                { number: '03', title: 'One Location', text: 'Everything you need under one roof in Hyderabad' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <span className="text-5xl font-serif font-light text-primary/30">
                    {item.number}
                  </span>
                  <h3 className="mt-2 text-lg font-serif font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
