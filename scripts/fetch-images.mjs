/**
 * Best-effort image fetcher for manifest.imageTasks.
 *
 * Reads a manifest (the same one you fed to apply-content.mjs) and, for each
 * entry in `imageTasks` whose target file does not yet exist under `public/`,
 * tries to download the first URL in `suggestedSources`. Skips entries with
 * no sources, prints a clear TODO list for manual fulfilment, and never
 * overwrites an existing file.
 *
 * This is intentionally simple: no licence detection, no image-gen, no
 * resizing. Always sanity-check the result before committing.
 *
 * Usage:
 *   node scripts/fetch-images.mjs --file /tmp/manifest.json
 *   node scripts/fetch-images.mjs --file /tmp/manifest.json --dry-run
 *   node scripts/fetch-images.mjs --file /tmp/manifest.json --overwrite
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUBLIC_DIR = path.join(ROOT, 'public')
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB
const ALLOWED_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/octet-stream',
])

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) continue
    const key = a.slice(2)
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) {
      out[key] = true
    } else {
      out[key] = next
      i++
    }
  }
  return out
}

async function downloadOne(url, destPath) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': 'LearnWithDeiva-content-fetcher/1.0 (+local)',
      Accept: 'image/*,application/octet-stream;q=0.8,*/*;q=0.5',
    },
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  const type = (res.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase()
  if (type && !ALLOWED_TYPES.has(type)) {
    throw new Error(`Unsupported content-type "${type}" (expected image/*)`)
  }
  const lenHeader = Number(res.headers.get('content-length') ?? 0)
  if (lenHeader && lenHeader > MAX_BYTES) {
    throw new Error(`Image too large (${lenHeader} bytes > ${MAX_BYTES})`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.byteLength > MAX_BYTES) {
    throw new Error(`Image too large after download (${buf.byteLength} bytes > ${MAX_BYTES})`)
  }
  await mkdir(path.dirname(destPath), { recursive: true })
  await writeFile(destPath, buf)
  return { bytes: buf.byteLength, type }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.file) {
    console.error('Usage: node scripts/fetch-images.mjs --file <manifest.json> [--dry-run] [--overwrite]')
    process.exit(2)
  }
  const raw = await readFile(path.resolve(args.file), 'utf8')
  let manifest
  try {
    manifest = JSON.parse(raw)
  } catch (err) {
    console.error('Manifest is not valid JSON:', err.message)
    process.exit(1)
  }
  const tasks = Array.isArray(manifest?.imageTasks) ? manifest.imageTasks : []
  if (tasks.length === 0) {
    console.log('No imageTasks in manifest. Nothing to fetch.')
    return
  }

  const dryRun = !!args['dry-run']
  const overwrite = !!args.overwrite
  let downloaded = 0
  let skipped = 0
  const todos = []

  for (const task of tasks) {
    if (typeof task?.src !== 'string' || !task.src.trim()) {
      todos.push({ task, reason: 'invalid src' })
      continue
    }
    if (task.src.startsWith('/') || /^https?:\/\//i.test(task.src)) {
      todos.push({ task, reason: 'src must be a relative path under public/ (e.g. "content-assets/...")' })
      continue
    }
    const destAbs = path.join(PUBLIC_DIR, task.src)
    if (existsSync(destAbs) && !overwrite) {
      console.log(`skip   already exists  ${path.relative(ROOT, destAbs)}`)
      skipped++
      continue
    }
    const source = Array.isArray(task.suggestedSources) ? task.suggestedSources[0] : null
    if (!source) {
      todos.push({ task, reason: 'no suggestedSources; fulfil manually (generate or source)' })
      continue
    }
    if (dryRun) {
      console.log(`would  ${source}\n   ->  ${path.relative(ROOT, destAbs)}`)
      continue
    }
    try {
      const { bytes, type } = await downloadOne(source, destAbs)
      console.log(`saved  ${source}\n   ->  ${path.relative(ROOT, destAbs)}  (${bytes} bytes, ${type})`)
      downloaded++
    } catch (err) {
      todos.push({ task, reason: `download failed: ${err.message}` })
    }
  }

  if (!dryRun) {
    console.log('')
    console.log(`Downloaded: ${downloaded}.  Skipped (already present): ${skipped}.  Manual TODO: ${todos.length}.`)
  }
  if (todos.length) {
    console.log('')
    console.log('=== Manual image TODOs ===')
    for (const t of todos) {
      console.log(` - ${t.task.src}`)
      console.log(`     alt:    ${t.task.alt ?? '(missing)'}`)
      console.log(`     prompt: ${t.task.prompt ?? '(missing)'}`)
      console.log(`     reason: ${t.reason}`)
      if (Array.isArray(t.task.suggestedSources)) {
        for (const s of t.task.suggestedSources) console.log(`     source: ${s}`)
      }
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
