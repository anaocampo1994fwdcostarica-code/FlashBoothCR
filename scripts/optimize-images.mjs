// Convierte las imágenes originales a WebP optimizado para el sitio.
//
// Uso: npm run optimize:images
//
// Lee los originales (JPG/JPEG/PNG) de assets-originales/<carpeta> y escribe
// la versión .webp en public/<carpeta>, con nombre en kebab-case.
// Los originales NO se publican: assets-originales/ está en .gitignore.
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_ROOT = path.join(ROOT, 'assets-originales')
const OUTPUT_ROOT = path.join(ROOT, 'public')
const FOLDERS = ['images/gallery', 'photo-strips/trimmed', 'comparisons']
const MAX_WIDTH = 1600
const QUALITY = 80
const INPUT_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png'])

const toKebabCase = (name) => name
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const formatKB = (bytes) => `${Math.round(bytes / 1024)} KB`

let converted = 0
for (const folder of FOLDERS) {
  const sourceDir = path.join(SOURCE_ROOT, folder)
  const outputDir = path.join(OUTPUT_ROOT, folder)
  let files
  try {
    files = await readdir(sourceDir)
  } catch {
    console.warn(`(omitido) No existe ${path.relative(ROOT, sourceDir)}`)
    continue
  }
  await mkdir(outputDir, { recursive: true })
  for (const file of files) {
    const { name, ext } = path.parse(file)
    if (!INPUT_EXTENSIONS.has(ext.toLowerCase())) continue
    const input = path.join(sourceDir, file)
    const output = path.join(outputDir, `${toKebabCase(name)}.webp`)
    const info = await sharp(input)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(output)
    converted += 1
    console.log(`${path.relative(ROOT, input)} → ${path.relative(ROOT, output)} (${info.width}×${info.height}, ${formatKB(info.size)})`)
  }
}

console.log(`\nListo: ${converted} imágenes convertidas a WebP (máx. ${MAX_WIDTH}px, calidad ${QUALITY}).`)
