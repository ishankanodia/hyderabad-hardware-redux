import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Brands from "./pages/Brands";
import Blum from "./pages/Blum";
import Astronea from "./pages/Astronea";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

const App = () => {
  const location = useLocation();

  return (
    <TooltipProvider>
      <Toaster />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/blum" element={<Blum />} />
            <Route path="/astronea" element={<Astronea />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

    </TooltipProvider>
  );
};

export default App;
