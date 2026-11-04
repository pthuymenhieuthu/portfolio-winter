# Kiosk mini case

Route: `/blog/mcdonalds-kiosk`. Added to the existing Work collection.

## Build target and reference lock

Primary target: the portfolio's existing case-study typography, content widths and section navigation. Keep white canvas, shared heading font, readable body copy, numbered sections and large vertical gaps.

User references:
- Adam Augustyn: https://adamaugustyn.com/project/mcdonalds-digital-omnichannel-ux — journey-led narrative and service context; do not import the agency project's outcomes or authorship.
- Chee Seng Leong (2019): https://uxdesign.cc/mcdonalds-kiosk-ordering-system-ui-ux-case-study-fe7b3693f12c — secondary context for discoverability, meal customization and collection uncertainty. Historical external observations are hypotheses for Vietnam, not local findings.

Refero research: Elvina Prasad (44fde25c-8772-40f6-a828-f78046cf4f07), editorial type and whitespace; André Cândido (0b2f3769-6256-499a-8f61-4a6af5e5c063), bounded secondary influence for restrained rules and project presentation. Existing portfolio tokens override reference typography. Yellow is used in the case's original journey illustration and contextual hero, not as a borrowed CTA token.

Media: original editable isometric SVG scenes across Find → Choose → Collect. Following user review, the original character storyboard was replaced with object-led illustrations inspired by Raha's SVG Vector skill (https://github.com/Rahuchpred/raha/blob/main/skills/svg-vector/SKILL.md): 2:1 projection, three gray line tones, filled occlusion and sparse geometry. User requested static illustration first, so no motion is added. The focus is a category kiosk, separated meal contents, and receipt/pickup display with a shared order number. These are conceptual illustrations, not UI research evidence. No reference paths or screenshots are reused. SVGs are inline and reuse local primitives. Export matching static montage/thumbnail with `node local-tests/kiosk-illustration/render.cjs`; old SVG assets are retained but no longer used by this case or its card.

## Content and remaining inputs

Preserve the provided English six-section narrative and first-time/occasional user audience. Show exploration status and validation plan explicitly. No invented interviews, participant counts, improvements, dates, role history or completed screens.

To turn this exploration into a completed redesign case, request:
- Photos/screenshots of current kiosks in Vietnam, location/date and collection/payment method.
- The user's own Figma redesign screens or prototype for Find, Choose and Collect.
- Local observation notes and usability results, if available.
- Any confirmed project timeline and role details.

The current version includes an interactive concept at `/experiments/mcdonalds-kiosk` and embedded in Design directions. It remains unvalidated. Vietnamese/English toggles preserve the in-memory order and selected meal/drink/service. The concept includes categories, bilingual search, item/meal comparison, included contents, three drink choices, a quantity/removal cart, and a simulated paid counter-pickup confirmation. Fixed sample order number 042; prices and payment are explicitly illustrative. A new order resets order inputs and retains the chosen language. Refresh clears the demo state.

Visual target: approved white/yellow kiosk UI, food photography, large selection targets, clear back controls and explicit meal contents. Refero context: menu screen 7bee1921-557c-436b-976a-eed3070730e6 and meal customization screen d546363e-f9b2-4419-ac8f-b34cc66532d7. Adapt food presentation and explicit required selection to a kiosk; omit delivery-app promotions/ratings. Product photo source paths are recorded in `public/assets/kiosk/food/SOURCES.md`.

Pickup confirmation now includes an illustrated three-step journey: receipt → order display → pickup counter. Repeated yellow-highlighted 042 connects the steps. The display illustration distinguishes Preparing from Ready; instructions say to wait for the Ready column. SVG diagrams and captions switch VI/EN together; three columns on wide screens become a vertical sequence with downward arrows on phones. Verified at desktop and 390px, including the English version, with no horizontal overflow. The display is explanatory artwork, not a live restaurant status.

Latest review: removed the introduction and per-step explanatory paragraphs so illustrations and short step titles carry the journey. Replaced the flat drawings with original 2:1 isometric line figures using three gray tones, faint ground lines, white occlusion fills and yellow order-number highlights. Previous flat implementation is retained at `local-tests/kiosk-illustration/pickup-journey-flat.tsx.bak` for rollback. Both VI/EN have exactly three short step titles.
