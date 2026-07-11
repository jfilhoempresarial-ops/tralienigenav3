// build.js
// Monta o index.html final juntando index.template.html com os arquivos
// soltos da pasta /telas. Roda automaticamente no deploy da Vercel
// (configurado no vercel.json) e também pode rodar local com: node build.js
const fs = require('fs');
const path = require('path');

const TEMPLATE = path.join(__dirname, 'index.template.html');
const OUTPUT = path.join(__dirname, 'index.html');

let html = fs.readFileSync(TEMPLATE, 'utf-8');

// Troca cada <!-- INCLUDE: telas/xxx.html --> pelo conteúdo real do arquivo
html = html.replace(/<!--\s*INCLUDE:\s*(telas\/[a-zA-Z0-9_-]+\.html)\s*-->/g, (match, relPath) => {
  const filePath = path.join(__dirname, relPath);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${relPath}`);
    process.exit(1);
  }
  return fs.readFileSync(filePath, 'utf-8');
});

fs.writeFileSync(OUTPUT, html, 'utf-8');
console.log(`✅ index.html gerado (${html.length} caracteres) a partir de index.template.html + /telas`);
