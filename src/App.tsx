import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import LiveCodeSection from '@/components/sections/LiveCode';
import FeaturesSection from '@/components/sections/Features';
import ProjectsSection from '@/components/sections/Projects';
import ManifestoSection from '@/components/sections/Manifesto';
import Footer from '@/components/layout/Footer';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

function App() {
  return (
    <main className="min-h-screen bg-smoke-white text-deep-charcoal">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <LiveCodeSection />
      <FeaturesSection />
      <ProjectsSection />
      <ManifestoSection />
      <Footer />
    </main>
  );
}

export default App;
