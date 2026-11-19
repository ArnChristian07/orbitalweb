import { PlanetData } from '../types/planet';

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    order: 1,
    romanNumeral: 'I',
    tagline: 'The Scorched Iron Messenger',
    type: 'Terrestrial Planet',
    diameterKm: 4879,
    diameterStr: '4,879 km',
    mass: '3.30 × 10²³ kg',
    distanceFromSunKm: 57900000,
    distanceFromSunAU: 0.387,
    distanceStr: '57.9M km (0.39 AU)',
    avgTempC: 167,
    avgTempStr: '167°C (-180°C to 430°C)',
    minTempC: -180,
    maxTempC: 430,
    dayLengthHours: 1407.6, // 58.6 Earth days
    dayLengthStr: '58.6 Earth days',
    yearLengthDays: 88,
    yearLengthStr: '88 Earth days',
    moonsCount: 0,
    gravityMss: 3.7,
    gravityVsEarth: 0.38,
    orbitalVelocityKmS: 47.36,
    axialTiltDeg: 0.034,
    colors: {
      primary: '#9ca3af',
      secondary: '#4b5563',
      glow: '#d1d5db',
      accent: '#e5e7eb',
    },
    overview: 'Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun\'s planets. Because it has almost no atmosphere to retain heat, it experiences the most extreme temperature swings in the Solar System.',
    scientificDescription: 'A dense rocky world dominated by a disproportionately large metallic core comprising roughly 85% of its planetary radius. The surface is heavily cratered and geologically dead, preserved under a vacuum-like exosphere.',
    interestingFacts: [
      'A year on Mercury is just 88 days, but a single solar day (noon to noon) lasts 176 Earth days.',
      'Despite being the closest planet to the Sun, water ice exists within permanently shadowed craters at its poles.',
      'Mercury has a massive iron core that generates a global magnetic field roughly 1% as strong as Earth’s.',
      'Mercury experiences extreme thermal shifts ranging from 430°C in direct sunlight to -180°C on the night side.'
    ],
    atmosphericComposition: [
      { gas: 'Oxygen (O₂)', percentage: 42, color: '#38bdf8' },
      { gas: 'Sodium (Na)', percentage: 29, color: '#f59e0b' },
      { gas: 'Hydrogen (H₂)', percentage: 22, color: '#a855f7' },
      { gas: 'Helium (He)', percentage: 6, color: '#10b981' },
      { gas: 'Trace Elements', percentage: 1, color: '#64748b' }
    ],
    surfaceCharacteristics: {
      geology: 'Heavily cratered silicate crust resembling Earth\'s Moon with extensive lobate scarps (cliffs) formed as the planet contracted upon cooling.',
      elevationRecord: 'Caloris Basin: 1,550 km wide impact crater',
      magneticField: 'Dipolar field ~1% of Earth\'s field strength',
      notableFeatures: ['Caloris Basin', 'Discovery Rupes', 'MESSENGER crater field', 'Beethoven Basin']
    },
    majorMoons: [],
    missions: [
      { name: 'Mariner 10', agency: 'NASA', year: '1974-1975', type: 'Flyby', achievement: 'First probe to visit Mercury, mapped 45% of surface' },
      { name: 'MESSENGER', agency: 'NASA', year: '2011-2015', type: 'Orbiter', achievement: 'Discovered water ice in polar craters and volatile elements' },
      { name: 'BepiColombo', agency: 'ESA / JAXA', year: '2026', type: 'Orbiter', achievement: 'Dual-orbiter mission conducting high-resolution magnetospheric mapping' }
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    order: 2,
    romanNumeral: 'II',
    tagline: 'The Runaway Greenhouse Inferno',
    type: 'Terrestrial Planet',
    diameterKm: 12104,
    diameterStr: '12,104 km',
    mass: '4.87 × 10²⁴ kg',
    distanceFromSunKm: 108200000,
    distanceFromSunAU: 0.723,
    distanceStr: '108.2M km (0.72 AU)',
    avgTempC: 464,
    avgTempStr: '464°C (Constant inferno)',
    minTempC: 438,
    maxTempC: 480,
    dayLengthHours: 5832.5, // 243 Earth days
    dayLengthStr: '243 Earth days (Retrograde)',
    yearLengthDays: 224.7,
    yearLengthStr: '224.7 Earth days',
    moonsCount: 0,
    gravityMss: 8.87,
    gravityVsEarth: 0.90,
    orbitalVelocityKmS: 35.02,
    axialTiltDeg: 177.3,
    colors: {
      primary: '#eab308',
      secondary: '#ca8a04',
      glow: '#fbbf24',
      accent: '#fef08a',
    },
    overview: 'Venus is the second planet from the Sun and Earth\'s closest planetary neighbor. Often called Earth’s "evil twin", it has similar size and mass, but possesses a crushing supercritical CO₂ atmosphere with clouds of sulfuric acid, making it the hottest planet in the Solar System.',
    scientificDescription: 'A terrestrial world locked in an irreversible runaway greenhouse state. Its surface pressure reaches 92 atmospheres (equivalent to 900 meters underwater on Earth), cloaked in high-albedo sulfuric acid cloud decks.',
    interestingFacts: [
      'Venus rotates backwards compared to most planets; on Venus, the Sun rises in the west and sets in the east.',
      'Surface atmospheric pressure is equivalent to 900 meters below Earth\'s ocean surface.',
      'Lead and zinc melt spontaneously on the open plains of Venus due to the 464°C ambient surface heat.',
      'Its upper cloud layer rotates around the planet once every 4 Earth days in a phenomenon called super-rotation.'
    ],
    atmosphericComposition: [
      { gas: 'Carbon Dioxide (CO₂)', percentage: 96.5, color: '#f59e0b' },
      { gas: 'Nitrogen (N₂)', percentage: 3.5, color: '#38bdf8' },
      { gas: 'Sulfur Dioxide (SO₂)', percentage: 0.015, color: '#eab308' },
      { gas: 'Water Vapor (H₂O)', percentage: 0.002, color: '#06b6d4' }
    ],
    surfaceCharacteristics: {
      geology: 'Volcanic plains covered with basaltic lava flows, extensive shield volcanoes, and unique arachnoid and corona fracture networks.',
      elevationRecord: 'Maxwell Montes: 11 km high mountain massif',
      magneticField: 'No intrinsic dynamo field; induced magnetosphere from solar wind',
      notableFeatures: ['Maxwell Montes', 'Aphrodite Terra', 'Ishtar Terra', 'Maat Mons Volcano']
    },
    majorMoons: [],
    missions: [
      { name: 'Venera 13', agency: 'Soviet Space Program', year: '1982', type: 'Lander', achievement: 'Surviving 127 minutes in 457°C heat, transmitted first color photos' },
      { name: 'Magellan', agency: 'NASA', year: '1989-1994', type: 'Orbiter', achievement: 'Synthetic aperture radar mapped 98% of Venusian topography' },
      { name: 'DAVINCI & VERITAS', agency: 'NASA', year: '2029-2031', type: 'Orbiter', achievement: 'Deep atmosphere descent probe and global high-res radar mapping' }
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    order: 3,
    romanNumeral: 'III',
    tagline: 'The Cradle of Living Consciousness',
    type: 'Terrestrial Planet',
    diameterKm: 12742,
    diameterStr: '12,742 km',
    mass: '5.97 × 10²⁴ kg',
    distanceFromSunKm: 149600000,
    distanceFromSunAU: 1.0,
    distanceStr: '149.6M km (1.00 AU)',
    avgTempC: 15,
    avgTempStr: '15°C (-88°C to 58°C)',
    minTempC: -89.2,
    maxTempC: 56.7,
    dayLengthHours: 24,
    dayLengthStr: '23h 56m 04s',
    yearLengthDays: 365.25,
    yearLengthStr: '365.25 Earth days',
    moonsCount: 1,
    gravityMss: 9.807,
    gravityVsEarth: 1.00,
    orbitalVelocityKmS: 29.78,
    axialTiltDeg: 23.44,
    colors: {
      primary: '#0284c7',
      secondary: '#0f766e',
      glow: '#38bdf8',
      accent: '#22c55e',
    },
    overview: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. With 71% of its surface covered by liquid water oceans and a nitrogen-oxygen atmosphere shielded by a powerful geodynamo magnetosphere, it is the astronomical benchmark of habitability.',
    scientificDescription: 'A dynamic rocky planet featuring plate tectonics, liquid water oceans, an active hydrological cycle, and a biosphere that has profoundly altered atmospheric oxygen levels over billions of years.',
    interestingFacts: [
      'The only known planet in the universe with active plate tectonics that recycle carbon and regulate climate.',
      'Earth’s magnetic field shields our atmosphere from cosmic radiation and the harsh solar wind.',
      'Our Moon is unusually large relative to Earth (1/4 Earth diameter), stabilizing our axial tilt for climate consistency.',
      'More than 99% of all species that ever lived on Earth are estimated to be extinct.'
    ],
    atmosphericComposition: [
      { gas: 'Nitrogen (N₂)', percentage: 78.08, color: '#38bdf8' },
      { gas: 'Oxygen (O₂)', percentage: 20.95, color: '#10b981' },
      { gas: 'Argon (Ar)', percentage: 0.93, color: '#a855f7' },
      { gas: 'Carbon Dioxide (CO₂)', percentage: 0.04, color: '#f59e0b' }
    ],
    surfaceCharacteristics: {
      geology: 'Continental granite masses floating on oceanic basaltic crust, driven by mantle convection and subduction zones.',
      elevationRecord: 'Mount Everest: 8,848 m / Mariana Trench: -10,994 m',
      magneticField: 'Strong liquid-iron outer core geodynamo (30-60 µT)',
      notableFeatures: ['Global Ocean Basins', 'Mid-Atlantic Ridge', 'Himalayan Orogeny', 'Amazon Basin']
    },
    majorMoons: [
      {
        name: 'The Moon (Luna)',
        diameterKm: 3474,
        description: 'Fifth largest moon in the Solar System, created by a proto-planetary collision 4.5 billion years ago.',
        discoveryYear: 0,
        highlight: 'Only extraterrestrial body visited by human astronauts (Apollo 11-17).'
      }
    ],
    missions: [
      { name: 'Apollo 11', agency: 'NASA', year: '1969', type: 'Sample Return', achievement: 'First human landing on another celestial body' },
      { name: 'Terra & Aqua', agency: 'NASA / International', year: '1999-Present', type: 'Orbiter', achievement: 'Continuous Earth observation of biosphere and climate indicators' },
      { name: 'ISS (Space Station)', agency: 'International', year: '1998-Present', type: 'Orbiter', achievement: 'Continuous human presence in low Earth orbit for 25+ years' }
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    order: 4,
    romanNumeral: 'IV',
    tagline: 'The Rust-Stained Frontier of Humanity',
    type: 'Terrestrial Planet',
    diameterKm: 6779,
    diameterStr: '6,779 km',
    mass: '6.42 × 10²³ kg',
    distanceFromSunKm: 227900000,
    distanceFromSunAU: 1.524,
    distanceStr: '227.9M km (1.52 AU)',
    avgTempC: -63,
    avgTempStr: '-63°C (-140°C to 20°C)',
    minTempC: -140,
    maxTempC: 20,
    dayLengthHours: 24.6,
    dayLengthStr: '24h 37m (1 Sol)',
    yearLengthDays: 687,
    yearLengthStr: '687 Earth days',
    moonsCount: 2,
    gravityMss: 3.721,
    gravityVsEarth: 0.38,
    orbitalVelocityKmS: 24.07,
    axialTiltDeg: 25.19,
    colors: {
      primary: '#ef4444',
      secondary: '#991b1b',
      glow: '#f87171',
      accent: '#fb923c',
    },
    overview: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Known as the Red Planet due to ubiquitous iron oxide on its surface, Mars hosts the Solar System\'s tallest volcano and longest canyon system, preserving tantalizing geological evidence of ancient liquid rivers and lakes.',
    scientificDescription: 'A desiccated cold desert world with a tenuous carbon dioxide atmosphere. Fossilized river deltas, clay minerals, and sub-surface water ice demonstrate that early Mars possessed a thick atmosphere and standing water billions of years ago.',
    interestingFacts: [
      'Olympus Mons is the largest volcano in the Solar System, three times taller than Mount Everest and roughly the size of France.',
      'Valles Marineris is a rift canyon four times deeper and ten times longer than Earth’s Grand Canyon.',
      'Mars experiences massive global dust storms that can envelope the entire planet for months at a time.',
      'A Martian day (Sol) is only 37 minutes longer than a standard Earth day.'
    ],
    atmosphericComposition: [
      { gas: 'Carbon Dioxide (CO₂)', percentage: 95.3, color: '#f59e0b' },
      { gas: 'Nitrogen (N₂)', percentage: 2.6, color: '#38bdf8' },
      { gas: 'Argon (Ar)', percentage: 1.9, color: '#a855f7' },
      { gas: 'Oxygen (O₂)', percentage: 0.16, color: '#10b981' }
    ],
    surfaceCharacteristics: {
      geology: 'Iron-rich basalt regolith, ancient impact craters, vast volcanic shields in the Tharsis rise, and dry braided river channels.',
      elevationRecord: 'Olympus Mons: 21.9 km elevation above datum',
      magneticField: 'No global dynamo; remnant crustal magnetic fields',
      notableFeatures: ['Olympus Mons', 'Valles Marineris', 'Jezero Crater Delta', 'Gale Crater']
    },
    majorMoons: [
      {
        name: 'Phobos',
        diameterKm: 22.2,
        description: 'Heavily grooved, irregular captured asteroid orbiting just 6,000 km from the Martian surface.',
        discoveryYear: 1877,
        highlight: 'Spiraling inward; will crash or disintegrate into a ring in ~50 million years.'
      },
      {
        name: 'Deimos',
        diameterKm: 12.4,
        description: 'Smooth-surfaced outer moon with escape velocity of just 5.6 m/s.',
        discoveryYear: 1877,
        highlight: 'Takes 30 hours to orbit Mars; appears like a bright star in Martian skies.'
      }
    ],
    missions: [
      { name: 'Perseverance & Ingenuity', agency: 'NASA', year: '2021-Present', type: 'Rover', achievement: 'First powered flight on another planet; caching biosignature samples' },
      { name: 'Curiosity', agency: 'NASA', year: '2012-Present', type: 'Rover', achievement: 'Proved ancient Gale Crater was a habitable freshwater lake' },
      { name: 'Tianwen-1 & Zhurong', agency: 'CNSA', year: '2021', type: 'Rover', achievement: 'China\'s first Mars mission: deployed orbiter, lander, and rover' }
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    order: 5,
    romanNumeral: 'V',
    tagline: 'The Monarch of the Solar System',
    type: 'Gas Giant',
    diameterKm: 139820,
    diameterStr: '139,820 km',
    mass: '1.90 × 10²⁷ kg (318 Earth masses)',
    distanceFromSunKm: 778500000,
    distanceFromSunAU: 5.204,
    distanceStr: '778.5M km (5.20 AU)',
    avgTempC: -110,
    avgTempStr: '-110°C (At 1 bar level)',
    minTempC: -160,
    maxTempC: -80,
    dayLengthHours: 9.93,
    dayLengthStr: '9h 56m (Fastest rotation)',
    yearLengthDays: 4333,
    yearLengthStr: '11.86 Earth years',
    moonsCount: 95,
    gravityMss: 24.79,
    gravityVsEarth: 2.53,
    orbitalVelocityKmS: 13.07,
    axialTiltDeg: 3.13,
    colors: {
      primary: '#d97706',
      secondary: '#78350f',
      glow: '#fbbf24',
      accent: '#fde68a',
    },
    overview: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined. Its iconic Great Red Spot is a titanic anticyclonic storm larger than Earth that has raged for centuries.',
    scientificDescription: 'A colossal sphere of hydrogen and helium lacking a solid surface. Deep within, unimaginable pressures compress hydrogen into an exotic liquid metallic state, driving the most powerful magnetic field of any planet.',
    interestingFacts: [
      'Jupiter’s Great Red Spot is a storm large enough to swallow the entire planet Earth whole.',
      'Jupiter acts as a cosmic gravitational vacuum cleaner, deflecting comets and asteroids away from the inner planets.',
      'It has the fastest rotation of any planet, spinning on its axis once every 9 hours and 56 minutes.',
      'Liquid metallic hydrogen deep inside creates a magnetosphere so immense it extends past the orbit of Saturn.'
    ],
    atmosphericComposition: [
      { gas: 'Hydrogen (H₂)', percentage: 89.8, color: '#38bdf8' },
      { gas: 'Helium (He)', percentage: 10.2, color: '#10b981' },
      { gas: 'Methane (CH₄)', percentage: 0.3, color: '#a855f7' },
      { gas: 'Ammonia (NH₃)', percentage: 0.026, color: '#f59e0b' }
    ],
    surfaceCharacteristics: {
      geology: 'No defined solid surface; transition from gaseous envelope to supercritical fluid to liquid metallic hydrogen over a dense rock/ice core.',
      elevationRecord: 'Great Red Spot storm depth: over 300 km deep',
      magneticField: 'Gigantic magnetosphere 20,000 times stronger than Earth\'s',
      notableFeatures: ['Great Red Spot', 'Zonal Cloud Belts & Zones', 'South Pole Cyclonic Clusters', 'Faint Ring System']
    },
    majorMoons: [
      {
        name: 'Ganymede',
        diameterKm: 5268,
        description: 'The largest moon in the Solar System (larger than Mercury); possesses its own magnetic field and deep ocean.',
        discoveryYear: 1610,
        highlight: 'Larger than Mercury; hosts a saltwater ocean beneath its crust with more water than all Earth oceans combined.'
      },
      {
        name: 'Europa',
        diameterKm: 3122,
        description: 'Smooth, fractured ice shell covering a 100-km-deep liquid ocean kept warm by tidal flexing.',
        discoveryYear: 1610,
        highlight: 'Primary candidate in search for extraterrestrial life in our Solar System.'
      },
      {
        name: 'Io',
        diameterKm: 3643,
        description: 'Most volcanically active body in the Solar System with over 400 active silicate volcanoes.',
        discoveryYear: 1610,
        highlight: 'Surface constantly resurfaced by sulfur and lava fountains reaching 500 km high.'
      },
      {
        name: 'Callisto',
        diameterKm: 4821,
        description: 'Ancient, heavily cratered ice-rock world with potentially buried subsurface ocean.',
        discoveryYear: 1610,
        highlight: 'Most heavily cratered object in the Solar System.'
      }
    ],
    missions: [
      { name: 'Juno', agency: 'NASA', year: '2016-Present', type: 'Orbiter', achievement: 'Revealed deep atmospheric roots, polar cyclones, and dilute core structure' },
      { name: 'Galileo', agency: 'NASA', year: '1995-2003', type: 'Orbiter', achievement: 'First spacecraft to orbit Jupiter; dropped atmospheric descent probe' },
      { name: 'JUICE & Europa Clipper', agency: 'ESA / NASA', year: '2023-2030', type: 'Orbiter', achievement: 'Dedicated radar and geochemical reconnaissance of icy moons' }
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    order: 6,
    romanNumeral: 'VI',
    tagline: 'The Jewel of the Solar System',
    type: 'Gas Giant',
    diameterKm: 116460,
    diameterStr: '116,460 km',
    mass: '5.68 × 10²⁶ kg (95 Earth masses)',
    distanceFromSunKm: 1434000000,
    distanceFromSunAU: 9.582,
    distanceStr: '1.43B km (9.58 AU)',
    avgTempC: -140,
    avgTempStr: '-140°C',
    minTempC: -185,
    maxTempC: -122,
    dayLengthHours: 10.7,
    dayLengthStr: '10h 42m',
    yearLengthDays: 10759,
    yearLengthStr: '29.45 Earth years',
    moonsCount: 146,
    gravityMss: 10.44,
    gravityVsEarth: 1.06,
    orbitalVelocityKmS: 9.68,
    axialTiltDeg: 26.73,
    colors: {
      primary: '#fde047',
      secondary: '#d97706',
      glow: '#fef08a',
      ringColor: '#fed7aa',
      accent: '#facc15',
    },
    overview: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System. Renowned for its breathtaking and complex ring system composed of billions of water-ice fragments, Saturn is also the least dense planet—so light it would float if placed in a sufficiently vast ocean.',
    scientificDescription: 'A gas giant rich in hydrogen and helium with muted atmospheric banding caused by high-altitude photochemical ammonia haze. Its rings span over 280,000 km across, yet measure as little as 10 meters in thickness.',
    interestingFacts: [
      'Saturn has an average density lower than liquid water (0.687 g/cm³); it would float in a giant bathtub.',
      'Its iconic rings span up to 282,000 km wide, but are only between 10 meters and 1 kilometer thick.',
      'A persistent geometric hexagonal jet stream storm swirls at Saturn’s north pole, spanning 30,000 km across.',
      'Saturn leads the Solar System in known moons, with 146 confirmed natural satellites.'
    ],
    atmosphericComposition: [
      { gas: 'Hydrogen (H₂)', percentage: 96.3, color: '#38bdf8' },
      { gas: 'Helium (He)', percentage: 3.25, color: '#10b981' },
      { gas: 'Methane (CH₄)', percentage: 0.45, color: '#a855f7' },
      { gas: 'Ammonia (NH₃)', percentage: 0.01, color: '#f59e0b' }
    ],
    surfaceCharacteristics: {
      geology: 'Gradual transition from upper atmosphere to metallic liquid mantle and rocky-icy core ~9–22 times Earth’s mass.',
      elevationRecord: 'North Polar Hexagon: 30,000 km wide atmospheric jet stream',
      magneticField: 'Nearly perfectly axisymmetric dipole field aligned with rotation axis',
      notableFeatures: ['A, B, C Ring System', 'Cassini Division', 'North Polar Hexagon', 'Great White Spot storms']
    },
    majorMoons: [
      {
        name: 'Titan',
        diameterKm: 5149,
        description: 'Second largest moon in the Solar System; possesses a dense nitrogen atmosphere and liquid methane/ethane lakes.',
        discoveryYear: 1655,
        highlight: 'The only celestial body besides Earth with liquid lakes and river channels on its surface.'
      },
      {
        name: 'Enceladus',
        diameterKm: 504,
        description: 'Brilliant white ice moon erupting cryovolcanic plumes of saltwater and organic molecules into space.',
        discoveryYear: 1789,
        highlight: 'Geysers feed Saturn\'s E ring and originate from a global subsurface hydrothermal ocean.'
      },
      {
        name: 'Mimas',
        diameterKm: 396,
        description: 'Heavily cratered moon with a massive 130 km crater (Herschel) giving it the look of the "Death Star".',
        discoveryYear: 1789,
        highlight: 'Herschel crater impact came close to shattering the moon entirely.'
      },
      {
        name: 'Iapetus',
        diameterKm: 1470,
        description: 'Two-toned world with one pitch-black hemisphere and one snow-white hemisphere, ringed by a 20-km ridge.',
        discoveryYear: 1671,
        highlight: 'Equatorial mountain ridge forms an unnatural-looking 20 km tall ring along its equator.'
      }
    ],
    missions: [
      { name: 'Cassini-Huygens', agency: 'NASA / ESA / ASI', year: '2004-2017', type: 'Orbiter', achievement: '13-year tour of Saturn system; landed Huygens probe on Titan and discovered Enceladus ocean geysers' },
      { name: 'Voyager 1 & 2', agency: 'NASA', year: '1980-1981', type: 'Flyby', achievement: 'Detailed imagery of ring structure, atmosphere, and Titan\'s opaque haze' },
      { name: 'Dragonfly', agency: 'NASA', year: '2028 (Scheduled)', type: 'Rover', achievement: 'Nuclear-powered rotorcraft lander that will fly between research sites on Titan' }
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    order: 7,
    romanNumeral: 'VII',
    tagline: 'The Tilted Cyan Enigma',
    type: 'Ice Giant',
    diameterKm: 50724,
    diameterStr: '50,724 km',
    mass: '8.68 × 10²⁵ kg (14.5 Earth masses)',
    distanceFromSunKm: 2871000000,
    distanceFromSunAU: 19.19,
    distanceStr: '2.87B km (19.19 AU)',
    avgTempC: -195,
    avgTempStr: '-195°C (Lowest: -224°C)',
    minTempC: -224,
    maxTempC: -197,
    dayLengthHours: 17.2,
    dayLengthStr: '17h 14m (Retrograde)',
    yearLengthDays: 30687,
    yearLengthStr: '84 Earth years',
    moonsCount: 28,
    gravityMss: 8.87,
    gravityVsEarth: 0.89,
    orbitalVelocityKmS: 6.80,
    axialTiltDeg: 97.77,
    colors: {
      primary: '#38bdf8',
      secondary: '#0284c7',
      glow: '#7dd3fc',
      ringColor: '#94a3b8',
      accent: '#67e8f9',
    },
    overview: 'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is unique among all planets because it rotates on its side with an axial tilt of 98 degrees, rolling like a ball along its orbital plane around the Sun.',
    scientificDescription: 'An ice giant composed predominantly of supercritical water, ammonia, and methane "ices" overlying a rocky core. Atmospheric methane absorbs red light, giving the planet its serene aquamarine hue.',
    interestingFacts: [
      'Uranus has an extreme axial tilt of 97.77°, meaning each pole experiences 42 continuous years of sunlight followed by 42 years of night.',
      'It holds the record for the coldest recorded planetary temperature in the Solar System at -224°C (-371°F).',
      'Uranus possesses 13 faint, narrow rings composed of dark boulders and dust.',
      'Unlike other gas and ice giants, Uranus radiates remarkably little internal heat into space.'
    ],
    atmosphericComposition: [
      { gas: 'Hydrogen (H₂)', percentage: 82.5, color: '#38bdf8' },
      { gas: 'Helium (He)', percentage: 15.2, color: '#10b981' },
      { gas: 'Methane (CH₄)', percentage: 2.3, color: '#06b6d4' },
      { gas: 'Hydrogen Deuteride (HD)', percentage: 0.009, color: '#a855f7' }
    ],
    surfaceCharacteristics: {
      geology: 'Fluid mantle of hot, dense "icy" volatiles (H₂O, NH₃, CH₄) over a small rocky core; diamond precipitation may occur at depth.',
      elevationRecord: 'Miranda\'s Verona Rupes: 20 km vertical cliff (highest in Solar System)',
      magneticField: 'Highly tilted magnetic dipole offset by 59° from rotational axis',
      notableFeatures: ['13 Dark Ring Arcs', 'Verona Rupes on moon Miranda', 'Polar Light Collar', 'Solitary Bright Cloud Storms']
    },
    majorMoons: [
      {
        name: 'Miranda',
        diameterKm: 472,
        description: 'Jigsaw-puzzle moon marked by giant canyon faults and Verona Rupes, a 20 km sheer cliff.',
        discoveryYear: 1948,
        highlight: 'Verona Rupes is a 20-km vertical drop: a falling human would take 12 minutes to hit bottom.'
      },
      {
        name: 'Titania',
        diameterKm: 1578,
        description: 'Largest moon of Uranus; scarred by colossal grabens and fault valleys thousands of kilometers long.',
        discoveryYear: 1787,
        highlight: 'Messina Chasma fault canyon stretches 1,500 km across its southern hemisphere.'
      },
      {
        name: 'Oberon',
        diameterKm: 1523,
        description: 'Oldest, outermost, and most heavily cratered of the major Uranian moons.',
        discoveryYear: 1787,
        highlight: 'Hamlet crater impact basin features a mysterious dark floor of volcanic carbonaceous material.'
      }
    ],
    missions: [
      { name: 'Voyager 2', agency: 'NASA', year: '1986', type: 'Flyby', achievement: 'First and only spacecraft to visit Uranus, discovering 10 new moons and 2 new rings' },
      { name: 'Uranus Orbiter and Probe (Proposed)', agency: 'NASA Flagship', year: '2030s', type: 'Orbiter', achievement: 'Recommended #1 top priority in Planetary Science Decadal Survey' }
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    order: 8,
    romanNumeral: 'VIII',
    tagline: 'The Supersonic Storm World',
    type: 'Ice Giant',
    diameterKm: 49244,
    diameterStr: '49,244 km',
    mass: '1.02 × 10²⁶ kg (17 Earth masses)',
    distanceFromSunKm: 4495000000,
    distanceFromSunAU: 30.07,
    distanceStr: '4.50B km (30.07 AU)',
    avgTempC: -201,
    avgTempStr: '-201°C',
    minTempC: -218,
    maxTempC: -198,
    dayLengthHours: 16.1,
    dayLengthStr: '16h 06m',
    yearLengthDays: 60190,
    yearLengthStr: '164.8 Earth years',
    moonsCount: 16,
    gravityMss: 11.15,
    gravityVsEarth: 1.14,
    orbitalVelocityKmS: 5.43,
    axialTiltDeg: 28.32,
    colors: {
      primary: '#1d4ed8',
      secondary: '#1e3a8a',
      glow: '#3b82f6',
      accent: '#60a5fa',
    },
    overview: 'Neptune is the eighth and farthest known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter and the third-most-massive. Known for its vivid cobalt-blue coloration, Neptune is a world of extreme meteorology, whipping up the fastest planetary winds in the Solar System at over 2,100 km/h.',
    scientificDescription: 'An ice giant driven by powerful internal heat, radiating 2.6 times more energy than it receives from the dim distant Sun. High-speed jet streams power dynamic storm vortices, including the legendary Great Dark Spot.',
    interestingFacts: [
      'Neptune has the fastest planetary winds in the Solar System, exceeding 2,100 km/h (1,300 mph) — supersonic speeds.',
      'Neptune was the first planet located via mathematical prediction rather than empirical telescope discovery (by Le Verrier in 1846).',
      'Since its discovery in 1846, Neptune has completed only ONE single full orbit around the Sun, finishing in 2011.',
      'Its largest moon, Triton, orbits in the opposite direction of Neptune\'s rotation (retrograde), proving it was a captured Kuiper Belt object.'
    ],
    atmosphericComposition: [
      { gas: 'Hydrogen (H₂)', percentage: 80.0, color: '#38bdf8' },
      { gas: 'Helium (He)', percentage: 19.0, color: '#10b981' },
      { gas: 'Methane (CH₄)', percentage: 1.5, color: '#2563eb' },
      { gas: 'Hydrogen Deuteride', percentage: 0.019, color: '#a855f7' }
    ],
    surfaceCharacteristics: {
      geology: 'Supercritical slush layer of water, ammonia, and methane over a rocky Earth-sized core under 7 million atmospheres of pressure.',
      elevationRecord: 'Great Dark Spot storm system: 13,000 km across',
      magneticField: 'Highly tilted (47°) and offset magnetic dipole generating complex magnetosphere',
      notableFeatures: ['Great Dark Spot', 'High-altitude Cirrus Methane Clouds', 'Adams Ring Arcs', 'Scooter High-Speed Storm']
    },
    majorMoons: [
      {
        name: 'Triton',
        diameterKm: 2707,
        description: 'Captured Kuiper Belt dwarf planet with active liquid nitrogen cryogeysers erupting 8 km into space.',
        discoveryYear: 1846,
        highlight: 'One of the few geologically active moons in the Solar System, with cantaloupe terrain and retrograde orbit.'
      },
      {
        name: 'Proteus',
        diameterKm: 420,
        description: 'Dark, non-spherical moon pushed to the limit of how massive an irregular rocky body can be.',
        discoveryYear: 1989,
        highlight: 'Covered with huge impact crater Pharos, roughly half the moon\'s own diameter.'
      },
      {
        name: 'Nereid',
        diameterKm: 340,
        description: 'Possesses one of the most eccentric orbits of any moon in the Solar System.',
        discoveryYear: 1949,
        highlight: 'Distance from Neptune varies between 1.4 million km and 9.6 million km.'
      }
    ],
    missions: [
      { name: 'Voyager 2', agency: 'NASA', year: '1989', type: 'Flyby', achievement: 'Passed 4,950 km above Neptune\'s north pole, discovering the Great Dark Spot, ring arcs, and Triton\'s geysers' },
      { name: 'Hubble Space Telescope', agency: 'NASA / ESA', year: '1990-Present', type: 'Orbiter', achievement: 'Tracks seasonal changes and disappearance of major storm systems' },
      { name: 'James Webb Space Telescope', agency: 'NASA / ESA / CSA', year: '2022-Present', type: 'Orbiter', achievement: 'Captured crispest view of Neptune’s delicate dust rings in over 30 years' }
    ]
  }
];
