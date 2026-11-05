// High-Resolution 7-Panel Dynamic Canvas Texture Generator for Zigzag Accordion Brochure
// STRICT REQUIREMENT: Exactly follows the 7-segment construct of the hand-drawn paper brochure (NO MEANINGS, NO PARAGRAPHS, NO EMOJIS).
//
// Construct on Paper:
// Panel 1: ICT POLICIES AND ISSUES (with Members)
// Panel 2: DEFINITION
// Panel 3: ICT POLICIES (1. DATA PRIVACY, 2. ANTI-CYBERCRIME)
// Panel 4: 3. COPYRIGHT, 4. RESPONSIBLE USE OF TECHNOLOGY
// Panel 5: ICT ISSUES
// Panel 6: 1. CYBERBULLYING, 2. FAKE NEWS
// Panel 7: 3. INTERNET ADDICTION, 4. PRIVACY ISSUES

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

// PANEL 2: DEFINITION (ONLY the word DEFINITION)
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

  // Header Box: ICT POLICIES
  const headerBoxY = cardY + 120;
  ctx.fillStyle = 'rgba(10, 48, 47, 0.9)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, headerBoxY, cardW - 120, 280, [28]);
  ctx.fill();
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 96px "Georgia", serif';
  ctx.fillText('ICT POLICIES', 800, headerBoxY + 175);

  // Items 1 & 2
  const items = [
    { num: '1', title: 'DATA PRIVACY', color: '#38bdf8' },
    { num: '2', title: 'ANTI-CYBERCRIME', color: '#2dd4bf' },
  ];

  const rowStartY = cardY + 540;
  const rowH = 680;
  const rowGap = 80;

  items.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(10, 48, 47, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [28]);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 20, rowH, [28, 0, 0, 28]);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(cardX + 130, rY + (rowH - 180) / 2, 180, 180, [28]);
    ctx.fill();

    ctx.fillStyle = '#041f1e';
    ctx.font = 'bold 96px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 220, rY + (rowH - 180) / 2 + 125);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 74px "Georgia", serif';
    ctx.fillText(item.title, cardX + 360, rY + rowH / 2 + 25);
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

  // Items 3 & 4
  const items = [
    { num: '3', title: 'COPYRIGHT', color: '#facc15' },
    { num: '4', title: 'RESPONSIBLE USE OF TECHNOLOGY', color: '#c084fc' },
  ];

  const rowStartY = cardY + 280;
  const rowH = 780;
  const rowGap = 140;

  items.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(10, 48, 47, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [28]);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 20, rowH, [28, 0, 0, 28]);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(cardX + 130, rY + (rowH - 180) / 2, 180, 180, [28]);
    ctx.fill();

    ctx.fillStyle = '#041f1e';
    ctx.font = 'bold 96px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 220, rY + (rowH - 180) / 2 + 125);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';

    if (item.title.length > 15) {
      ctx.font = 'bold 64px "Georgia", serif';
      ctx.fillText('RESPONSIBLE USE', cardX + 360, rY + rowH / 2 - 25);
      ctx.fillText('OF TECHNOLOGY', cardX + 360, rY + rowH / 2 + 65);
    } else {
      ctx.font = 'bold 74px "Georgia", serif';
      ctx.fillText(item.title, cardX + 360, rY + rowH / 2 + 25);
    }
  });

  return canvas;
}

// PANEL 5: ICT ISSUES (ONLY the title ICT ISSUES)
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

  const items = [
    { num: '1', title: 'CYBERBULLYING', color: '#f43f5e' },
    { num: '2', title: 'FAKE NEWS', color: '#fb923c' },
  ];

  const rowStartY = cardY + 280;
  const rowH = 780;
  const rowGap = 140;

  items.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(54, 15, 28, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [28]);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 20, rowH, [28, 0, 0, 28]);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(cardX + 130, rY + (rowH - 180) / 2, 180, 180, [28]);
    ctx.fill();

    ctx.fillStyle = '#220811';
    ctx.font = 'bold 96px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 220, rY + (rowH - 180) / 2 + 125);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 74px "Georgia", serif';
    ctx.fillText(item.title, cardX + 360, rY + rowH / 2 + 25);
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

  const items = [
    { num: '3', title: 'INTERNET ADDICTION', color: '#facc15' },
    { num: '4', title: 'PRIVACY ISSUES', color: '#e879f9' },
  ];

  const rowStartY = cardY + 280;
  const rowH = 780;
  const rowGap = 140;

  items.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(54, 15, 28, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [28]);
    ctx.fill();

    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 20, rowH, [28, 0, 0, 28]);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(cardX + 130, rY + (rowH - 180) / 2, 180, 180, [28]);
    ctx.fill();

    ctx.fillStyle = '#220811';
    ctx.font = 'bold 96px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 220, rY + (rowH - 180) / 2 + 125);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';

    if (item.title.length > 16) {
      ctx.font = 'bold 64px "Georgia", serif';
      ctx.fillText('INTERNET', cardX + 360, rY + rowH / 2 - 25);
      ctx.fillText('ADDICTION', cardX + 360, rY + rowH / 2 + 65);
    } else {
      ctx.font = 'bold 74px "Georgia", serif';
      ctx.fillText(item.title, cardX + 360, rY + rowH / 2 + 25);
    }
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
