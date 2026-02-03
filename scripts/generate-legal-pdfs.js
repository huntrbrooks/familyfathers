#!/usr/bin/env node

/**
 * Generate Legal PDFs
 * 
 * This script reads markdown files from src/legal/ and generates
 * formatted PDF documents in public/legal/
 * 
 * Usage: npm run generate:legal
 */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src', 'legal');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'legal');

const DOCUMENTS = [
  { input: 'privacy-policy.md', output: 'privacy-policy.pdf' },
  { input: 'terms-of-service.md', output: 'terms-of-service.pdf' },
];

// PDF styling
const STYLES = {
  page: {
    margins: { top: 72, bottom: 72, left: 72, right: 72 },
    size: 'A4',
  },
  title: {
    fontSize: 24,
    font: 'Helvetica-Bold',
    spacing: 20,
  },
  h2: {
    fontSize: 16,
    font: 'Helvetica-Bold',
    spacing: 16,
    topMargin: 24,
  },
  h3: {
    fontSize: 13,
    font: 'Helvetica-Bold',
    spacing: 12,
    topMargin: 16,
  },
  body: {
    fontSize: 11,
    font: 'Helvetica',
    lineGap: 4,
    spacing: 10,
  },
  bullet: {
    fontSize: 11,
    font: 'Helvetica',
    indent: 20,
    lineGap: 3,
    spacing: 6,
  },
  bold: {
    fontSize: 11,
    font: 'Helvetica-Bold',
  },
  italic: {
    fontSize: 10,
    font: 'Helvetica-Oblique',
    spacing: 8,
  },
  hr: {
    spacing: 16,
  },
};

/**
 * Parse markdown into structured blocks
 */
function parseMarkdown(content) {
  const lines = content.split('\n');
  const blocks = [];
  let currentParagraph = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip empty lines but flush paragraph
    if (trimmed === '') {
      if (currentParagraph.length > 0) {
        blocks.push({ type: 'paragraph', content: currentParagraph.join(' ') });
        currentParagraph = [];
      }
      continue;
    }
    
    // Horizontal rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      if (currentParagraph.length > 0) {
        blocks.push({ type: 'paragraph', content: currentParagraph.join(' ') });
        currentParagraph = [];
      }
      blocks.push({ type: 'hr' });
      continue;
    }
    
    // Title (h1)
    if (trimmed.startsWith('# ')) {
      if (currentParagraph.length > 0) {
        blocks.push({ type: 'paragraph', content: currentParagraph.join(' ') });
        currentParagraph = [];
      }
      blocks.push({ type: 'title', content: trimmed.slice(2) });
      continue;
    }
    
    // H2
    if (trimmed.startsWith('## ')) {
      if (currentParagraph.length > 0) {
        blocks.push({ type: 'paragraph', content: currentParagraph.join(' ') });
        currentParagraph = [];
      }
      blocks.push({ type: 'h2', content: trimmed.slice(3) });
      continue;
    }
    
    // H3
    if (trimmed.startsWith('### ')) {
      if (currentParagraph.length > 0) {
        blocks.push({ type: 'paragraph', content: currentParagraph.join(' ') });
        currentParagraph = [];
      }
      blocks.push({ type: 'h3', content: trimmed.slice(4) });
      continue;
    }
    
    // Bullet points
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (currentParagraph.length > 0) {
        blocks.push({ type: 'paragraph', content: currentParagraph.join(' ') });
        currentParagraph = [];
      }
      blocks.push({ type: 'bullet', content: trimmed.slice(2) });
      continue;
    }
    
    // Regular paragraph content
    currentParagraph.push(trimmed);
  }
  
  // Flush remaining paragraph
  if (currentParagraph.length > 0) {
    blocks.push({ type: 'paragraph', content: currentParagraph.join(' ') });
  }
  
  return blocks;
}

/**
 * Process inline markdown formatting (bold, italic, links)
 * Returns text with formatting removed (PDFKit doesn't support inline HTML)
 */
function processInlineFormatting(text) {
  // Remove bold markers but keep text
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  // Remove italic markers but keep text
  text = text.replace(/\*([^*]+)\*/g, '$1');
  // Convert links to "text (url)" format
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
  // Remove any remaining markdown artifacts
  text = text.replace(/`([^`]+)`/g, '$1');
  
  return text;
}

/**
 * Render a single block to the PDF
 */
function renderBlock(doc, block, pageWidth) {
  const text = processInlineFormatting(block.content || '');
  
  switch (block.type) {
    case 'title':
      doc.moveDown(0.5);
      doc.font(STYLES.title.font)
         .fontSize(STYLES.title.fontSize)
         .text(text, { align: 'center' });
      doc.moveDown(STYLES.title.spacing / STYLES.title.fontSize);
      break;
      
    case 'h2':
      doc.moveDown(STYLES.h2.topMargin / STYLES.body.fontSize);
      doc.font(STYLES.h2.font)
         .fontSize(STYLES.h2.fontSize)
         .text(text);
      doc.moveDown(STYLES.h2.spacing / STYLES.h2.fontSize);
      break;
      
    case 'h3':
      doc.moveDown(STYLES.h3.topMargin / STYLES.body.fontSize);
      doc.font(STYLES.h3.font)
         .fontSize(STYLES.h3.fontSize)
         .text(text);
      doc.moveDown(STYLES.h3.spacing / STYLES.h3.fontSize);
      break;
      
    case 'paragraph':
      // Check if it's an italic disclaimer (starts and ends with *)
      if (block.content.startsWith('*') && block.content.endsWith('*')) {
        doc.font(STYLES.italic.font)
           .fontSize(STYLES.italic.fontSize)
           .text(text.slice(1, -1), { lineGap: STYLES.body.lineGap });
      } else {
        doc.font(STYLES.body.font)
           .fontSize(STYLES.body.fontSize)
           .text(text, { lineGap: STYLES.body.lineGap });
      }
      doc.moveDown(STYLES.body.spacing / STYLES.body.fontSize);
      break;
      
    case 'bullet':
      doc.font(STYLES.bullet.font)
         .fontSize(STYLES.bullet.fontSize)
         .text(`•  ${text}`, {
           indent: STYLES.bullet.indent,
           lineGap: STYLES.bullet.lineGap,
         });
      doc.moveDown(STYLES.bullet.spacing / STYLES.bullet.fontSize);
      break;
      
    case 'hr':
      doc.moveDown(STYLES.hr.spacing / STYLES.body.fontSize);
      const y = doc.y;
      doc.moveTo(STYLES.page.margins.left, y)
         .lineTo(pageWidth - STYLES.page.margins.right, y)
         .strokeColor('#cccccc')
         .lineWidth(0.5)
         .stroke();
      doc.moveDown(STYLES.hr.spacing / STYLES.body.fontSize);
      break;
  }
}

/**
 * Generate a PDF from markdown content
 */
function generatePDF(markdownContent, outputPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: STYLES.page.size,
      margins: STYLES.page.margins,
      bufferPages: true,
    });
    
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);
    
    // Parse markdown
    const blocks = parseMarkdown(markdownContent);
    
    // Calculate page width for horizontal rules
    const pageWidth = doc.page.width;
    
    // Render each block
    blocks.forEach(block => {
      renderBlock(doc, block, pageWidth);
    });
    
    // Add page numbers
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.font('Helvetica')
         .fontSize(9)
         .fillColor('#666666')
         .text(
           `Page ${i + 1} of ${range.count}`,
           STYLES.page.margins.left,
           doc.page.height - 50,
           { align: 'center', width: pageWidth - STYLES.page.margins.left - STYLES.page.margins.right }
         );
    }
    
    doc.end();
    
    writeStream.on('finish', () => {
      console.log(`  ✓ Generated: ${path.basename(outputPath)}`);
      resolve();
    });
    
    writeStream.on('error', reject);
  });
}

/**
 * Main function
 */
async function main() {
  console.log('\nGenerating Legal PDFs...\n');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`  Created directory: public/legal/\n`);
  }
  
  // Generate each document
  for (const doc of DOCUMENTS) {
    const inputPath = path.join(SRC_DIR, doc.input);
    const outputPath = path.join(OUTPUT_DIR, doc.output);
    
    if (!fs.existsSync(inputPath)) {
      console.error(`  ✗ Source not found: ${doc.input}`);
      continue;
    }
    
    const content = fs.readFileSync(inputPath, 'utf-8');
    await generatePDF(content, outputPath);
  }
  
  console.log('\nDone!\n');
}

main().catch(err => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
