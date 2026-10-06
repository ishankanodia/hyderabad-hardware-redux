import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { SolutionsPreview } from '@/components/home/SolutionsPreview';
import { FloorNavigator } from '@/components/home/FloorNavigator';
import { BrandsSection } from '@/components/home/BrandsSection';
import { ExperienceCentres } from '@/components/home/ExperienceCentres';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <SolutionsPreview />
      <FloorNavigator />
      <BrandsSection />
      <ExperienceCentres />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
