import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-semibold text-gradient-metal">
              Hyderabad Hardware
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium interior hardware solutions for architects, designers, and homeowners. 
              Your trusted partner for quality fittings since 2016.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-medium text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Interior Solutions', path: '/solutions' },
                { name: 'Our Brands', path: '/brands' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Centres */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-medium text-foreground">Experience Centres</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blum"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Blum Experience Centre
                </Link>
              </li>
              <li>
                <Link
                  to="/astronea"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Astronea Experience Centre
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-medium text-foreground">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Sai Avenue, 198 & 199, Kamalapuri Colony,
                  Srinagar Colony Main Road, Hyderabad – 500073
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <a href="tel:9849244555" className="hover:text-primary transition-colors">
                    9849244555
                  </a>
                  {' | '}
                  <a href="tel:9676748323" className="hover:text-primary transition-colors">
                    9676748323
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:hydexcl@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  hydexcl@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Instagram className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="https://www.instagram.com/hyderabad.hardware/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  @hyderabad.hardware
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hyderabad Hardware. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Premium Interior Solutions • Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
};
