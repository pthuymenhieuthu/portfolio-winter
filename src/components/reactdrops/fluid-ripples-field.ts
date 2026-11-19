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

/** Height-normalized calibration of the supplied blurred ripple / water refraction tutorial. */
export const fluidRipplesField = {
  growth: 0.58,
  height: 0.0574,
  width: 0.045,
  radius: 0.025,
  lifetime: 3.2,
  fadeIn: 0.08,
  fadeOut: 0.65,
  /** A drop larger than a keystroke first spreads as a decelerating shock front (radius ∝ √t). */
  shock: 0.62,
  /** Drops at least this size rebound once, sending a weaker trailing ring. */
  reboundSize: 1.6,
  reboundDelay: 0.12,
  depth: 0.85,
  refractiveIndex: 1.34,
  ambient: 0.73,
  lightPower: 0.5,
  lighting: 0.06,
  backgroundTwist: 0.22,
  noiseWidth: 20,
  noiseHeight: 12,
} as const;

/** A small periodic vector field models the tutorial's static turbulence (Evolution 0). */
export function createFluidNoise() {
  const { noiseWidth: width, noiseHeight: height } = fluidRipplesField;
  const data = new Uint8Array(width * height * 4);
  const tau = Math.PI * 2;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const u = (x + 0.5) / width,
        v = (y + 0.5) / height;
      const a =
        Math.sin(tau * (4 * u + 2 * v) + 0.8) * 0.45 +
        Math.sin(tau * (2 * u - 3 * v) + 2.1) * 0.28 +
        Math.cos(tau * (7 * u + 4 * v) + 1.7) * 0.17;
      const b =
        Math.cos(tau * (3 * u - 2 * v) + 2.4) * 0.45 +
        Math.sin(tau * (5 * u + 3 * v) + 3.7) * 0.28 +
        Math.cos(tau * (8 * u - 5 * v) + 0.3) * 0.17;
      const offset = (y * width + x) * 4;
      data[offset] = Math.round((a * 0.5 + 0.5) * 255);
      data[offset + 1] = Math.round((b * 0.5 + 0.5) * 255);
      data[offset + 2] = 128;
      data[offset + 3] = 255;
    }
  return data;
}
