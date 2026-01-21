import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto text-center"
          >
            <span className="text-8xl font-serif font-light text-primary/30">404</span>
            <h1 className="mt-4 text-3xl md:text-4xl font-serif font-medium text-foreground">
              Page Not Found
            </h1>
            <p className="mt-4 text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-champagne-dark transition-all duration-300"
              >
                <Home className="mr-2 w-4 h-4" />
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-sm hover:border-primary hover:text-primary transition-all duration-300"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
