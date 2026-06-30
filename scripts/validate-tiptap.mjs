#!/usr/bin/env node
/**
 * Validates a document.json for TipTap v1 structural correctness.
 * Exits with code 1 if any violations are found; 0 if clean.
 *
 * Usage: node scripts/validate-tiptap.mjs <path/to/document.json>
 */

import { readFileSync } from 'fs';

const BLOCK_NODES = new Set([
  'paragraph','heading','bulletList','orderedList','blockquote',
  'codeBlock','table','tableRow','horizontalRule','blockMath','image',
]);
const INLINE_NODES = new Set(['text','inlineMath','hardBreak']);
const LIST_CONTAINER = new Set(['bulletList','orderedList']);
const TABLE_CONTAINER = new Set(['table','tableRow']);

const errors = [];

function err(path, msg) {
  errors.push(`  [${path}] ${msg}`);
}

function validateNode(node, path, parentType, ancestorTypes = []) {
  if (!node || typeof node !== 'object') return;
  const t = node.type;
  if (!t) { err(path, 'node missing "type"'); return; }

  const ancestors = [...ancestorTypes, parentType].filter(Boolean);

  // blockMath must not be inside paragraph
  if (t === 'blockMath' && parentType === 'paragraph') {
    err(path, `blockMath cannot be nested inside paragraph (use it as a top-level block)`);
  }

  // inlineMath must be inside paragraph (not top-level)
  if (t === 'inlineMath' && parentType !== 'paragraph') {
    err(path, `inlineMath must be inside paragraph.content, not a ${parentType || 'top-level block'}`);
  }

  // horizontalRule cannot be inside list or table
  if (t === 'horizontalRule') {
    const inList = ancestors.some(a => LIST_CONTAINER.has(a) || a === 'listItem');
    const inTable = ancestors.some(a => TABLE_CONTAINER.has(a) || a === 'tableCell' || a === 'tableHeader');
    if (inList) err(path, `horizontalRule cannot be inside a list`);
    if (inTable) err(path, `horizontalRule cannot be inside a table`);
  }

  // heading cannot be inside listItem
  if (t === 'heading' && ancestors.includes('listItem')) {
    err(path, `heading cannot be nested inside a listItem`);
  }

  // listItem must have at least one paragraph child (no raw text nodes)
  if (t === 'listItem') {
    const children = node.content || [];
    if (children.length === 0) {
      err(path, `listItem must have at least one child node`);
    } else {
      const hasParagraph = children.some(c => c.type === 'paragraph');
      if (!hasParagraph) {
        err(path, `listItem must contain at least one paragraph as a direct child`);
      }
      // Detect raw text nodes directly in listItem
      const rawText = children.filter(c => c.type === 'text');
      if (rawText.length > 0) {
        err(path, `listItem has raw text node(s) as direct children — wrap in paragraph`);
      }
    }
  }

  // tableHeader and tableCell must wrap content in paragraph
  if (t === 'tableHeader' || t === 'tableCell') {
    const children = node.content || [];
    if (children.length === 0) {
      err(path, `${t} must have at least one child paragraph`);
    } else {
      const rawText = children.filter(c => c.type === 'text');
      if (rawText.length > 0) {
        err(path, `${t} has raw text node(s) as direct children — wrap in paragraph`);
      }
      const hasParagraph = children.some(c => c.type === 'paragraph');
      if (!hasParagraph) {
        err(path, `${t} must contain at least one paragraph`);
      }
    }
  }

  // Nodes that must NOT have content
  const LEAF_NODES = new Set(['text','horizontalRule','blockMath','inlineMath','image','hardBreak']);
  if (LEAF_NODES.has(t) && node.content !== undefined) {
    err(path, `${t} is a leaf node and must not have a "content" property`);
  }

  // Nodes that must have non-empty content
  const CONTENT_REQUIRED = new Set([
    'paragraph','heading','listItem','blockquote','tableRow','tableHeader','tableCell',
    'bulletList','orderedList',
  ]);
  if (CONTENT_REQUIRED.has(t)) {
    if (!Array.isArray(node.content) || node.content.length === 0) {
      err(path, `${t} must have a non-empty content array`);
    }
  }

  // Recurse
  if (Array.isArray(node.content)) {
    node.content.forEach((child, i) => {
      validateNode(child, `${path}.content[${i}]`, t, ancestors);
    });
  }
}

function collectImages(node) {
  let found = 0;
  if (!node || typeof node !== 'object') return 0;
  if (node.type === 'image') found++;
  if (Array.isArray(node.content)) {
    found += node.content.reduce((s, c) => s + collectImages(c), 0);
  }
  return found;
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/validate-tiptap.mjs <path/to/document.json>');
  process.exit(1);
}

let raw;
try {
  raw = readFileSync(filePath, 'utf8');
} catch (e) {
  console.error(`Cannot read file: ${filePath}`);
  process.exit(1);
}

let doc;
try {
  doc = JSON.parse(raw);
} catch (e) {
  console.error(`Invalid JSON: ${e.message}`);
  process.exit(1);
}

if (doc.format !== 'tiptap/v1') {
  err('root', `format must be "tiptap/v1", got "${doc.format}"`);
}
if (!doc.doc || doc.doc.type !== 'doc') {
  err('root', 'doc.doc must be a node with type "doc"');
}

const topContent = doc.doc?.content || [];
topContent.forEach((node, i) => {
  validateNode(node, `doc.content[${i}]`, 'doc', []);
});

// Must have at least one image
const imageCount = collectImages(doc.doc);
if (imageCount === 0) {
  err('doc', 'document must contain at least one image node (SVG diagram)');
}

if (errors.length > 0) {
  console.error(`\nTipTap validation FAILED for ${filePath} (${errors.length} error(s)):\n`);
  errors.forEach(e => console.error(e));
  console.error('');
  process.exit(1);
} else {
  console.log(`TipTap validation passed: ${filePath} (${topContent.length} top-level nodes, ${imageCount} image(s))`);
  process.exit(0);
}
