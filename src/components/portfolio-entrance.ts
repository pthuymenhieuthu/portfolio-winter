// A soft, irregular wash inspired by Codrops' ink/mist seams. Draw only during
// the entrance; the existing fluid renderer owns the background afterwards.
export function createEntranceWash(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return null;
  let pixels: ImageData;
  let texture: Float32Array;
  let progress = 0;

  const hash = (x: number, y: number) => {
    const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return value - Math.floor(value);
  };
  const noise = (x: number, y: number) => {
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = x - ix, fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    const a = hash(ix, iy), b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
    return (a + (b - a) * sx) * (1 - sy) + (c + (d - c) * sx) * sy;
  };

  const draw = (value: number) => {
    progress = value;
    const { width, height } = canvas;
    const envelope = Math.sin(Math.PI * value);
    const front = -0.3 + value * 1.65;
    const feather = 0.14;
    for (let x = 0; x < width; x++) {
      const u = x / width;
      // Broad overlapping swells, with small eddies rather than a straight seam.
      const swell = (Math.sin(u * 6.3 + value * 2.4) * 0.065
        + Math.sin(u * 12.4 - value * 3.2 + 1.7) * 0.028) * envelope;
      for (let y = 0; y < height; y++) {
        const i = y * width + x;
        const distance = y / height - front - swell - texture[i] * 0.075 * envelope;
        const t = Math.max(0, Math.min(1, (distance + feather) / (feather * 2)));
        pixels.data[i * 4 + 3] = Math.round(t * t * (3 - 2 * t) * 255);
      }
    }
    context.putImageData(pixels, 0, 0);
  };

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    const scale = Math.min(1, 360 / Math.max(1, bounds.width),
      Math.sqrt(90000 / Math.max(1, bounds.width * bounds.height)));
    canvas.width = Math.max(1, Math.round(bounds.width * scale));
    canvas.height = Math.max(1, Math.round(bounds.height * scale));
    pixels = context.createImageData(canvas.width, canvas.height);
    texture = new Float32Array(canvas.width * canvas.height);
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = y * canvas.width + x;
        const u = x / canvas.width, v = y / canvas.width;
        texture[i] = noise(u * 5, v * 5) - 0.5
          + (noise(u * 15, v * 15) - 0.5) * 0.35;
        pixels.data[i * 4] = 255;
        pixels.data[i * 4 + 1] = 255;
        pixels.data[i * 4 + 2] = 255;
      }
    }
    draw(progress);
  };
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  return { draw, dispose: () => observer.disconnect() };
}
