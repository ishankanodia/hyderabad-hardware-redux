import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import img1 from "@/assets/story/story1.jpg";
import img2 from "@/assets/story/story2.jpg";
import img3 from "@/assets/story/story3.jpg";

const images = [img1, img2, img3];

// clone first image at the end
const slides = [...images, images[0]];

export const StorySlider = () => {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setInstant(false);
      setIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // when we reach cloned slide, jump back to real first slide instantly
    if (index === slides.length - 1) {
      setTimeout(() => {
        setInstant(true);
        setIndex(0);
      }, 900); // must match animation duration
    }
  }, [index]);

  return (
    <div className="relative w-full overflow-hidden rounded-sm">
      <motion.div
        className="flex"
        animate={{ x: `-${index * 100}%` }}
        transition={
          instant
            ? { duration: 0 }
            : { duration: 0.9, ease: "easeInOut" }
        }
      >
        {slides.map((img, i) => (
          <div key={i} className="min-w-full">
            <img
              src={img}
              alt="Hyderabad Hardware Story"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* design accent */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-sm -z-10" />
    </div>
  );
};
