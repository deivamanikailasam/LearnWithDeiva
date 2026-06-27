/**
 * Inline image embedder for authored `document.json` files.
 *
 * The `/gen-loop` workflow lets Claude author small, readable image nodes that
 * point at a local file instead of pasting a huge base64 blob by hand:
 *
 *   { "type": "image", "attrs": { "src": "FILE:/abs/path/diagram.svg", "alt": "..." } }
 *
 * This script rewrites every `src` that starts with `FILE:` into a self-contained
 * `data:<mime>;base64,...` URI, reading the referenced file and inferring the
 * mime type from its extension. The result is exactly the shape the existing 53
 * image-bearing topics use (base64 lives INSIDE document.json — `public/data` is
 * gitignored, so there is no separate asset file to commit).
 *
 * SVG is the preferred, dependency-free diagram format: Claude authors the SVG
 * text directly, this script base64-encodes it, and the TipTap Image extension
 * renders the data URI via <img>. PNG/JPG (e.g. a matplotlib chart) also work.
 *
 * Usage:
 *   node scripts/embed-images.mjs <path/to/document.json> [more.json ...]
 *
 * Idempotent: a src that is already a data: URI (or http) is left untouched.
 * Exits non-zero if a FILE: reference cannot be read, so the loop can fail loud
 * instead of committing a broken image.
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const MIME_BY_EXT = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
}

const FILE_PREFIX = 'FILE:'

async function toDataUri(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const mime = MIME_BY_EXT[ext]
  if (!mime) {
    throw new Error(`Unsupported image extension "${ext}" for ${filePath}`)
  }
  const bytes = await readFile(filePath)
  return `data:${mime};base64,${bytes.toString('base64')}`
}

/** Walk the TipTap doc, replacing FILE: image srcs in place. Returns count. */
async function embedNode(node, stats) {
  if (!node || typeof node !== 'object') return
  if (
    node.type === 'image' &&
    node.attrs &&
    typeof node.attrs.src === 'string' &&
    node.attrs.src.startsWith(FILE_PREFIX)
  ) {
    const ref = node.attrs.src.slice(FILE_PREFIX.length).trim()
    const abs = path.resolve(ref)
    node.attrs.src = await toDataUri(abs)
    stats.embedded++
  }
  if (Array.isArray(node.content)) {
    for (const child of node.content) await embedNode(child, stats)
  }
}

async function processFile(file) {
  const raw = await readFile(file, 'utf8')
  const json = JSON.parse(raw)
  const root = json?.doc ?? json
  const stats = { embedded: 0 }
  await embedNode(root, stats)
  if (stats.embedded > 0) {
    await writeFile(file, JSON.stringify(json, null, 2) + '\n')
  }
  console.log(`${file}: embedded ${stats.embedded} image(s)`)
  return stats.embedded
}

async function main() {
  const files = process.argv.slice(2)
  if (files.length === 0) {
    console.error('Usage: node scripts/embed-images.mjs <document.json> [...]')
    process.exit(2)
  }
  for (const file of files) {
    await processFile(file)
  }
}

main().catch((err) => {
  console.error(err.message ?? err)
  process.exit(1)
})
