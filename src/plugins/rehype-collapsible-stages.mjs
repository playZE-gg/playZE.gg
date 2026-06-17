// Build-time rehype plugin: folds map-guide stage headings into nested,
// collapsed-by-default <details> blocks on the HAST tree (works for .md and .mdx).

// Heading level (1-6) for a HAST node, or null if not a heading.
function headingLevel(node) {
  if (!node || node.type !== 'element') return null;
  const m = /^h([1-6])$/.exec(node.tagName);
  return m ? Number(m[1]) : null;
}

// All text within a HAST node, concatenated.
function textContent(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(textContent).join('');
  return '';
}

// Minimal HAST element factory.
function el(tagName, properties, children) {
  return { type: 'element', tagName, properties, children };
}

// Fold flat HAST nodes into nested <details> by heading level: h3 -> .stage,
// deeper -> .stage-section. Non-headings attach to the innermost open section.
export function groupByHeadings(nodes) {
  const result = [];
  const stack = []; // [{ level, details }]

  const append = (node) => {
    if (stack.length) stack[stack.length - 1].details.children.push(node);
    else result.push(node);
  };

  for (const node of nodes) {
    const level = headingLevel(node);
    if (level === null) {
      append(node);
      continue;
    }
    // Close any open sections at the same or deeper level.
    while (stack.length && stack[stack.length - 1].level >= level) stack.pop();

    const cls = level === 3 ? 'stage' : 'stage-section';
    const summary = el('summary', {}, [node]);
    const details = el('details', { className: [cls] }, [summary]);
    append(details);
    stack.push({ level, details });
  }

  return result;
}

// Rehype plugin. Only touches files under maps/: folds the `## Stages`
// section's headings into nested <details> via groupByHeadings.
export default function rehypeCollapsibleStages() {
  return (tree, file) => {
    const path = String(
      (file && (file.path || (file.history && file.history[file.history.length - 1]))) || ''
    );
    if (!/[\\/]maps[\\/]/.test(path)) return;

    const children = tree.children;
    const startIdx = children.findIndex(
      (n) =>
        headingLevel(n) === 2 &&
        ((n.properties && n.properties.id === 'stages') ||
          textContent(n).trim().toLowerCase() === 'stages')
    );
    if (startIdx === -1) return;

    let endIdx = children.length;
    for (let i = startIdx + 1; i < children.length; i++) {
      if (headingLevel(children[i]) === 2) {
        endIdx = i;
        break;
      }
    }

    const slice = children.slice(startIdx + 1, endIdx);
    if (slice.length === 0) return;

    const grouped = groupByHeadings(slice);
    children.splice(startIdx + 1, slice.length, ...grouped);
  };
}
