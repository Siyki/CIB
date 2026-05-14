const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIRS = [
  path.join(__dirname, '../src/imagenes'),
  path.join(__dirname, '../src/assets'),
];

const EXTENSIONS = ['.png', '.jpg', '.jpeg'];

async function convertDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!EXTENSIONS.includes(ext)) continue;

    const inputPath = path.join(dir, file);
    const outputName = path.basename(file, ext) + '.webp';
    const outputPath = path.join(dir, outputName);

    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`  ⏭  Ya existe: ${outputName}`);
      continue;
    }

    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      const inSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
      const outSize = (fs.statSync(outputPath).size / 1024).toFixed(1);
      console.log(`  ✅ ${file} (${inSize} KB) → ${outputName} (${outSize} KB)`);
    } catch (err) {
      console.error(`  ❌ Error convirtiendo ${file}:`, err.message);
    }
  }
}

(async () => {
  for (const dir of DIRS) {
    console.log(`\n📁 Procesando: ${path.relative(process.cwd(), dir)}`);
    await convertDir(dir);
  }
  console.log('\n🎉 Conversión completada.');
})();
