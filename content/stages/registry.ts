import type { StageContent } from "./types";
import { visualHierarchy } from "./01-visual-hierarchy";
import { proximity } from "./02-proximity";
import { clarity } from "./03-clarity";
import { alignment } from "./04-alignment";
import { contrast } from "./05-contrast";
import { simplicity } from "./06-simplicity";
import { whitespace } from "./07-whitespace";
import { layout } from "./08-layout";
import { balance } from "./09-balance";
import { consistency } from "./10-consistency";
import { visualCues } from "./11-visual-cues";
import { depth } from "./12-depth";
import { color } from "./13-color";
import { typography } from "./14-typography";
import { interactionCost } from "./15-interaction-cost";
import { goldenTips } from "./16-golden-tips";

/** Full content for every stage in the path. */
export const STAGE_CONTENT: Record<string, StageContent> = Object.fromEntries(
  [
    visualHierarchy,
    proximity,
    clarity,
    alignment,
    contrast,
    simplicity,
    whitespace,
    layout,
    balance,
    consistency,
    visualCues,
    depth,
    color,
    typography,
    interactionCost,
    goldenTips,
  ].map((s) => [s.slug, s]),
);
