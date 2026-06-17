import { describe, it, expect } from 'vitest';
import { groupByHeadings } from './rehype-collapsible-stages.mjs';

// --- tiny HAST builders ---------------------------------------------------
const txt = (v) => ({ type: 'text', value: v });
const heading = (level, text, properties = {}) => ({
  type: 'element', tagName: `h${level}`, properties, children: [txt(text)],
});
const p = (text) => ({
  type: 'element', tagName: 'p', properties: {}, children: [txt(text)],
});
const isDetails = (n, cls) =>
  n.type === 'element' && n.tagName === 'details' &&
  (n.properties.className || []).includes(cls);

describe('groupByHeadings', () => {
  it('wraps each top-level (h3) heading and its body in details.stage', () => {
    const out = groupByHeadings([
      heading(3, 'Stage 1'), p('a'),
      heading(3, 'Stage 2'), p('b'),
    ]);

    expect(out).toHaveLength(2);
    expect(isDetails(out[0], 'stage')).toBe(true);
    // summary wraps the original heading; body follows
    expect(out[0].children[0].tagName).toBe('summary');
    expect(out[0].children[0].children[0].tagName).toBe('h3');
    expect(out[0].children[1].tagName).toBe('p');
    expect(out[0].children[1].children[0].value).toBe('a');
    expect(isDetails(out[1], 'stage')).toBe(true);
  });

  it('nests h4 sub-sections inside their parent h3 as details.stage-section', () => {
    const out = groupByHeadings([
      heading(3, 'Stage 1'), p('intro'),
      heading(4, 'Sub A'), p('a'),
      heading(3, 'Stage 2'),
    ]);

    expect(out).toHaveLength(2);
    const stage1 = out[0];
    expect(isDetails(stage1, 'stage')).toBe(true);
    // children: summary, p(intro), details.stage-section
    expect(stage1.children[0].tagName).toBe('summary');
    expect(stage1.children[1].children[0].value).toBe('intro');
    const subA = stage1.children[2];
    expect(isDetails(subA, 'stage-section')).toBe(true);
    expect(subA.children[0].children[0].tagName).toBe('h4');
    expect(subA.children[1].children[0].value).toBe('a');
  });

  it('leaves content before the first heading at the top level', () => {
    const out = groupByHeadings([
      p('intro before any stage'),
      heading(3, 'Stage 1'), p('a'),
    ]);

    expect(out[0].tagName).toBe('p');
    expect(out[0].children[0].value).toBe('intro before any stage');
    expect(isDetails(out[1], 'stage')).toBe(true);
  });

  it('nests deeper levels (h5 inside h4 inside h3)', () => {
    const out = groupByHeadings([
      heading(3, 'Stage 1'),
      heading(4, 'Sub A'),
      heading(5, 'Deep'), p('x'),
    ]);

    const stage1 = out[0];
    const subA = stage1.children[1];
    const deep = subA.children[1];
    expect(isDetails(subA, 'stage-section')).toBe(true);
    expect(isDetails(deep, 'stage-section')).toBe(true);
    expect(deep.children[0].children[0].tagName).toBe('h5');
    expect(deep.children[1].children[0].value).toBe('x');
  });
});

import rehypeCollapsibleStages from './rehype-collapsible-stages.mjs';

const root = (children) => ({ type: 'root', children });
const run = (tree, path) => {
  rehypeCollapsibleStages()(tree, { path });
  return tree;
};
const MAPS = 'D:/Code/playZE.gg/src/content/docs/maps/ze_best_korea.md';
const OTHER = 'D:/Code/playZE.gg/src/content/docs/skills/movement.md';

describe('rehypeCollapsibleStages plugin', () => {
  it('does nothing on non-map pages', () => {
    const tree = run(root([
      heading(2, 'Stages', { id: 'stages' }),
      heading(3, 'Stage 1'), p('a'),
    ]), OTHER);
    expect(tree.children[1].tagName).toBe('h3'); // untouched
  });

  it('does nothing when there is no Stages section', () => {
    const tree = run(root([
      heading(2, 'Overview', { id: 'overview' }), p('x'),
    ]), MAPS);
    expect(tree.children[0].tagName).toBe('h2');
    expect(tree.children[1].tagName).toBe('p');
  });

  it('wraps only the Stages section, leaving sibling sections alone', () => {
    const tree = run(root([
      heading(2, 'Stages', { id: 'stages' }),
      heading(3, 'Stage 1'), p('a'),
      heading(2, 'Common Fail Points', { id: 'common-fail-points' }),
      heading(3, 'Not a stage'), p('b'),
    ]), MAPS);

    // Stages h2 stays; its h3 is now inside details.stage
    expect(tree.children[0].tagName).toBe('h2');
    expect(tree.children[1].tagName).toBe('details');
    expect((tree.children[1].properties.className || []).includes('stage')).toBe(true);
    // The second h2 and its h3 are NOT wrapped
    const failIdx = tree.children.findIndex(
      (n) => n.tagName === 'h2' && n.properties.id === 'common-fail-points'
    );
    expect(tree.children[failIdx + 1].tagName).toBe('h3');
  });

  it('matches the Stages heading by text when id is absent', () => {
    const tree = run(root([
      heading(2, 'Stages'),
      heading(3, 'Stage 1'), p('a'),
    ]), MAPS);
    expect(tree.children[1].tagName).toBe('details');
  });

  it('handles Windows backslash paths', () => {
    const tree = run(root([
      heading(2, 'Stages', { id: 'stages' }),
      heading(3, 'Stage 1'), p('a'),
    ]), 'D:\\Code\\playZE.gg\\src\\content\\docs\\maps\\ze_x.md');
    expect(tree.children[1].tagName).toBe('details');
  });
});
