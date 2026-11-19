import { DiscoveryStory } from '../types/planet';

export const COSMIC_DISCOVERIES: DiscoveryStory[] = [
  {
    id: 'jwst-deep-field',
    category: 'Astrophysics Breakthrough',
    title: 'Piercing the Cosmic Dawn: JWST Unveils the First Galaxies',
    subtitle: 'Infrared observatories reveal massive galaxies that existed merely 300 million years after the Big Bang.',
    date: 'Current Mission Epoch',
    readTime: '4 min read',
    imageAlt: 'JWST Deep Field galaxy cluster with gravitational lensing arcs',
    summary: 'The James Webb Space Telescope has fundamentally challenged standard cosmological models by discovering fully formed, luminous galaxies glowing in the infant universe, existing when the cosmos was barely 3% of its current age.',
    body: [
      'Operating in the cryogenic shadow at Lagrange Point 2 (1.5 million kilometers from Earth), JWST’s gold-coated beryllium mirror detects infrared photons stretched across 13.5 billion light-years of expanding spacetime.',
      'Observations of galaxy candidates like JADES-GS-z14-0 demonstrate that stellar ignition, star-forming nurseries, and supermassive black hole seed creation occurred exponentially earlier and more vigorously than 20th-century astrophysics predicted.',
      'Simultaneously, Webb has performed transmission spectroscopy on temperate rocky exoplanets in the TRAPPIST-1 system, searching for carbon dioxide, water vapor, and potential biosignatures in secondary atmospheres.'
    ],
    keyStats: [
      { label: 'Distance from Earth', value: '1.5M km (L2)' },
      { label: 'Lookback Limit', value: '13.6B Years' },
      { label: 'Primary Mirror', value: '6.5 m Beryllium' },
      { label: 'Operating Temp', value: '-233°C (40 K)' }
    ],
    accentColor: '#fbbf24'
  },
  {
    id: 'enceladus-ocean-life',
    category: 'Planetary Phenomenon',
    title: 'The Hydrothermal Abyss of Enceladus',
    subtitle: 'Cryovolcanic plumes erupting through Saturnian ice contain phosphorus, hydrogen, and complex organics.',
    date: 'Cassini Science Archive',
    readTime: '5 min read',
    imageAlt: 'Ice geysers spraying from tiger stripe fissures on moon Enceladus',
    summary: 'Data collected when the Cassini spacecraft swooped directly through the tiger-stripe plumes of Saturn’s moon Enceladus confirmed a warm, alkaline saltwater ocean in direct contact with a porous rocky core.',
    body: [
      'Enceladus, despite being just 500 kilometers across, houses one of the solar system\'s premier candidates for extraterrestrial biology. Beneath a global ice shell measuring 5 to 35 kilometers thick lies a liquid ocean heated by tidal dissipation and radioactive decay.',
      'Cassini’s mass spectrometers identified methane, carbon dioxide, molecular hydrogen (H₂), and organic macromolecules within the geysers. In 2023, high concentrations of sodium phosphates—the rarest essential building block of DNA, RNA, and ATP—were definitively measured in its ring particles.',
      'The presence of hydrogen gas strongly implies hydrothermal serpentinization reactions identical to Earth\'s deep-sea hydrothermal vents (like Lost City), where primitive microbial life may have first originated without sunlight.'
    ],
    keyStats: [
      { label: 'Plume Speed', value: '2,180 km/h' },
      { label: 'Ocean Salinity', value: '0.9–2.0%' },
      { label: 'Ice Crust Thickness', value: '5–35 km' },
      { label: 'Phosphorus Abundance', value: '100x Earth Sea' }
    ],
    accentColor: '#38bdf8'
  },
  {
    id: 'voyager-interstellar',
    category: 'Deep Space Mission',
    title: 'Voyager: Humanity\'s Golden Ambassadors in the Interstellar Void',
    subtitle: 'Twin robotic sentinels have crossed the heliopause and entered pristine galactic space.',
    date: '1977 – Present',
    readTime: '6 min read',
    imageAlt: 'Voyager spacecraft journeying into the dark interstellar void with Golden Record',
    summary: 'Launched in 1977 to capitalize on a rare once-every-175-years planetary alignment, Voyager 1 and Voyager 2 have traveled farther from Earth than any manufactured artifacts in human history.',
    body: [
      'In August 2012, Voyager 1 registered an abrupt drop in solar wind particles accompanied by an exponential surge in high-energy galactic cosmic rays, crossing the Heliopause at 121 AU into the interstellar medium.',
      'Voyager 2 crossed the southern interstellar boundary in 2018, demonstrating that the heliosphere acts as a dynamic, squashed protective bubble shielding our planetary family from interstellar debris.',
      'Each spacecraft carries a gold-plated copper phonograph record encoded with 115 analog images, spoken greetings in 55 human languages, sounds of Earth wind, rain, and whale calls, and 90 minutes of music from Bach to Chuck Berry, destined to wander the Milky Way for billions of years.'
    ],
    keyStats: [
      { label: 'Current Distance', value: '24.4B km (163 AU)' },
      { label: 'Speed relative to Sun', value: '61,000 km/h' },
      { label: 'Power Source', value: 'Pu-238 RTG' },
      { label: 'One-Way Light Time', value: '22h 38m' }
    ],
    accentColor: '#f97316'
  },
  {
    id: 'mars-ingenuity-flight',
    category: 'Deep Space Mission',
    title: 'Wright Brothers on Another World: The Legacy of Ingenuity',
    subtitle: 'How a 1.8-kilogram technology demonstration redefined planetary aerial reconnaissance.',
    date: '2021 – 2024 Mission Record',
    readTime: '4 min read',
    imageAlt: 'Ingenuity helicopter hovering above the red Jezero Crater dunes on Mars',
    summary: 'Designed for just five test flights in an atmospheric density less than 1% of Earth\'s, the Ingenuity Mars Helicopter completed 72 flights across three years, proving aerodynamic aerial flight is possible on other worlds.',
    body: [
      'Generating aerodynamic lift on Mars requires spinning twin carbon-fiber rotors in opposite directions at 2,400 to 2,700 RPM—more than five times faster than a standard helicopter on Earth.',
      'Ingenuity scouted hazardous dunes, charted navigation paths for the Perseverance rover, and scouted ancient geological delta layers in Jezero crater that harbored water 3.5 billion years ago.',
      'The success of Ingenuity laid the operational blueprints for future multi-rotor dragonflies on Saturn\'s moon Titan and planned heavy Mars Science Helicopters able to carry comprehensive laboratories into inaccessible Martian canyons.'
    ],
    keyStats: [
      { label: 'Total Flights', value: '72 Flights' },
      { label: 'Total Flight Time', value: '128.8 minutes' },
      { label: 'Distance Flown', value: '17.0 km' },
      { label: 'Rotor Tip Speed', value: 'Mach 0.7' }
    ],
    accentColor: '#ef4444'
  },
  {
    id: 'jupiter-cyclonic-storms',
    category: 'Planetary Phenomenon',
    title: 'The Great Red Spot & Polar Geometric Vortices of Jupiter',
    subtitle: 'Titan anticyclonic storms reaching 300 km deep and self-organizing polar cyclone polygons.',
    date: 'Juno Mission Discoveries',
    readTime: '5 min read',
    imageAlt: 'Swirling Jovian cloud belts and giant anticyclone storms',
    summary: 'NASA\'s Juno spacecraft peered deep into Jupiter\'s cloud tops using microwave radiometers, proving that the Great Red Spot extends hundreds of kilometers below the cloud layer and is rooted far deeper than water clouds.',
    body: [
      'The Great Red Spot is an anticyclone with peripheral wind speeds exceeding 430 km/h. While telescopic records indicate it has shrunk in horizontal span over the last century, gravity measurements by Juno proved its roots plunge at least 300 to 500 kilometers down into the interior.',
      'At Jupiter\'s north and south poles, Juno revealed an astonishing surprise: permanent geometric polygonal formations of massive cyclones. At the north pole, eight cyclones surround a central storm in an octagonal lattice; at the south pole, five surround one in a pentagonal dance.',
      'These polygonal configurations have remained stable for years without merging, representing an exotic state of planetary fluid dynamics governed by Jovian beta-drift and atmospheric vortex crystals.'
    ],
    keyStats: [
      { label: 'Storm Width', value: '16,000 km' },
      { label: 'Perimeter Wind', value: '432–680 km/h' },
      { label: 'Storm Longevity', value: '350+ Years' },
      { label: 'Root Depth', value: '300–500 km' }
    ],
    accentColor: '#eab308'
  },
  {
    id: 'trappist-1-worlds',
    category: 'Exoplanet Discovery',
    title: 'TRAPPIST-1: Seven Earth-Sized Worlds Around an Ultracool Dwarf',
    subtitle: 'The largest collection of Earth-sized planets found in a single star system, three in the habitable zone.',
    date: 'Spitzer & Webb Campaign',
    readTime: '4 min read',
    imageAlt: 'Artist rendition of the seven rocky planets of TRAPPIST-1 system',
    summary: 'Located 40 light-years away in the constellation Aquarius, TRAPPIST-1 is an ultracool red dwarf host to seven terrestrial planets locked in resonant orbital chains, creating a natural laboratory for planetary habitability.',
    body: [
      'All seven planets (b through h) have radii within 10% of Earth’s and masses similar to our own. Because TRAPPIST-1 is only slightly larger than Jupiter, its planetary family orbits tightly: the entire seven-planet system would comfortably fit within the orbit of Mercury.',
      'Planets e, f, and g reside inside the star’s circumstellar habitable zone, where temperatures could allow liquid surface water under appropriate atmospheres.',
      'Because they orbit in precise resonant harmonic ratios (e.g. 24:15, 15:9, 9:6, 6:4, 4:3), mutual gravitational tugs produce measurable transit timing variations that allowed astronomers to calculate each world\'s density and core mass with unprecedented precision.'
    ],
    keyStats: [
      { label: 'System Distance', value: '39.46 Light Years' },
      { label: 'Habitable Zone Worlds', value: '3 Planets (e, f, g)' },
      { label: 'Host Star Type', value: 'M8V Red Dwarf' },
      { label: 'Orbital Resonance', value: 'Harmonic 24:15:9:6:4:3' }
    ],
    accentColor: '#a855f7'
  }
];

export const SPACE_MILESTONES = [
  { year: '1957', event: 'Sputnik 1', description: 'First artificial satellite orbited Earth, opening the space age.' },
  { year: '1961', event: 'Vostok 1', description: 'Yuri Gagarin becomes the first human in space and orbits the planet.' },
  { year: '1969', event: 'Apollo 11', description: 'Neil Armstrong and Buzz Aldrin set foot on the lunar surface at Sea of Tranquility.' },
  { year: '1977', event: 'Voyager 1 & 2', description: 'Twin missions launch on the historic Grand Tour of the outer solar system.' },
  { year: '1990', event: 'Hubble Telescope', description: 'Hubble deployed in low Earth orbit, revolutionizing observational astronomy.' },
  { year: '1998', event: 'ISS Assembly', description: 'First modules of the International Space Station joined in orbit.' },
  { year: '2004', event: 'Cassini at Saturn', description: 'Cassini begins 13-year exploration of Saturnian rings, Titan, and Enceladus.' },
  { year: '2012', event: 'Curiosity on Mars', description: 'Sky-crane touchdown of Curiosity in Gale Crater, confirming ancient habitability.' },
  { year: '2015', event: 'New Horizons & Pluto', description: 'First close encounter with Pluto and the Kuiper Belt, revealing heart-shaped glaciers.' },
  { year: '2021', event: 'JWST Launch', description: 'James Webb Space Telescope launches on Ariane 5, opening the infrared universe.' },
  { year: '2024+', event: 'Artemis & Clipper', description: 'Humanity prepares return to lunar south pole; Europa Clipper explores icy ocean world.' }
];
