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

import { fluidRipplesField as field } from './fluid-ripples-field';

export const fluidRipplesVertex = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

/** Blur precedes shared turbulence; screen derivatives include its effect on the water normals. */
export const fluidRipplesFragment = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform vec2 uResolution, uBufferSize;
uniform float uCount, uWidth, uDistortion, uTurbulence, uBlur, uRefraction, uSeed, uDark, uCustomPalette;
uniform vec3 uBackground, uBlue, uLavender, uHighlight;
uniform vec4 uRings[24];
uniform float uAmplitude[24];
uniform sampler2D uNoise;
const float TAU = 6.28318530718;

vec2 noise(vec2 p) {
  return texture(uNoise,p).rg*2.0-1.0;
}
vec3 palette(vec3 color, float bend) {
  if (uDark > .5) {
    float cool=clamp((color.b-color.r-.025)*7.0,0.0,1.0);
    float lavender=clamp((color.b-color.g-.025)*9.0,0.0,1.0);
    vec3 ink=mix(uBackground,uBlue,cool*.72);
    ink=mix(ink,uLavender,lavender*.28);
    return mix(ink,uHighlight,clamp(bend*.14,0.0,.30));
  }
  mat3 inversePalette = mat3(-8.30651491,8.45663265,1.65129513,
    6.25490581,-17.88903061,-.47537284,6.75529827,6.17984694,14.78659733);
  vec3 w = inversePalette*(color-vec3(230.0,238.0,240.0)/255.0);
  vec4 weights = vec4(1.0-w.x-w.y-w.z,w);
  if (uCustomPalette > .5) {
    // Keep saturated presets inside their four colors instead of extrapolating into clipped RGB.
    weights=max(weights,vec4(0.0));
    weights/=max(.0001,dot(weights,vec4(1.0)));
  }
  return weights.x*uBackground+weights.y*uBlue+weights.z*uLavender+weights.w*uHighlight;
}
vec3 gradient(vec2 u) {
  float twist = noise(u*.8+vec2(.17,.29)).x*${field.backgroundTwist.toFixed(8)};
  vec2 q = mat2(cos(twist),sin(twist),-sin(twist),cos(twist))*(u-.5)+.5;
  vec2 p1=vec2(.27552,.31074), p2=vec2(.33953,.89130);
  vec2 p3=vec2(.94161,.13269), p4=vec2(.62161,.69287);
  float w1=1.0/pow(.015+dot(q-p1,q-p1),2.0);
  float w2=1.0/pow(.015+dot(q-p2,q-p2),2.0);
  float w3=1.0/pow(.015+dot(q-p3,q-p3),2.0);
  float w4=1.0/pow(.015+dot(q-p4,q-p4),2.0);
  vec3 pearl=vec3(.941,.953,.976);
  vec3 material=(vec3(.773,.859,.965)*w1+vec3(.870,.875,.941)*w2
    +pearl*w3+vec3(.800,.905,.957)*w4)/(w1+w2+w3+w4);
  // The tutorial's twisted material opens into a broad pearl pool on the right.
  float pool=smoothstep(.62,.92,q.x)*(.7+.3*smoothstep(.2,.7,q.y));
  return mix(material,pearl,pool);
}
void main() {
  vec2 uv=vec2(vUv.x,1.0-vUv.y);
  float aspect=uResolution.x/max(1.0,uResolution.y);
  vec2 p=uv*vec2(aspect,1.0);
  vec2 turbulence=noise(p/vec2(766.0/438.0,1.0)*.093/max(.02,uTurbulence)
    +vec2((uSeed-1.0)*.173,(uSeed-1.0)*.117));
  float widthScale=sqrt(uWidth*uWidth+2.0*uBlur*uBlur)/.11445523;
  float height=0.0;
  for (int i=0;i<24;i++) {
    if(float(i)>=uCount) break;
    vec4 ring=uRings[i];
    vec2 q=p-ring.xy+turbulence*uDistortion;
    float d=(length(q)-ring.z)/max(.008,ring.w*widthScale);
    height+=exp(-.5*d*d)*uAmplitude[i];
  }
  // Work in height units regardless of the drawing-buffer resolution.
  vec2 slope=vec2(dFdx(height),-dFdy(height))*uBufferSize.y*uRefraction/.41;
  vec3 normal=normalize(vec3(-slope,1.0));
  vec3 ray=refract(vec3(0,0,-1),normal,1.0/${field.refractiveIndex.toFixed(8)});
  vec2 offset=ray.xy/max(.1,-ray.z)*${field.depth.toFixed(8)};
  vec3 color=gradient(uv+offset);
  float diffuse=${field.ambient.toFixed(8)}+${field.lightPower.toFixed(8)}*dot(normal,normalize(vec3(-.6,-.5,1.0)));
  color*=1.0+(diffuse-1.0)*${field.lighting.toFixed(8)};
  fragColor=vec4(clamp(palette(color,length(slope)),0.0,1.0),1.0);
}`;
