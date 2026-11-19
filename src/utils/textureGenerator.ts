import * as THREE from 'three';
import { PlanetId } from '../types/planet';

// Cache generated textures to avoid regenerating on every render
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Creates a pseudo-random perlin/simplex-like noise pattern on an HTML5 canvas
 */
function createNoiseLayer(ctx: CanvasRenderingContext2D, width: number, height: number, opacity: number, scale = 1) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const val = (Math.random() - 0.5) * 50 * scale;
    data[i] = Math.min(255, Math.max(0, data[i] + val * opacity));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + val * opacity));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + val * opacity));
  }
  ctx.putImageData(imgData, 0, 0);
}

/**
 * Generates procedural textures for each planet
 */
export function getPlanetTexture(planetId: PlanetId): THREE.CanvasTexture {
  if (textureCache.has(planetId)) {
    return textureCache.get(planetId)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const w = canvas.width;
  const h = canvas.height;

  switch (planetId) {
    case 'mercury': {
      // Base grey cratered texture
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#52525b');
      grad.addColorStop(0.5, '#71717a');
      grad.addColorStop(1, '#3f3f46');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Noise
      createNoiseLayer(ctx, w, h, 0.4, 2);

      // Procedural craters
      for (let i = 0; i < 300; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const r = 2 + Math.random() * 20;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(39, 39, 42, 0.6)' : 'rgba(212, 212, 216, 0.4)';
        ctx.fill();

        // Rim
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
      }
      break;
    }

    case 'venus': {
      // Thick yellow-amber sulfuric clouds with turbulent banding
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#78350f');
      grad.addColorStop(0.2, '#b45309');
      grad.addColorStop(0.4, '#d97706');
      grad.addColorStop(0.6, '#f59e0b');
      grad.addColorStop(0.8, '#d97706');
      grad.addColorStop(1, '#92400e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Swirling wave bands
      for (let y = 0; y < h; y += 4) {
        ctx.fillStyle = `rgba(254, 240, 138, ${0.05 + 0.1 * Math.sin(y * 0.05)})`;
        ctx.fillRect(0, y, w, 3);
      }

      // Smooth diagonal wind streaks
      ctx.save();
      ctx.rotate(-0.08);
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = 'rgba(217, 119, 6, 0.15)';
        ctx.fillRect(-100, (i * h) / 30, w * 1.5, 8 + Math.random() * 12);
      }
      ctx.restore();
      break;
    }

    case 'earth': {
      // Deep blue ocean
      ctx.fillStyle = '#0c4a6e';
      ctx.fillRect(0, 0, w, h);

      // Subtle ocean bathymetry
      const oceanGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w / 2);
      oceanGrad.addColorStop(0, '#0369a1');
      oceanGrad.addColorStop(1, '#082f49');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, w, h);

      // Continents (Africa, Eurasia, Americas, Australia, Antarctica)
      ctx.fillStyle = '#15803d'; // Green/vegetation
      
      // North America / South America
      ctx.beginPath();
      ctx.ellipse(w * 0.22, h * 0.35, 60, 45, -0.2, 0, Math.PI * 2);
      ctx.ellipse(w * 0.28, h * 0.65, 45, 75, 0.2, 0, Math.PI * 2);
      // Eurasia / Africa
      ctx.ellipse(w * 0.55, h * 0.32, 95, 55, 0.1, 0, Math.PI * 2);
      ctx.ellipse(w * 0.52, h * 0.58, 55, 65, 0.1, 0, Math.PI * 2);
      // Australia
      ctx.ellipse(w * 0.82, h * 0.68, 40, 30, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Deserts and mountain ridges (brown/tan)
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(w * 0.52, h * 0.46, 45, 18, 0, 0, Math.PI * 2); // Sahara
      ctx.ellipse(w * 0.60, h * 0.34, 40, 15, 0.1, 0, Math.PI * 2); // Gobi / Middle East
      ctx.fill();

      // Polar Ice Caps (pure white)
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, h * 0.1);
      ctx.fillRect(0, h * 0.9, w, h * 0.1);

      // Swirling atmospheric white clouds
      for (let i = 0; i < 70; i++) {
        const cx = Math.random() * w;
        const cy = h * 0.15 + Math.random() * (h * 0.7);
        const rx = 30 + Math.random() * 80;
        const ry = 6 + Math.random() * 20;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'mars': {
      // Rusty red base with varying iron-oxide gradients
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#7f1d1d');
      grad.addColorStop(0.25, '#991b1b');
      grad.addColorStop(0.5, '#b91c1c');
      grad.addColorStop(0.75, '#c2410c');
      grad.addColorStop(1, '#7c2d12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Dark basaltic volcanic plateaus (Syrtis Major, Acidalia Planitia)
      ctx.fillStyle = 'rgba(69, 10, 10, 0.45)';
      ctx.beginPath();
      ctx.ellipse(w * 0.45, h * 0.5, 120, 60, -0.3, 0, Math.PI * 2);
      ctx.ellipse(w * 0.75, h * 0.4, 90, 45, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Valles Marineris canyon chasm
      ctx.strokeStyle = '#450a0a';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(w * 0.2, h * 0.55);
      ctx.bezierCurveTo(w * 0.3, h * 0.58, w * 0.4, h * 0.52, w * 0.55, h * 0.56);
      ctx.stroke();

      // Olympus Mons caldera ring
      ctx.fillStyle = 'rgba(254, 215, 170, 0.25)';
      ctx.beginPath();
      ctx.arc(w * 0.15, h * 0.42, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#7f1d1d';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Polar dry ice caps (CO2 frost)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.ellipse(w / 2, 10, w * 0.25, 20, 0, 0, Math.PI * 2);
      ctx.ellipse(w / 2, h - 10, w * 0.2, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      createNoiseLayer(ctx, w, h, 0.35, 1.5);
      break;
    }

    case 'jupiter': {
      // Atmospheric Jovian bands
      const bands = [
        '#78350f', '#92400e', '#b45309', '#d97706', '#fef3c7', 
        '#f59e0b', '#d97706', '#92400e', '#78350f', '#fde68a',
        '#d97706', '#b45309', '#78350f'
      ];
      const bandHeight = h / bands.length;
      for (let i = 0; i < bands.length; i++) {
        ctx.fillStyle = bands[i];
        ctx.fillRect(0, i * bandHeight, w, bandHeight + 1);
      }

      // Turbulent undulating wave shear between belts
      for (let y = 0; y < h; y += 6) {
        ctx.fillStyle = `rgba(254, 243, 199, ${0.08 * Math.sin(y * 0.1)})`;
        ctx.fillRect(0, y, w, 4);
      }

      // Great Red Spot (anticyclone) in southern hemisphere
      const spotX = w * 0.65;
      const spotY = h * 0.64;
      const spotGrad = ctx.createRadialGradient(spotX, spotY, 5, spotX, spotY, 55);
      spotGrad.addColorStop(0, '#991b1b');
      spotGrad.addColorStop(0.5, '#dc2626');
      spotGrad.addColorStop(0.8, '#ea580c');
      spotGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');

      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.ellipse(spotX, spotY, 65, 38, -0.05, 0, Math.PI * 2);
      ctx.fill();

      // White oval storms (pearls)
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.ellipse(w * (0.2 + i * 0.12), h * 0.73, 12, 7, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case 'saturn': {
      // Elegant golden-amber-cream smooth banding
      const saturnBands = [
        '#a16207', '#ca8a04', '#eab308', '#facc15', '#fef08a',
        '#fde047', '#eab308', '#ca8a04', '#a16207', '#854d0e'
      ];
      const bH = h / saturnBands.length;
      for (let i = 0; i < saturnBands.length; i++) {
        ctx.fillStyle = saturnBands[i];
        ctx.fillRect(0, i * bH, w, bH + 2);
      }

      // Very subtle photochemical haze
      const hazeGrad = ctx.createLinearGradient(0, 0, 0, h);
      hazeGrad.addColorStop(0, 'rgba(113, 63, 18, 0.4)');
      hazeGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.15)');
      hazeGrad.addColorStop(1, 'rgba(113, 63, 18, 0.4)');
      ctx.fillStyle = hazeGrad;
      ctx.fillRect(0, 0, w, h);

      // North pole hexagonal polar storm (deep gold/olive)
      ctx.fillStyle = 'rgba(101, 163, 13, 0.35)';
      ctx.fillRect(0, 0, w, h * 0.08);
      break;
    }

    case 'uranus': {
      // Smooth cyan-aquamarine atmosphere
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#0369a1');
      grad.addColorStop(0.2, '#0284c7');
      grad.addColorStop(0.5, '#38bdf8');
      grad.addColorStop(0.8, '#0284c7');
      grad.addColorStop(1, '#075985');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Polar brightening hood
      ctx.fillStyle = 'rgba(224, 242, 254, 0.2)';
      ctx.fillRect(0, 0, w, h * 0.15);

      // Extremely faint high-altitude methane cloud streaks
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.fillRect(0, (i * h) / 20, w, 4);
      }
      break;
    }

    case 'neptune': {
      // Deep cobalt and azure blue
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#1e3a8a');
      grad.addColorStop(0.25, '#1d4ed8');
      grad.addColorStop(0.5, '#2563eb');
      grad.addColorStop(0.75, '#1d4ed8');
      grad.addColorStop(1, '#172554');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Great Dark Spot storm
      const darkSpotX = w * 0.4;
      const darkSpotY = h * 0.42;
      const dsGrad = ctx.createRadialGradient(darkSpotX, darkSpotY, 5, darkSpotX, darkSpotY, 45);
      dsGrad.addColorStop(0, '#0f172a');
      dsGrad.addColorStop(0.7, '#1e3a8a');
      dsGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = dsGrad;
      ctx.beginPath();
      ctx.ellipse(darkSpotX, darkSpotY, 50, 30, -0.1, 0, Math.PI * 2);
      ctx.fill();

      // Companion bright methane cirrus clouds ("Scooter")
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.beginPath();
      ctx.ellipse(darkSpotX - 20, darkSpotY + 36, 40, 6, 0.1, 0, Math.PI * 2);
      ctx.ellipse(w * 0.7, h * 0.65, 55, 8, -0.05, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.set(planetId, texture);
  return texture;
}

/**
 * Generates high-detail Saturn ring texture with Cassini division and transparency
 */
export function getSaturnRingTexture(): THREE.CanvasTexture {
  const cacheKey = 'saturn-ring-texture';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const w = canvas.width;
  const grad = ctx.createLinearGradient(0, 0, w, 0);

  // Inner transparent void
  grad.addColorStop(0.0, 'rgba(0,0,0,0)');
  // D ring (very faint)
  grad.addColorStop(0.05, 'rgba(180, 150, 110, 0.15)');
  // C ring (translucent crepe ring)
  grad.addColorStop(0.12, 'rgba(210, 180, 130, 0.4)');
  grad.addColorStop(0.28, 'rgba(230, 200, 150, 0.6)');
  // B ring (brightest, densest)
  grad.addColorStop(0.32, 'rgba(254, 240, 190, 0.95)');
  grad.addColorStop(0.56, 'rgba(245, 225, 175, 0.9)');
  // Cassini Division (prominent dark gap)
  grad.addColorStop(0.58, 'rgba(0, 0, 0, 0.05)');
  grad.addColorStop(0.63, 'rgba(0, 0, 0, 0.05)');
  // A ring
  grad.addColorStop(0.65, 'rgba(235, 215, 165, 0.85)');
  // Encke gap
  grad.addColorStop(0.82, 'rgba(30, 25, 20, 0.1)');
  grad.addColorStop(0.84, 'rgba(235, 215, 165, 0.8)');
  // Outer F ring edge
  grad.addColorStop(0.92, 'rgba(200, 180, 140, 0.5)');
  grad.addColorStop(0.98, 'rgba(180, 160, 130, 0.15)');
  grad.addColorStop(1.0, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, canvas.height);

  // Micro-ring groove noise
  for (let x = 0; x < w; x += 2) {
    if (Math.random() > 0.4) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.15})`;
      ctx.fillRect(x, 0, 1, canvas.height);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Generates Sun texture with solar flares and limb darkening
 */
export function getSunTexture(): THREE.CanvasTexture {
  const cacheKey = 'sun-texture';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const w = canvas.width;
  const h = canvas.height;

  // Blazing thermonuclear gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#f59e0b');
  grad.addColorStop(0.2, '#f97316');
  grad.addColorStop(0.5, '#fef08a');
  grad.addColorStop(0.8, '#f97316');
  grad.addColorStop(1, '#b45309');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Granulation cells
  for (let i = 0; i < 400; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const r = 4 + Math.random() * 25;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(254, 240, 138, 0.3)' : 'rgba(234, 88, 12, 0.25)';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sunspots
  for (let i = 0; i < 8; i++) {
    const cx = Math.random() * w;
    const cy = h * 0.3 + Math.random() * (h * 0.4);
    ctx.fillStyle = 'rgba(67, 20, 7, 0.7)';
    ctx.beginPath();
    ctx.ellipse(cx, cy, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    // Penumbra
    ctx.strokeStyle = 'rgba(180, 83, 9, 0.5)';
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}
