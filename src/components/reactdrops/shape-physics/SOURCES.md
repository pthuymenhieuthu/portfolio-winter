# Floating tool logos preview

Shared scene: `src/components/floating-tools-water.tsx`, used by the homepage BringOnBoard section and `/experiments/shape-water`.

Reference lock: ReactDrops Shape Physics (2D movement, collisions and dragging), with the existing Paper Water caustics layered above. The composition does not refract a live canvas texture or simulate fluid buoyancy.

- Physics source: https://reactdrops.dev/components/background/shape-physics
- Registry: https://reactdrops.dev/r/shape-physics.json
- ReactDrops license is retained in each vendored source file.
- Water: existing `@paper-design/shaders-react` dependency, https://shaders.paper.design/water
- Figma, Rive and Adobe artwork: Simple Icons 13.21.0, https://github.com/simple-icons/simple-icons/tree/13.21.0/icons (CC0).
- CapCut artwork: https://www.svgrepo.com/svg/504203/capcut (CC0).

Local source changes: optional SVG artwork painting within circle collision bodies; transparent canvas clearing; a shared translucent white gradient with a faint neutral rim applied to the supplied SVG paths. No new runtime packages.

Six logos repeat across up to 24 desktop bodies / 12 mobile bodies. Desktop pointers apply a bounded repulsion force; touch devices retain normal page scrolling. Native ReactDrops visibility, reduced-motion and pointer handling are retained. The water layer stops when paused, hidden or reduced motion is requested.
