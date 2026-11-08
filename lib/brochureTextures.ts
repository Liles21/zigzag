// High-Resolution 7-Panel Dynamic Canvas Texture Generator for Zigzag Accordion Brochure
// Comprehensive definition on every panel:
// Panel 1: ICT POLICIES AND ISSUES (with Members)
// Panel 2: DEFINITION (ICT Policies & ICT Issues)
// Panel 3: ICT POLICIES (1. DATA PRIVACY, 2. ANTI-CYBERCRIME with Definitions & Guidelines)
// Panel 4: ICT POLICIES (3. COPYRIGHT, 4. RESPONSIBLE USE OF TECHNOLOGY with Definitions & Guidelines)
// Panel 5: ICT ISSUES (Overview & Detailed Scope)
// Panel 6: ICT ISSUES (1. CYBERBULLYING, 2. FAKE NEWS with Definitions & Impact)
// Panel 7: ICT ISSUES (3. INTERNET ADDICTION, 4. PRIVACY ISSUES with Definitions & Impact)

export const OFFICIAL_MEMBERS = [
  'Romacula, Romnick',
  'Ramal, Jenelly',
  'Timbal, Angela',
  'Precioso, Rosemarie',
  'Sanchez, Jocine',
  'Tabugon, Rhea Jane',
  'Sabado, Charlene',
  'Quijas, Jeramel',
];

// Helper: Wrap text cleanly onto 2D canvas with precise line metrics
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, curY);
  return curY + lineHeight;
}

// ==========================================
// FRONT PANELS (PANELS 1 - 7)
// ==========================================

// PANEL 1: Title & Members
export function createPanel1CoverCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background gradient: Deep Slate / Navy
  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#0a1120');
  bgGrad.addColorStop(0.5, '#131e34');
  bgGrad.addColorStop(1, '#070c18');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Title Box
  const titleBoxY = cardY + 70;
  ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, titleBoxY, cardW - 120, 420, [32]);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 96px "Georgia", serif';
  ctx.fillText('ICT POLICIES', 800, titleBoxY + 155);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 58px "Segoe UI", sans-serif';
  ctx.fillText('AND', 800, titleBoxY + 255);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 96px "Georgia", serif';
  ctx.fillText('ISSUES', 800, titleBoxY + 360);

  // Members Section
  const memberSectionY = cardY + 540;
  ctx.fillStyle = 'rgba(14, 165, 233, 0.15)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, memberSectionY, cardW - 120, 1620, [32]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 50px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MEMBERS :', 800, memberSectionY + 85);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 180, memberSectionY + 120);
  ctx.lineTo(cardX + cardW - 180, memberSectionY + 120);
  ctx.stroke();

  const rowStartY = memberSectionY + 160;
  const rowH = 145;
  const rowGap = 32;

  OFFICIAL_MEMBERS.forEach((name, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.beginPath();
    ctx.roundRect(cardX + 100, rY, cardW - 200, rowH, [22]);
    ctx.fill();

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(cardX + 140, rY + 35, 75, 75, [16]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${idx + 1}`, cardX + 177, rY + 88);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 50px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(name, cardX + 260, rY + 90);
  });

  return canvas;
}

// PANEL 2: DEFINITION (ONLY the title DEFINITION - no category definitions)
export function createPanel2DefinitionCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#100826');
  bgGrad.addColorStop(0.5, '#1e1145');
  bgGrad.addColorStop(1, '#0b0518');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(19, 13, 38, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  const boxY = cardY + 580;
  const boxH = 1100;
  ctx.fillStyle = 'rgba(30, 17, 69, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 80, boxY, cardW - 160, boxH, [40]);
  ctx.fill();
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(cardX + 110, boxY + 30, cardW - 220, boxH - 60, [30]);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 120px "Georgia", serif';
  ctx.fillText('DEFINITION', 800, boxY + 580);

  return canvas;
}

// PANEL 3: ICT POLICIES (1. DATA PRIVACY, 2. ANTI-CYBERCRIME)
export function createPanel3Policies1Canvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#041f1e');
  bgGrad.addColorStop(0.5, '#073332');
  bgGrad.addColorStop(1, '#031716');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(20, 184, 166, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(7, 36, 35, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Header Box
  const headerBoxY = cardY + 40;
  const headerBoxH = 190;
  ctx.fillStyle = 'rgba(10, 48, 47, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, headerBoxY, cardW - 120, headerBoxH, [24]);
  ctx.fill();
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px "Georgia", serif';
  ctx.fillText('ICT POLICIES', 800, headerBoxY + 110);

  ctx.fillStyle = '#2dd4bf';
  ctx.font = 'bold 30px "Segoe UI", sans-serif';
  ctx.fillText('POLICIES 1 & 2 • DEFINITIONS & REGULATORY GUIDELINES', 800, headerBoxY + 158);

  const items = [
    {
      num: '1',
      title: 'DATA PRIVACY',
      color: '#38bdf8',
      def: 'Regulates how personal data is collected, stored, and shared, safeguarding confidential records, identities, and passwords from unauthorized disclosure or surveillance.',
      points: [
        '• Explicit consent required before collecting personal identifiable information.',
        '• Protection against unauthorized corporate surveillance and unauthorized sharing.',
        '• Compliance with the Data Privacy Act and institutional security protocols.',
      ],
    },
    {
      num: '2',
      title: 'ANTI-CYBERCRIME',
      color: '#2dd4bf',
      def: 'Enforces legal safeguards and technical security measures against illegal system intrusions, malicious hacking, identity theft, malware distribution, and cyber offenses.',
      points: [
        '• Strict prohibition against hacking, unauthorized access, and credential cracking.',
        '• Implementation of multi-factor authentication, firewalls, and active encryption.',
        '• Legal accountability and criminal penalties for cyber offenses.',
      ],
    },
  ];

  const rowStartY = cardY + 260;
  const rowH = 970;
  const rowGap = 50;

  items.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(10, 48, 47, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [28]);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Left Stripe
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 18, rowH, [28, 0, 0, 28]);
    ctx.fill();

    // Number Badge
    ctx.beginPath();
    ctx.roundRect(cardX + 110, rY + 45, 120, 120, [20]);
    ctx.fill();

    ctx.fillStyle = '#041f1e';
    ctx.font = 'bold 64px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 170, rY + 128);

    // Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Georgia", serif';
    ctx.fillText(item.title, cardX + 260, rY + 125);

    // Definition Label
    ctx.fillStyle = item.color;
    ctx.font = 'bold 28px "Segoe UI", sans-serif';
    ctx.fillText('DEFINITION:', cardX + 110, rY + 210);

    ctx.strokeStyle = item.color + '40';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cardX + 110, rY + 230);
    ctx.lineTo(cardX + cardW - 110, rY + 230);
    ctx.stroke();

    // Definition Text
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '38px "Segoe UI", sans-serif';
    wrapText(ctx, item.def, cardX + 110, rY + 285, cardW - 220, 56);

    // Key Guidelines Sub-Box
    const subBoxY = rY + 540;
    const subBoxH = 390;
    ctx.fillStyle = 'rgba(5, 26, 25, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 110, subBoxY, cardW - 220, subBoxH, [20]);
    ctx.fill();
    ctx.strokeStyle = item.color + '35';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = item.color;
    ctx.font = 'bold 30px "Segoe UI", sans-serif';
    ctx.fillText('KEY PRINCIPLES & SAFEGUARDS:', cardX + 140, subBoxY + 55);

    item.points.forEach((pt, pIdx) => {
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '32px "Segoe UI", sans-serif';
      ctx.fillText(pt, cardX + 140, subBoxY + 125 + pIdx * 70);
    });
  });

  return canvas;
}

// PANEL 4: 3. COPYRIGHT, 4. RESPONSIBLE USE OF TECHNOLOGY
export function createPanel4Policies2Canvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#041f1e');
  bgGrad.addColorStop(0.5, '#073332');
  bgGrad.addColorStop(1, '#031716');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(20, 184, 166, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(7, 36, 35, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Header Box
  const headerBoxY = cardY + 40;
  const headerBoxH = 190;
  ctx.fillStyle = 'rgba(10, 48, 47, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, headerBoxY, cardW - 120, headerBoxH, [24]);
  ctx.fill();
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px "Georgia", serif';
  ctx.fillText('ICT POLICIES', 800, headerBoxY + 110);

  ctx.fillStyle = '#2dd4bf';
  ctx.font = 'bold 30px "Segoe UI", sans-serif';
  ctx.fillText('POLICIES 3 & 4 • DEFINITIONS & REGULATORY GUIDELINES', 800, headerBoxY + 158);

  const items = [
    {
      num: '3',
      title: 'COPYRIGHT',
      color: '#facc15',
      def: 'Protects original digital, artistic, and literary creations, granting exclusive rights to creators while requiring proper attribution and prohibiting digital piracy.',
      points: [
        '• Always give lawful attribution and citation to original creators and authors.',
        '• Observe educational Fair Use guidelines when quoting academic materials.',
        '• Zero tolerance for pirated software, cracked apps, and stolen media.',
      ],
    },
    {
      num: '4',
      title: 'RESPONSIBLE USE OF TECH',
      color: '#c084fc',
      def: 'Outlines standards for ethical digital citizenship, academic integrity, respect for community guidelines, and constructive use of technology devices and networks.',
      points: [
        '• Promote respectful, empathetic, and constructive communication online.',
        '• Utilize devices and network resources purposefully for education and growth.',
        '• Avoid digital plagiarism, academic dishonesty, and malicious network abuse.',
      ],
    },
  ];

  const rowStartY = cardY + 260;
  const rowH = 970;
  const rowGap = 50;

  items.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(10, 48, 47, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [28]);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Left Stripe
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 18, rowH, [28, 0, 0, 28]);
    ctx.fill();

    // Number Badge
    ctx.beginPath();
    ctx.roundRect(cardX + 110, rY + 45, 120, 120, [20]);
    ctx.fill();

    ctx.fillStyle = '#041f1e';
    ctx.font = 'bold 64px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 170, rY + 128);

    // Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 58px "Georgia", serif';
    ctx.fillText(item.title, cardX + 260, rY + 125);

    // Definition Label
    ctx.fillStyle = item.color;
    ctx.font = 'bold 28px "Segoe UI", sans-serif';
    ctx.fillText('DEFINITION:', cardX + 110, rY + 210);

    ctx.strokeStyle = item.color + '40';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cardX + 110, rY + 230);
    ctx.lineTo(cardX + cardW - 110, rY + 230);
    ctx.stroke();

    // Definition Text
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '38px "Segoe UI", sans-serif';
    wrapText(ctx, item.def, cardX + 110, rY + 285, cardW - 220, 56);

    // Key Guidelines Sub-Box
    const subBoxY = rY + 540;
    const subBoxH = 390;
    ctx.fillStyle = 'rgba(5, 26, 25, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 110, subBoxY, cardW - 220, subBoxH, [20]);
    ctx.fill();
    ctx.strokeStyle = item.color + '35';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = item.color;
    ctx.font = 'bold 30px "Segoe UI", sans-serif';
    ctx.fillText('KEY PRINCIPLES & CITIZENSHIP:', cardX + 140, subBoxY + 55);

    item.points.forEach((pt, pIdx) => {
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '32px "Segoe UI", sans-serif';
      ctx.fillText(pt, cardX + 140, subBoxY + 125 + pIdx * 70);
    });
  });

  return canvas;
}

// PANEL 5: ICT ISSUES (ONLY the title ICT ISSUES - no category definitions)
export function createPanel5IssuesHeaderCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#220811');
  bgGrad.addColorStop(0.5, '#3b0e1e');
  bgGrad.addColorStop(1, '#17040a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(244, 63, 94, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(40, 11, 21, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  const boxY = cardY + 580;
  const boxH = 1100;
  ctx.fillStyle = 'rgba(54, 15, 28, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 80, boxY, cardW - 160, boxH, [40]);
  ctx.fill();
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(cardX + 110, boxY + 30, cardW - 220, boxH - 60, [30]);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 120px "Georgia", serif';
  ctx.fillText('ICT ISSUES', 800, boxY + 580);

  return canvas;
}

// PANEL 6: 1. CYBERBULLYING, 2. FAKE NEWS
export function createPanel6Issues1Canvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#220811');
  bgGrad.addColorStop(0.5, '#3b0e1e');
  bgGrad.addColorStop(1, '#17040a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(244, 63, 94, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(40, 11, 21, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Header Box
  const headerBoxY = cardY + 40;
  const headerBoxH = 190;
  ctx.fillStyle = 'rgba(54, 15, 28, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, headerBoxY, cardW - 120, headerBoxH, [24]);
  ctx.fill();
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px "Georgia", serif';
  ctx.fillText('ICT ISSUES', 800, headerBoxY + 110);

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 30px "Segoe UI", sans-serif';
  ctx.fillText('ISSUES 1 & 2 • DEFINITIONS & SOCIAL IMPACT', 800, headerBoxY + 158);

  const items = [
    {
      num: '1',
      title: 'CYBERBULLYING',
      color: '#f43f5e',
      def: 'The repeated and deliberate use of digital communication, messaging platforms, and social media to harass, threaten, intimidate, or humiliate peers online.',
      points: [
        '• Spreading defamatory rumors, fabricated photos, or private texts online.',
        '• Leads to severe psychological distress, anxiety, and social isolation.',
        '• Importance of bystander intervention, evidence recording, and reporting.',
      ],
    },
    {
      num: '2',
      title: 'FAKE NEWS',
      color: '#fb923c',
      def: 'Fabricated, deceptive, or deliberately distorted stories and headlines distributed across digital platforms to mislead the public, manipulate opinions, or cause alarm.',
      points: [
        '• Sensational clickbait engineered to exploit emotional confirmation bias.',
        '• Algorithmic echo chambers causing dangerous falsehoods to spread virally.',
        '• Critical defense: cross-check authors, publication dates, and primary sources.',
      ],
    },
  ];

  const rowStartY = cardY + 260;
  const rowH = 970;
  const rowGap = 50;

  items.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(54, 15, 28, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [28]);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Left Stripe
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 18, rowH, [28, 0, 0, 28]);
    ctx.fill();

    // Number Badge
    ctx.beginPath();
    ctx.roundRect(cardX + 110, rY + 45, 120, 120, [20]);
    ctx.fill();

    ctx.fillStyle = '#220811';
    ctx.font = 'bold 64px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 170, rY + 128);

    // Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Georgia", serif';
    ctx.fillText(item.title, cardX + 260, rY + 125);

    // Definition Label
    ctx.fillStyle = item.color;
    ctx.font = 'bold 28px "Segoe UI", sans-serif';
    ctx.fillText('DEFINITION:', cardX + 110, rY + 210);

    ctx.strokeStyle = item.color + '40';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cardX + 110, rY + 230);
    ctx.lineTo(cardX + cardW - 110, rY + 230);
    ctx.stroke();

    // Definition Text
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '38px "Segoe UI", sans-serif';
    wrapText(ctx, item.def, cardX + 110, rY + 285, cardW - 220, 56);

    // Key Impacts Sub-Box
    const subBoxY = rY + 540;
    const subBoxH = 390;
    ctx.fillStyle = 'rgba(20, 5, 10, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 110, subBoxY, cardW - 220, subBoxH, [20]);
    ctx.fill();
    ctx.strokeStyle = item.color + '35';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = item.color;
    ctx.font = 'bold 30px "Segoe UI", sans-serif';
    ctx.fillText('CHARACTERISTICS & SOCIAL IMPACT:', cardX + 140, subBoxY + 55);

    item.points.forEach((pt, pIdx) => {
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '32px "Segoe UI", sans-serif';
      ctx.fillText(pt, cardX + 140, subBoxY + 125 + pIdx * 70);
    });
  });

  return canvas;
}

// PANEL 7: 3. INTERNET ADDICTION, 4. PRIVACY ISSUES
export function createPanel7Issues2Canvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#220811');
  bgGrad.addColorStop(0.5, '#3b0e1e');
  bgGrad.addColorStop(1, '#17040a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(244, 63, 94, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(40, 11, 21, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Header Box
  const headerBoxY = cardY + 40;
  const headerBoxH = 190;
  ctx.fillStyle = 'rgba(54, 15, 28, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, headerBoxY, cardW - 120, headerBoxH, [24]);
  ctx.fill();
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px "Georgia", serif';
  ctx.fillText('ICT ISSUES', 800, headerBoxY + 110);

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 30px "Segoe UI", sans-serif';
  ctx.fillText('ISSUES 3 & 4 • DEFINITIONS & SOCIAL IMPACT', 800, headerBoxY + 158);

  const items = [
    {
      num: '3',
      title: 'INTERNET ADDICTION',
      color: '#facc15',
      def: 'Compulsive, excessive screen time and digital device dependency that damages daily routines, sleep quality, physical health, and academic concentration.',
      points: [
        '• Dopamine loops driven by algorithmic infinite-scroll feeds and obsessive gaming.',
        '• Sedentary lifestyle complications, visual strain, and chronic sleep deprivation.',
        '• Counter-measures: daily digital timeouts, screen limits, and offline activities.',
      ],
    },
    {
      num: '4',
      title: 'PRIVACY ISSUES',
      color: '#e879f9',
      def: 'Security vulnerabilities, unauthorized personal data harvesting, surveillance, and identity disclosures that compromise user rights and confidential information.',
      points: [
        '• Doxxing, unpermitted data sharing, and confidential conversation leaks.',
        '• Invasive telemetry, third-party data broker profiling, and identity theft.',
        '• Critical defense: strong passwords, private browsing, and access permission checks.',
      ],
    },
  ];

  const rowStartY = cardY + 260;
  const rowH = 970;
  const rowGap = 50;

  items.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(54, 15, 28, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [28]);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Left Stripe
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 18, rowH, [28, 0, 0, 28]);
    ctx.fill();

    // Number Badge
    ctx.beginPath();
    ctx.roundRect(cardX + 110, rY + 45, 120, 120, [20]);
    ctx.fill();

    ctx.fillStyle = '#220811';
    ctx.font = 'bold 64px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 170, rY + 128);

    // Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Georgia", serif';
    ctx.fillText(item.title, cardX + 260, rY + 125);

    // Definition Label
    ctx.fillStyle = item.color;
    ctx.font = 'bold 28px "Segoe UI", sans-serif';
    ctx.fillText('DEFINITION:', cardX + 110, rY + 210);

    ctx.strokeStyle = item.color + '40';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cardX + 110, rY + 230);
    ctx.lineTo(cardX + cardW - 110, rY + 230);
    ctx.stroke();

    // Definition Text
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '38px "Segoe UI", sans-serif';
    wrapText(ctx, item.def, cardX + 110, rY + 285, cardW - 220, 56);

    // Key Impacts Sub-Box
    const subBoxY = rY + 540;
    const subBoxH = 390;
    ctx.fillStyle = 'rgba(20, 5, 10, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 110, subBoxY, cardW - 220, subBoxH, [20]);
    ctx.fill();
    ctx.strokeStyle = item.color + '35';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = item.color;
    ctx.font = 'bold 30px "Segoe UI", sans-serif';
    ctx.fillText('CHARACTERISTICS & SOCIAL IMPACT:', cardX + 140, subBoxY + 55);

    item.points.forEach((pt, pIdx) => {
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '32px "Segoe UI", sans-serif';
      ctx.fillText(pt, cardX + 140, subBoxY + 125 + pIdx * 70);
    });
  });

  return canvas;
}

// ==========================================
// BACK PANELS (PANELS 1 - 7 WHEN FLIPPED)
// Symmetrical reflection of the paper
// ==========================================

export function createPanel1BackCanvas(): HTMLCanvasElement {
  return createPanel7Issues2Canvas();
}

export function createPanel2BackCanvas(): HTMLCanvasElement {
  return createPanel6Issues1Canvas();
}

export function createPanel3BackCanvas(): HTMLCanvasElement {
  return createPanel5IssuesHeaderCanvas();
}

export function createPanel4BackCanvas(): HTMLCanvasElement {
  return createPanel4Policies2Canvas();
}

export function createPanel5BackCanvas(): HTMLCanvasElement {
  return createPanel3Policies1Canvas();
}

export function createPanel6BackCanvas(): HTMLCanvasElement {
  return createPanel2DefinitionCanvas();
}

export function createPanel7BackCanvas(): HTMLCanvasElement {
  return createPanel1CoverCanvas();
}
