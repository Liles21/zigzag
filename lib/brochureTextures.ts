// High-Resolution 5-Panel Canvas Texture Generator for Zigzag Accordion Brochure
// STRICT REQUIREMENT: ONLY what is in the paper. NO MEANINGS, NO PARAGRAPH DESCRIPTIONS, NO EMOJIS.
//
// 1. Members:
//    Romacula, Romnick
//    Ramal, Jenelly
//    Timbal, Angela
//    Precioso, Rosemarie
//    Sanchez, Jocine
//    Tabugon, Rhea Jane
//    Sabado, Charlene
//    Quijas, Jeramel
//
// 2. Title: ICT POLICIES AND ISSUES
// 3. DEFINITION
// 4. ICT POLICIES:
//    1. DATA PRIVACY
//    2. ANTI-CYBERCRIME
//    3. COPYRIGHT
//    4. RESPONSIBLE USE OF TECHNOLOGY
//
// 5. ICT ISSUES:
//    1. CYBERBULLYING
//    2. FAKE NEWS
//    3. INTERNET ADDICTION
//    4. PRIVACY ISSUES

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

// ==========================================
// FRONT PANELS (PANELS 1 - 5)
// ==========================================

// PANEL 1: Cover Frontpage (Title & Members)
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

  // Outer border trim
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  // Card Container
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Top Title Box
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

  // 8 Members Rows
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

    // Number Badge
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(cardX + 140, rY + 35, 75, 75, [16]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${idx + 1}`, cardX + 177, rY + 88);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 50px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(name, cardX + 260, rY + 90);
  });

  return canvas;
}

// PANEL 2: DEFINITION (ONLY the title DEFINITION, no meanings)
export function createPanel2DefinitionCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background gradient: Deep Indigo/Purple
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

  // Central Card: DEFINITION (Clean, Bold, Grand Title - NO MEANINGS)
  const boxY = cardY + 580;
  const boxH = 1100;
  ctx.fillStyle = 'rgba(30, 17, 69, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 80, boxY, cardW - 160, boxH, [40]);
  ctx.fill();
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Decorative Inner Border
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(cardX + 110, boxY + 30, cardW - 220, boxH - 60, [30]);
  ctx.stroke();

  // Big Bold Title: DEFINITION
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 120px "Georgia", serif';
  ctx.fillText('DEFINITION', 800, boxY + 480);

  // Decorative Accent Bar
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.roundRect(800 - 240, boxY + 540, 480, 12, [6]);
  ctx.fill();

  ctx.fillStyle = '#e9d5ff';
  ctx.font = 'bold 44px "Segoe UI", sans-serif';
  ctx.fillText('ICT POLICIES AND ISSUES', 800, boxY + 640);

  return canvas;
}

// PANEL 3: ICT POLICIES (1. DATA PRIVACY, 2. ANTI-CYBERCRIME, 3. COPYRIGHT, 4. RESPONSIBLE USE OF TECHNOLOGY - NO MEANINGS)
export function createPanel3PoliciesCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background gradient: Deep Teal / Emerald Navy
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

  // Header Box: ICT POLICIES
  const headerBoxY = cardY + 70;
  ctx.fillStyle = 'rgba(10, 48, 47, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, headerBoxY, cardW - 120, 220, [28]);
  ctx.fill();
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 96px "Georgia", serif';
  ctx.fillText('ICT POLICIES', 800, headerBoxY + 145);

  // The 4 Items from the Paper
  const items = [
    { num: '1', title: 'DATA PRIVACY', color: '#38bdf8' },
    { num: '2', title: 'ANTI-CYBERCRIME', color: '#2dd4bf' },
    { num: '3', title: 'COPYRIGHT', color: '#facc15' },
    { num: '4', title: 'RESPONSIBLE USE OF TECHNOLOGY', color: '#c084fc' },
  ];

  const rowStartY = cardY + 350;
  const rowH = 430;
  const rowGap = 40;

  items.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(10, 48, 47, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [28]);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Accent Left Bar
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 18, rowH, [28, 0, 0, 28]);
    ctx.fill();

    // Large Number Badge
    ctx.beginPath();
    ctx.roundRect(cardX + 130, rY + (rowH - 140) / 2, 140, 140, [24]);
    ctx.fill();

    ctx.fillStyle = '#041f1e';
    ctx.font = 'bold 74px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 200, rY + (rowH - 140) / 2 + 98);

    // Title Only (NO MEANINGS)
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';

    if (item.title.length > 20) {
      // Two-line layout for longer title: RESPONSIBLE USE OF TECHNOLOGY
      ctx.font = 'bold 56px "Georgia", serif';
      ctx.fillText('RESPONSIBLE USE', cardX + 320, rY + rowH / 2 - 20);
      ctx.fillText('OF TECHNOLOGY', cardX + 320, rY + rowH / 2 + 55);
    } else {
      ctx.font = 'bold 64px "Georgia", serif';
      ctx.fillText(item.title, cardX + 320, rY + rowH / 2 + 22);
    }
  });

  return canvas;
}

// PANEL 4: ICT ISSUES (1. CYBERBULLYING, 2. FAKE NEWS, 3. INTERNET ADDICTION, 4. PRIVACY ISSUES - NO MEANINGS)
export function createPanel4IssuesCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background gradient: Deep Crimson / Wine Dark
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

  // Header Box: ICT ISSUES
  const headerBoxY = cardY + 70;
  ctx.fillStyle = 'rgba(54, 15, 28, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, headerBoxY, cardW - 120, 220, [28]);
  ctx.fill();
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 96px "Georgia", serif';
  ctx.fillText('ICT ISSUES', 800, headerBoxY + 145);

  // The 4 Items from the Paper
  const items = [
    { num: '1', title: 'CYBERBULLYING', color: '#f43f5e' },
    { num: '2', title: 'FAKE NEWS', color: '#fb923c' },
    { num: '3', title: 'INTERNET ADDICTION', color: '#facc15' },
    { num: '4', title: 'PRIVACY ISSUES', color: '#e879f9' },
  ];

  const rowStartY = cardY + 350;
  const rowH = 430;
  const rowGap = 40;

  items.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(54, 15, 28, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [28]);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Accent Left Bar
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 18, rowH, [28, 0, 0, 28]);
    ctx.fill();

    // Large Number Badge
    ctx.beginPath();
    ctx.roundRect(cardX + 130, rY + (rowH - 140) / 2, 140, 140, [24]);
    ctx.fill();

    ctx.fillStyle = '#220811';
    ctx.font = 'bold 74px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 200, rY + (rowH - 140) / 2 + 98);

    // Title Only (NO MEANINGS)
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Georgia", serif';
    ctx.fillText(item.title, cardX + 320, rY + rowH / 2 + 22);
  });

  return canvas;
}

// PANEL 5: SUMMARY (NO DUPLICATE MEMBERS, NO MEANINGS)
export function createPanel5ConclusionCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background gradient: Deep Royal Navy
  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#090f1e');
  bgGrad.addColorStop(0.5, '#152445');
  bgGrad.addColorStop(1, '#080d19');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  ctx.fillStyle = 'rgba(15, 26, 52, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Top Header: ICT POLICIES AND ISSUES
  const headerBoxY = cardY + 70;
  ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, headerBoxY, cardW - 120, 260, [28]);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 84px "Georgia", serif';
  ctx.fillText('ICT POLICIES AND ISSUES', 800, headerBoxY + 115);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 44px "Segoe UI", sans-serif';
  ctx.fillText('GROUP 6', 800, headerBoxY + 200);

  // 2 Side-by-Side Columns taking the full height (NO MEMBERS HERE)
  const colBoxY = cardY + 370;
  const colBoxH = 1780;
  const halfW = (cardW - 150) / 2;

  // Left Column: ICT POLICIES
  ctx.fillStyle = 'rgba(7, 36, 35, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, colBoxY, halfW, colBoxH, [28]);
  ctx.fill();
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#2dd4bf';
  ctx.font = 'bold 54px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('ICT POLICIES', cardX + 60 + halfW / 2, colBoxY + 95);

  ctx.strokeStyle = 'rgba(45, 212, 191, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 110, colBoxY + 130);
  ctx.lineTo(cardX + 60 + halfW - 50, colBoxY + 130);
  ctx.stroke();

  const polItems = [
    { num: '1', title: 'DATA PRIVACY' },
    { num: '2', title: 'ANTI-CYBERCRIME' },
    { num: '3', title: 'COPYRIGHT' },
    { num: '4', title: 'RESPONSIBLE USE OF TECHNOLOGY' },
  ];

  const itemStartY = colBoxY + 170;
  const itemH = 360;
  const itemGap = 35;

  polItems.forEach((item, i) => {
    const itemY = itemStartY + i * (itemH + itemGap);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 90, itemY, halfW - 60, itemH, [20]);
    ctx.fill();

    ctx.strokeStyle = '#2dd4bf';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Number Badge
    ctx.fillStyle = '#0f766e';
    ctx.beginPath();
    ctx.roundRect(cardX + 120, itemY + 30, 80, 80, [16]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 160, itemY + 86);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';

    if (item.title.length > 20) {
      ctx.font = 'bold 40px "Georgia", serif';
      ctx.fillText('RESPONSIBLE USE', cardX + 120, itemY + 190);
      ctx.fillText('OF TECHNOLOGY', cardX + 120, itemY + 250);
    } else {
      ctx.font = 'bold 44px "Georgia", serif';
      ctx.fillText(item.title, cardX + 120, itemY + 220);
    }
  });

  // Right Column: ICT ISSUES
  ctx.fillStyle = 'rgba(40, 11, 21, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 90 + halfW, colBoxY, halfW, colBoxH, [28]);
  ctx.fill();
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 54px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('ICT ISSUES', cardX + 90 + halfW + halfW / 2, colBoxY + 95);

  ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 140 + halfW, colBoxY + 130);
  ctx.lineTo(cardX + 90 + halfW + halfW - 50, colBoxY + 130);
  ctx.stroke();

  const issItems = [
    { num: '1', title: 'CYBERBULLYING' },
    { num: '2', title: 'FAKE NEWS' },
    { num: '3', title: 'INTERNET ADDICTION' },
    { num: '4', title: 'PRIVACY ISSUES' },
  ];

  issItems.forEach((item, i) => {
    const itemY = itemStartY + i * (itemH + itemGap);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 120 + halfW, itemY, halfW - 60, itemH, [20]);
    ctx.fill();

    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Number Badge
    ctx.fillStyle = '#be123c';
    ctx.beginPath();
    ctx.roundRect(cardX + 150 + halfW, itemY + 30, 80, 80, [16]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 190 + halfW, itemY + 86);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.font = 'bold 44px "Georgia", serif';
    ctx.fillText(item.title, cardX + 150 + halfW, itemY + 220);
  });

  return canvas;
}

// ==========================================
// BACK PANELS (PANELS 1 - 5 WHEN FLIPPED)
// Exactly mirroring the same paper structure
// ==========================================

export function createPanel1BackCanvas(): HTMLCanvasElement {
  return createPanel5ConclusionCanvas();
}

export function createPanel2BackCanvas(): HTMLCanvasElement {
  return createPanel4IssuesCanvas();
}

export function createPanel3BackCanvas(): HTMLCanvasElement {
  return createPanel3PoliciesCanvas();
}

export function createPanel4BackCanvas(): HTMLCanvasElement {
  return createPanel2DefinitionCanvas();
}

export function createPanel5BackCanvas(): HTMLCanvasElement {
  return createPanel1CoverCanvas();
}
