const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'ezgif-4aca55ca8a0ffb94-jpg');
const publicDir = path.join(__dirname, 'public');
const products = ['mango', 'chocolate', 'pomegranate'];

// Ensure public/images directories exist
for (const product of products) {
  const productDir = path.join(publicDir, 'images', product);
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }
}

// Read all files from source
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.jpg')).sort();

// Copy and rename
files.forEach((file) => {
  // Extract number from 'ezgif-frame-001.jpg'
  const numStr = file.match(/(\d+)/)[1];
  const num = parseInt(numStr, 10);
  
  const sourcePath = path.join(sourceDir, file);
  
  for (const product of products) {
    const destPath = path.join(publicDir, 'images', product, `${num}.jpg`);
    fs.copyFileSync(sourcePath, destPath);
  }
});

console.log('Successfully copied and renamed all frames.');
