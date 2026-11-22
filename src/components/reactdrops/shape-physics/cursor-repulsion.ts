/** Soft finite-radius force; applied by the existing fixed-step physics loop. */
export function repulsionVelocity(
  body: { id: number; x: number; y: number; radius: number; vx: number; vy: number },
  pointer: { x: number; y: number },
  dt: number,
) {
  let dx = body.x - pointer.x, dy = body.y - pointer.y;
  const distance = Math.hypot(dx, dy);
  const reach = 145 + body.radius;
  if (distance >= reach || dt <= 0) return null;
  if (distance < 0.001) {
    dx = Math.cos(body.id * 2.39996);
    dy = Math.sin(body.id * 2.39996);
  } else { dx /= distance; dy /= distance; }
  const falloff = 1 - distance / reach;
  const impulse = 1000 * falloff * falloff * (3 - 2 * falloff) * Math.min(dt, 1 / 30);
  let vx = body.vx + dx * impulse, vy = body.vy + dy * impulse;
  const speed = Math.hypot(vx, vy);
  if (speed > 160) { vx *= 160 / speed; vy *= 160 / speed; }
  return { vx, vy };
}
