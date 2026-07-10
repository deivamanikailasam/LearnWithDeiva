#!/usr/bin/env node
/**
 * Validates a document.json for TipTap v1 structural correctness.
 * Exits with code 1 if any violations are found; 0 if clean.
 *
 * Usage: node scripts/validate-tiptap.mjs <path/to/document.json>
 */

import { readFileSync } from 'fs'
import { validateTiptapDocument } from './lib/validate-tiptap.mjs'

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: node scripts/validate-tiptap.mjs <path/to/document.json>')
  process.exit(1)
}

let raw
try {
  raw = readFileSync(filePath, 'utf8')
} catch {
  console.error(`Cannot read file: ${filePath}`)
  process.exit(1)
}

let doc
try {
  doc = JSON.parse(raw)
} catch (e) {
  console.error(`Invalid JSON: ${e.message}`)
  process.exit(1)
}

const { errors, imageCount } = validateTiptapDocument(doc)

// The CLI treats the "at least one image" rule as a hard failure too.
if (imageCount === 0) {
  errors.push('  [doc] document must contain at least one image node (SVG diagram)')
}

const topContent = doc.doc?.content || []
if (errors.length > 0) {
  console.error(`\nTipTap validation FAILED for ${filePath} (${errors.length} error(s)):\n`)
  errors.forEach((e) => console.error(e))
  console.error('')
  process.exit(1)
} else {
  console.log(
    `TipTap validation passed: ${filePath} (${topContent.length} top-level nodes, ${imageCount} image(s))`,
  )
  process.exit(0)
}
