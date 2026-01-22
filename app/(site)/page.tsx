'use client'

import Hero from "../Hero"
import WhatIsIEEECS from "../WhatIsIEEECS"
import About from "../About"
import Achievements from "../Achievements"
import Gallery from "../Gallery"
import TechX from "../TechX"
import Membership from "../Membership"
import FAQ from "../FAQ"

export default function Home() {
  return (
    <>
        <Hero/>
        <WhatIsIEEECS/>
        <About/>
        <Gallery/>
        <TechX/>
        <Achievements/>
        <Membership/>
        <FAQ/>
    </>    
  );
}
