import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MapPin, Phone, Mail, Clock, Instagram, Send, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import pavanPortrait from '@/assets/pavan-kanodia.jpg';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      setIsSuccess(true);
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
                  <li>• <strong className="text-foreground">Blum Experience Centre</strong></li>
                  <li>• <strong className="text-foreground">Astronea Experience Centre</strong></li>
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

                  <p className="text-xs text-muted-foreground text-center">
                    By sending this message, you agree to our{' '}
                    <Link to="/privacy-policies" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Owner Consultation Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="relative group p-8 bg-secondary/30 rounded-sm border border-primary/20 shadow-md">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Owner portrait */}
                <div className="w-24 h-24 rounded-full border border-primary/30 overflow-hidden shrink-0 shadow-lg">
                  <img src={pavanPortrait} alt="Pavan Kumar Kanodia" className="w-full h-full object-cover" />
                </div>
                {/* Details */}
                <div className="text-center md:text-left space-y-3 flex-1">
                  <span className="text-xs font-sans font-semibold tracking-wider text-primary uppercase">
                    Direct Consultation
                  </span>
                  <h3 className="text-2xl font-serif font-medium text-foreground leading-tight">
                    Speak to Our Owner
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    For bulk orders, architect collaborations, or high-end project guidance, connect with Mr. Pavan Kumar Kanodia directly. Mr. Kanodia brings over two decades of expertise to help realize your vision.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://wa.me/919849244555?text=Hi%20Mr.%20Pavan%20Kanodia,%20I%20would%20like%20to%20discuss%20a%20premium%20project%20for%20my%20home."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium hover:bg-champagne-dark transition-all duration-300 rounded-sm shadow-md text-sm"
                    >
                      WhatsApp Owner Directly <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccess(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md p-8 bg-card border border-primary/20 rounded-sm shadow-2xl text-center space-y-6 overflow-hidden z-10"
            >
              <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-primary/5 blur-[50px] pointer-events-none" />
              
              <button
                onClick={() => setIsSuccess(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_24px_rgba(212,163,89,0.2)]">
                  <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-medium text-foreground">
                  Thank You!
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your message has been sent successfully. Our team will review it and get back to you shortly.
                </p>
              </div>

              <button
                onClick={() => setIsSuccess(false)}
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-champagne-dark transition-all duration-300 shadow-md text-sm"
              >
                Close Window
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Contact;
