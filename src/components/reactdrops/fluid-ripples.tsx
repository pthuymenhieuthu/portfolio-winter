/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops

1. Scope and definitions

This license applies to ReactDrops software and associated documentation that
expressly carry this license or are distributed under a LICENSE file containing
it (the "Software"). "Licensor" means the copyright holder granting rights in
the Software, and only to the extent that holder has authority to grant them.
"You" means the individual or entity exercising these rights.

An "End Product" is a website, application, service, or other finished project
whose primary purpose is something other than providing reusable components,
source code, templates, or development assets to others.

2. Permitted uses

Subject to this license, Licensor grants You a worldwide, non-exclusive,
royalty-free license to use, copy, modify, and incorporate the Software into
unlimited personal, internal, and commercial End Products. You may charge for
End Products, subscriptions, development services, and work for clients.

You may distribute the Software as an integrated part of an End Product,
including in browser-delivered JavaScript. You may provide End Product source
code to a client, and share the Software with employees and contractors who
need it to develop or maintain End Products. Those recipients may use the
Software for those purposes subject to this license. This permission does not
authorize them to redistribute the Software as a reusable development asset.

3. Restricted redistribution

Unless You obtain separate written permission from Licensor, You may not sell,
sublicense, publish, share, or otherwise redistribute the Software, or a
substantial portion of it, whether unchanged or modified:

(a) as a standalone component, component library, UI kit, source-code bundle,
    registry, or other collection of reusable development assets;
(b) as part of a theme, template, starter project, or similar product offered
    to multiple recipients for reuse in their own projects; or
(c) through a builder or generation service that offers the Software as
    reusable blocks or source-code exports for others' projects.

These restrictions apply to paid and free redistribution. Renaming, restyling,
repackaging, translating, or modifying the Software does not remove them.
Building separate finished websites or applications for multiple clients is
permitted; offering a reusable template or kit containing the Software is not.

Public source-code hosting by Licensor is not permission to republish the
Software under another license. This license does not override any separate
rights granted directly by Licensor or applicable code-hosting terms.

4. Notices and ownership

Retain this license and applicable copyright and third-party notices in source
copies of the Software and permitted source distributions. No visible credit
or ReactDrops logo is required in an End Product's user interface.

Licensor retains ownership of its Software. You retain rights in Your own
contributions, subject to the license for any incorporated Software. No rights
to trademarks, trade names, or logos are granted by this license.

5. Third-party materials and separate grants

Dependencies, fonts, images, videos, and other third-party materials remain
subject to their respective licenses. Separately identified third-party code
is licensed under its stated terms, and these restrictions do not limit rights
granted by its copyright holders. Retain all required third-party notices.
Demo media are not licensed by this document; obtain Your own permission or
replace them with media You are entitled to use.

This license does not revoke rights granted under other valid licenses. It does
not assert ownership of third-party work or grant rights Licensor lacks.

6. Termination

The permissions granted here continue unless terminated for a material breach.
If You fail to cure a material breach within 30 days after receiving written
notice from Licensor, Your permissions terminate. On termination, cease uses
and distributions requiring this license. Rights under independently granted
licenses and rights that applicable law does not allow to be restricted remain
unaffected. Sections 3 through 7 survive termination.

7. Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT
PERMITTED BY APPLICABLE LAW, LICENSOR AND CONTRIBUTORS SHALL NOT BE LIABLE FOR
ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE,
ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR ITS USE.

This license does not limit rights or exceptions that applicable law makes
non-waivable. No other permissions are granted by implication.
*/

'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  createFluidRipplesRenderer,
  normalizeFluidRipples,
  fluidRipplesPresets,
  resolveFluidRipplesPalette,
  type FluidRipplesTuning,
} from './fluid-ripples-renderer';
import './fluid-ripples.css';

export type FluidRipplesHandle = {
  reset: () => void;
  seek: (seconds: number) => void;
  pause: () => void;
  play: () => void;
  /** Size scales the drop: 1 is a keystroke; larger drops make broader, faster, longer waves. */
  rippleAt: (x: number, y: number, strength?: number, size?: number) => void;
};
export type FluidRipplesProps = Partial<FluidRipplesTuning> & {
  height?: number | string;
  borderRadius?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
};
export const FluidRipples = forwardRef<FluidRipplesHandle, FluidRipplesProps>(function FluidRipples(
  { height, borderRadius = 32, children, className = '', style, 'aria-label': label, ...options },
  ref,
) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<ReturnType<typeof createFluidRipplesRenderer>>(null);
  const tuning = normalizeFluidRipples(options),
    key = JSON.stringify(tuning);
  const latest = useRef(tuning);
  latest.current = tuning;
  const preset = tuning.palette === 'auto' ? null : fluidRipplesPresets[tuning.palette];
  const light = resolveFluidRipplesPalette(tuning.palette, 'light');
  const dark = resolveFluidRipplesPalette(tuning.palette, 'dark');
  const paletteStyle = {
    '--fluid-palette-background-light': light[0],
    '--fluid-palette-blue-light': light[1],
    '--fluid-palette-lavender-light': light[2],
    '--fluid-palette-background-dark': dark[0],
    '--fluid-palette-blue-dark': dark[1],
    '--fluid-palette-lavender-dark': dark[2],
    ...(preset
      ? {
          '--fluid-typing-palette-light': preset.text[0],
          '--fluid-typing-palette-dark': preset.text[1],
        }
      : {}),
  };
  useImperativeHandle(
    ref,
    () => ({
      reset: () => engine.current?.reset(),
      seek: (seconds) => engine.current?.seek(seconds),
      pause: () => engine.current?.pause(),
      play: () => engine.current?.play(),
      rippleAt: (x, y, strength, size) => engine.current?.rippleAt(x, y, strength, size),
    }),
    [],
  );
  useEffect(() => {
    if (!canvas.current) return;
    const instance = createFluidRipplesRenderer(canvas.current, latest.current);
    engine.current = instance;
    return () => {
      instance?.dispose();
      engine.current = null;
    };
  }, []);
  useEffect(() => engine.current?.update(latest.current), [key]);
  return (
    <div
      className={`fluid-ripples ${className}`.trim()}
      data-fluid-mode={tuning.theme}
      data-fluid-palette={tuning.palette}
      data-fluid-interactive={tuning.interactive}
      style={{
        height,
        borderRadius: Number.isFinite(borderRadius) ? Math.max(0, borderRadius) : 32,
        ...paletteStyle,
        ...(tuning.backgroundColor ? { '--fluid-background': tuning.backgroundColor } : {}),
        ...(tuning.blueColor ? { '--fluid-blue': tuning.blueColor } : {}),
        ...(tuning.lavenderColor ? { '--fluid-lavender': tuning.lavenderColor } : {}),
        ...style,
      }}
      role={label ? (children === undefined ? 'img' : 'group') : undefined}
      aria-label={label}
    >
      <canvas ref={canvas} aria-hidden="true" />
      {children !== undefined && <div className="fluid-ripples-content">{children}</div>}
    </div>
  );
});
