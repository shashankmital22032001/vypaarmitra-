import { useRef } from 'react';
import About from '../components/sections/About';
import Faq from '../components/sections/Faq';
import FinalCta from '../components/sections/FinalCta';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import Packages from '../components/sections/Packages';
import Problem from '../components/sections/Problem';
import RegionMarquee from '../components/sections/RegionMarquee';
import WhatYouGet from '../components/sections/WhatYouGet';
import WhyUs from '../components/sections/WhyUs';
import { useReveal } from '../hooks/useReveal';

export default function Home() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <div ref={ref}>
      <Hero />
      <RegionMarquee />
      <Problem />
      <Packages />
      <HowItWorks />
      <WhatYouGet />
      <WhyUs />
      <About />
      <Faq />
      <FinalCta />
    </div>
  );
}
