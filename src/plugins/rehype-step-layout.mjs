// Build-time rehype plugin: on map-guide pages, pair a prose paragraph that is
// immediately followed by an image-only paragraph into a side-by-side .step
// row (.step-text + .step-media). Authoring stays plain markdown: write a
// sentence, then put the screenshot(s) on the next line.
//
// Must run BEFORE rehype-collapsible-stages so the produced .step <div>s are
// plain body nodes when the stages plugin folds headings into <details>.

function isElement(node, tagName) {
  return Boolean(node) && node.type === 'element' && node.tagName === tagName;
}

// Whitespace-only text node?
function isBlankText(node) {
  return Boolean(node) && node.type === 'text' && node.value.trim() === '';
}

// Ignorable inside an image paragraph: whitespace, or a line break expressed as
// a <br> element OR a raw "<br/>" node (raw HTML isn't yet an element at this
// stage of the pipeline). Allows authors to separate stacked images with <br>.
function isImgSeparator(node) {
  if (!node) return false;
  if (node.type === 'element' && node.tagName === 'br') return true;
  if ((node.type === 'text' || node.type === 'raw') &&
      /^(\s|<br\s*\/?>)*$/i.test(node.value)) return true;
  return false;
}

// Minimal HAST element factory.
function el(tagName, properties, children) {
  return { type: 'element', tagName, properties, children };
}

// A <p> whose meaningful children are all <img> (allowing <br> and whitespace),
// with at least one <img>.
export function isImageParagraph(node) {
  if (!isElement(node, 'p')) return false;
  let imgCount = 0;
  for (const child of node.children) {
    if (isElement(child, 'img')) { imgCount++; continue; }
    if (isImgSeparator(child)) continue;
    return false; // some other meaningful content -> not image-only
  }
  return imgCount > 0;
}

// A <p> that carries prose (not an image-only paragraph).
export function isProseParagraph(node) {
  return isElement(node, 'p') && !isImageParagraph(node);
}

// Pair adjacent (prose <p>, image <p>) siblings into .step rows.
export function pairSteps(nodes) {
  const out = [];
  let i = 0;
  while (i < nodes.length) {
    const node = nodes[i];
    if (isProseParagraph(node)) {
      let j = i + 1;
      while (j < nodes.length && isBlankText(nodes[j])) j++; // skip "\n" between blocks
      if (j < nodes.length && isImageParagraph(nodes[j])) {
        out.push(
          el('div', { className: ['step'] }, [
            el('div', { className: ['step-text'] }, [node]),
            el('div', { className: ['step-media'] }, [nodes[j]]),
          ])
        );
        i = j + 1; // consume gap + image paragraph
        continue;
      }
    }
    out.push(node);
    i++;
  }
  return out;
}

// Rehype plugin. Only touches files under maps/.
export default function rehypeStepLayout() {
  return (tree, file) => {
    const path = String(
      (file && (file.path || (file.history && file.history[file.history.length - 1]))) || ''
    );
    if (!/[\\/]maps[\\/]/.test(path)) return;
    tree.children = pairSteps(tree.children);
  };
}
