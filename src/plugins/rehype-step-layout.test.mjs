import { describe, it, expect } from 'vitest';
import { pairSteps, isImageParagraph, isProseParagraph } from './rehype-step-layout.mjs';

// --- tiny HAST builders ---------------------------------------------------
const txt = (v) => ({ type: 'text', value: v });
const el = (tagName, properties = {}, children = []) => ({
  type: 'element', tagName, properties, children,
});
const proseP = (text) => el('p', {}, [txt(text)]);
const img = (src, alt = '') => el('img', { src, alt }, []);
const imageP = (...imgs) => {
  const kids = [];
  imgs.forEach((im, i) => {
    if (i > 0) { kids.push(txt(' '), el('br', {}, [])); }
    kids.push(im);
  });
  return el('p', {}, kids);
};
const hasClass = (n, cls) =>
  n.type === 'element' && (n.properties.className || []).includes(cls);

describe('isImageParagraph / isProseParagraph', () => {
  it('classifies an image-only paragraph (allowing <br> and whitespace)', () => {
    expect(isImageParagraph(imageP(img('a.svg'), img('b.svg')))).toBe(true);
    expect(isProseParagraph(imageP(img('a.svg')))).toBe(false);
  });
  it('classifies a prose paragraph', () => {
    expect(isProseParagraph(proseP('hold here'))).toBe(true);
    expect(isImageParagraph(proseP('hold here'))).toBe(false);
  });
  it('a paragraph mixing text and an image is NOT image-only', () => {
    const mixed = el('p', {}, [txt('see '), img('a.svg')]);
    expect(isImageParagraph(mixed)).toBe(false);
  });
});

describe('pairSteps', () => {
  it('pairs a prose paragraph followed by an image-only paragraph into .step', () => {
    const out = pairSteps([proseP('hold here'), imageP(img('a.svg'))]);
    expect(out).toHaveLength(1);
    const step = out[0];
    expect(hasClass(step, 'step')).toBe(true);
    expect(hasClass(step.children[0], 'step-text')).toBe(true);
    expect(step.children[0].children[0].children[0].value).toBe('hold here');
    expect(hasClass(step.children[1], 'step-media')).toBe(true);
    expect(step.children[1].children[0].children[0].tagName).toBe('img');
  });

  it('routes multiple images into one .step-media', () => {
    const out = pairSteps([proseP('p'), imageP(img('a.svg'), img('b.svg'))]);
    const media = out[0].children[1];
    const imgs = media.children[0].children.filter((c) => c.tagName === 'img');
    expect(imgs).toHaveLength(2);
  });

  it('leaves a prose paragraph with no following image untouched', () => {
    const out = pairSteps([proseP('just prose'), proseP('more prose')]);
    expect(out).toHaveLength(2);
    expect(out[0].tagName).toBe('p');
    expect(out[1].tagName).toBe('p');
  });

  it('leaves a lone image-only paragraph (no preceding prose) untouched', () => {
    const out = pairSteps([el('h4', {}, [txt('Section')]), imageP(img('a.svg'))]);
    expect(out).toHaveLength(2);
    expect(out[1].tagName).toBe('p');
  });
});

// raw <br/> node as produced before rehype-raw runs
const rawBr = () => ({ type: 'raw', value: '<br/>' });
const blank = () => txt('\n');

describe('pairSteps with real-HAST whitespace and raw <br/>', () => {
  it('pairs across a whitespace text node between the prose and image paragraphs', () => {
    const out = pairSteps([proseP('hold here'), blank(), imageP(img('a.svg'))]);
    expect(out).toHaveLength(1);
    expect(hasClass(out[0], 'step')).toBe(true);
  });

  it('treats a multi-image paragraph separated by raw <br/> as image-only', () => {
    const p = el('p', {}, [img('a.svg'), txt(' '), rawBr(), txt('\n'), img('b.svg')]);
    expect(isImageParagraph(p)).toBe(true);
    const out = pairSteps([proseP('p'), blank(), p]);
    expect(out).toHaveLength(1);
    const media = out[0].children[1];
    expect(media.children[0].children.filter((c) => c.tagName === 'img')).toHaveLength(2);
  });
});
