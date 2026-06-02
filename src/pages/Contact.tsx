import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MapPin, Phone, Mail, Clock, Instagram, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('https://formspree.io/f/xqepdygn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }),
    });

    if (response.ok) {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you soon.',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    toast({
      title: 'Something went wrong',
      description: 'Please try again later or contact us directly.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};


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
              Get In Touch
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground leading-tight">
              Contact{' '}
              <span className="text-gradient-metal">Us</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Visit our showroom in Srinagar Colony, Hyderabad to explore our complete range of 
              premium hardware solutions. Our team is ready to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-serif font-medium text-foreground mb-6">
                  Visit Our Showroom
                </h2>
                <div className="space-y-6">
                  <div className="group flex items-start gap-4 rounded-sm p-3 -m-3 transition-colors duration-300 hover:bg-primary/5">
                    <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.2)]">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        Hyderabad Hardware<br />
                        Sai Avenue, 198 & 199, Kamalapuri Colony,<br />
                        Srinagar Colony Main Road,<br />
                        Hyderabad – 500073
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-4 rounded-sm p-3 -m-3 transition-colors duration-300 hover:bg-primary/5">
                    <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.2)]">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:9849244555" className="hover:text-primary transition-colors">
                          9849244555
                        </a>
                        <br />
                        <a href="tel:9676748323" className="hover:text-primary transition-colors">
                          9676748323
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-4 rounded-sm p-3 -m-3 transition-colors duration-300 hover:bg-primary/5">
                    <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.2)]">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:hydexcl@gmail.com" className="hover:text-primary transition-colors">
                          hydexcl@gmail.com
                        </a>
                        <br />
                        <a href="mailto:ikanodia2004@gmail.com" className="hover:text-primary transition-colors">
                          ikanodia2004@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-4 rounded-sm p-3 -m-3 transition-colors duration-300 hover:bg-primary/5">
                    <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.2)]">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 10:00 AM - 8:00 PM<br />
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-4 rounded-sm p-3 -m-3 transition-colors duration-300 hover:bg-primary/5">
                    <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.2)]">
                      <Instagram className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Follow Us</h3>
                      <a
                        href="https://www.instagram.com/hyderabad.hardware/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        @hyderabad.hardware
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Centres */}
              <div className="pt-8 border-t border-border">
                <h3 className="font-serif font-medium text-foreground mb-4">
                  Experience Centres at Our Location
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong className="text-foreground">Blum Experience Centre</strong> — First Floor</li>
                  <li>• <strong className="text-foreground">Astronea Experience Centre</strong> — Third Floor</li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            >
              <div className="p-8 bg-card border border-border rounded-sm">
                <h2 className="text-2xl font-serif font-medium text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-champagne-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <SectionTitle
            subtitle="Find Us"
            title={<>Our <span className="text-gradient-metal">Location</span></>}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121813.39931525792!2d78.35156214925104!3d17.427678457243807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91c99d358607%3A0x7dc08bc3baee5c7d!2sHyderabad%20Hardware!5e0!3m2!1sen!2sin!4v1769109831016!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hyderabad Hardware Location"
            />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
