const fs = require('fs');
const path = require('path');

const products = [
  { name: 'guava',      sourceDir: path.join(__dirname, 'guava-jpg') },
  { name: 'strawberry', sourceDir: path.join(__dirname, 'strawberry-jpg') },
];

for (const product of products) {
  const destDir = path.join(__dirname, 'public', 'images', product.name);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(product.sourceDir)
    .filter(f => f.endsWith('.jpg'))
    .sort();

  files.forEach((file) => {
    const numStr = file.match(/(\d+)/)[1];
    const num = parseInt(numStr, 10);
    const src = path.join(product.sourceDir, file);
    const dest = path.join(destDir, `${num}.jpg`);
    fs.copyFileSync(src, dest);
  });

  console.log(`✅ Copied ${files.length} frames for ${product.name}`);
}

console.log('Done!');
