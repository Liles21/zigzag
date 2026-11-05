// High-Resolution 5-Panel Canvas Texture Generator for Zigzag Accordion Brochure
// STRICT CONTENT REQUIREMENT: ONLY contains what is on the official project paper (NO EXTRA FLUFF, NO EMOJIS).
// Content:
// 1. Members (Romacula, Ramal, Timbal, Precioso, Sanchez, Tabugon, Sabado, Quijas)
// 2. Title: ICT POLICIES AND ISSUES
// 3. DEFINITION
// 4. ICT POLICIES (1. Data Privacy, 2. Anti-Cybercrime, 3. Copyright, 4. Responsible Use of Technology)
// 5. ICT ISSUES (1. Cyberbullying, 2. Fake News, 3. Internet Addiction, 4. Privacy Issues)

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

// Helper: Wrap text onto canvas
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
// FRONT PANELS (PANELS 1 - 5)
// ==========================================

// PANEL 1: Cover Frontpage (Title & Official Members List)
export function createPanel1CoverCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background gradient: Deep Navy/Slate
  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#0c1322');
  bgGrad.addColorStop(0.5, '#162035');
  bgGrad.addColorStop(1, '#090d18');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  // Outer border trim
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1520, 2320);

  const cardX = 70;
  const cardY = 70;
  const cardW = 1460;
  const cardH = 2260;

  // Main Card Container
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, [36]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Top Badge
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 280, 50, [25]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GROUP 6 PORTFOLIO', cardX + 200, cardY + 94);

  // Big Presentation Title: ICT POLICIES AND ISSUES
  const titleBoxY = cardY + 160;
  ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, titleBoxY, cardW - 120, 360, [28]);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 92px "Georgia", serif';
  ctx.fillText('ICT POLICIES', 800, titleBoxY + 140);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 54px "Segoe UI", sans-serif';
  ctx.fillText('AND', 800, titleBoxY + 225);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 92px "Georgia", serif';
  ctx.fillText('ISSUES', 800, titleBoxY + 315);

  // Section Header: Members
  const memberSectionY = cardY + 580;
  ctx.fillStyle = 'rgba(14, 165, 233, 0.2)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, memberSectionY, cardW - 120, 1560, [28]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 44px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MEMBERS', 800, memberSectionY + 80);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 160, memberSectionY + 115);
  ctx.lineTo(cardX + cardW - 160, memberSectionY + 115);
  ctx.stroke();

  // 8 Members Rows (Exactly as on paper)
  const rowStartY = memberSectionY + 155;
  const rowH = 135;
  const rowGap = 28;

  OFFICIAL_MEMBERS.forEach((name, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 110, rY, cardW - 220, rowH, [20]);
    ctx.fill();

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Number Badge
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(cardX + 150, rY + 32, 70, 70, [16]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${idx + 1}`, cardX + 185, rY + 80);

    // Member Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 46px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(name, cardX + 260, rY + 82);
  });

  return canvas;
}

// PANEL 2: DEFINITION
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

  ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
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
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = '#7e22ce';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 260, 50, [25]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CORE CONCEPT', cardX + 190, cardY + 94);

  // Main Header: DEFINITION
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 88px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('DEFINITION', cardX + 60, cardY + 210);

  ctx.fillStyle = '#c084fc';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('Understanding the foundation of ICT Policies and ICT Issues', cardX + 60, cardY + 270);

  ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 315);
  ctx.lineTo(cardX + cardW - 60, cardY + 315);
  ctx.stroke();

  // 1. Definition Card: ICT POLICIES
  const card1Y = cardY + 370;
  ctx.fillStyle = 'rgba(30, 17, 69, 0.85)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, card1Y, cardW - 120, 840, [28]);
  ctx.fill();
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Badge
  ctx.fillStyle = '#9333ea';
  ctx.beginPath();
  ctx.roundRect(cardX + 110, card1Y + 60, 320, 56, [14]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('WHAT ARE THEY?', cardX + 270, card1Y + 98);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px "Georgia", serif';
  ctx.fillText('ICT Policies', cardX + 110, card1Y + 200);

  ctx.fillStyle = '#e9d5ff';
  ctx.font = '40px "Segoe UI", sans-serif';
  wrapText(
    ctx,
    'ICT Policies are official rules, legal regulations, institutional principles, and standardized guidelines established to govern, protect, and direct the proper, safe, and ethical use of Information and Communications Technology.',
    cardX + 110,
    card1Y + 280,
    cardW - 220,
    60
  );

  ctx.fillStyle = '#c084fc';
  ctx.font = 'bold 36px "Segoe UI", sans-serif';
  ctx.fillText('Primary Purpose:', cardX + 110, card1Y + 620);

  ctx.fillStyle = '#f3e8ff';
  ctx.font = '36px "Segoe UI", sans-serif';
  wrapText(
    ctx,
    'They establish accountability, safeguard sensitive personal data, enforce cybersecurity standards, and ensure technology is used for lawful and constructive purposes.',
    cardX + 110,
    card1Y + 680,
    cardW - 220,
    54
  );

  // 2. Definition Card: ICT ISSUES
  const card2Y = cardY + 1260;
  ctx.fillStyle = 'rgba(30, 17, 69, 0.85)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, card2Y, cardW - 120, 840, [28]);
  ctx.fill();
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Badge
  ctx.fillStyle = '#e11d48';
  ctx.beginPath();
  ctx.roundRect(cardX + 110, card2Y + 60, 320, 56, [14]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('WHAT ARE THEY?', cardX + 270, card2Y + 98);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px "Georgia", serif';
  ctx.fillText('ICT Issues', cardX + 110, card2Y + 200);

  ctx.fillStyle = '#ffe4e6';
  ctx.font = '40px "Segoe UI", sans-serif';
  wrapText(
    ctx,
    'ICT Issues refer to digital risks, ethical conflicts, harms, and social challenges that arise from the misuse, vulnerability, lack of regulation, or irresponsible application of computer systems, networks, and online platforms.',
    cardX + 110,
    card2Y + 280,
    cardW - 220,
    60
  );

  ctx.fillStyle = '#fb7185';
  ctx.font = 'bold 36px "Segoe UI", sans-serif';
  ctx.fillText('Key Consequences:', cardX + 110, card2Y + 620);

  ctx.fillStyle = '#fff1f2';
  ctx.font = '36px "Segoe UI", sans-serif';
  wrapText(
    ctx,
    'They jeopardize personal privacy, threaten psychological well-being, facilitate digital crime, spread misinformation, and compromise user security across society.',
    cardX + 110,
    card2Y + 680,
    cardW - 220,
    54
  );

  // Bottom Tagline
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '24px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Panel 2 • Definition • Group 6', 800, cardY + cardH - 35);

  return canvas;
}

// PANEL 3: ICT POLICIES (1. Data Privacy, 2. Anti-Cybercrime, 3. Copyright, 4. Responsible Use of Technology)
export function createPanel3PoliciesCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background gradient: Deep Teal/Emerald Navy
  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#041f1e');
  bgGrad.addColorStop(0.5, '#073332');
  bgGrad.addColorStop(1, '#031716');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)';
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
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 260, 50, [25]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL POLICIES', cardX + 190, cardY + 94);

  // Main Header: ICT POLICIES
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 88px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('ICT POLICIES', cardX + 60, cardY + 210);

  ctx.fillStyle = '#5eead4';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('The 4 Core Policies for Safe and Legal Technology Use', cardX + 60, cardY + 270);

  ctx.strokeStyle = 'rgba(20, 184, 166, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 315);
  ctx.lineTo(cardX + cardW - 60, cardY + 315);
  ctx.stroke();

  // The 4 Policies on the Paper
  const policies = [
    {
      num: '1',
      title: 'DATA PRIVACY',
      desc: 'Safeguards confidential personal information, identity records, and passwords against unauthorized collection, surveillance, exposure, or misuse by third parties.',
      accent: '#38bdf8',
    },
    {
      num: '2',
      title: 'ANTI-CYBERCRIME',
      desc: 'Enforces legal protections and security protocols against illegal system access, hacking, phishing, identity theft, malware distribution, and cyber offenses.',
      accent: '#2dd4bf',
    },
    {
      num: '3',
      title: 'COPYRIGHT',
      desc: 'Protects the intellectual property and exclusive rights of creators over original digital content, software, and media, strictly penalizing unauthorized digital piracy.',
      accent: '#facc15',
    },
    {
      num: '4',
      title: 'RESPONSIBLE USE OF TECHNOLOGY',
      desc: 'Mandates ethical conduct, positive digital citizenship, respect for community guidelines, and constructive utilization of devices and internet resources for learning.',
      accent: '#c084fc',
    },
  ];

  const rowStartY = cardY + 360;
  const rowH = 410;
  const rowGap = 30;

  policies.forEach((p, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(10, 48, 47, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [24]);
    ctx.fill();

    ctx.strokeStyle = p.accent;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Accent left stripe
    ctx.fillStyle = p.accent;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 14, rowH, [24, 0, 0, 24]);
    ctx.fill();

    // Number Box
    ctx.beginPath();
    ctx.roundRect(cardX + 110, rY + 45, 80, 80, [18]);
    ctx.fill();

    ctx.fillStyle = '#041f1e';
    ctx.font = 'bold 44px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(p.num, cardX + 150, rY + 102);

    // Policy Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px "Georgia", serif';
    ctx.fillText(p.title, cardX + 220, rY + 104);

    // Policy Description
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '36px "Segoe UI", sans-serif';
    wrapText(ctx, p.desc, cardX + 110, rY + 195, cardW - 220, 56);
  });

  // Bottom Tagline
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '24px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Panel 3 • ICT Policies • Group 6', 800, cardY + cardH - 35);

  return canvas;
}

// PANEL 4: ICT ISSUES (1. Cyberbullying, 2. Fake News, 3. Internet Addiction, 4. Privacy Issues)
export function createPanel4IssuesCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 2400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background gradient: Deep Wine/Crimson Dark
  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 2400);
  bgGrad.addColorStop(0, '#220811');
  bgGrad.addColorStop(0.5, '#3b0e1e');
  bgGrad.addColorStop(1, '#17040a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1600, 2400);

  ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
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
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = '#e11d48';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 260, 50, [25]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CRITICAL ISSUES', cardX + 190, cardY + 94);

  // Main Header: ICT ISSUES
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 88px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('ICT ISSUES', cardX + 60, cardY + 210);

  ctx.fillStyle = '#fda4af';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('The 4 Major Digital Challenges and Ethical Concerns', cardX + 60, cardY + 270);

  ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 315);
  ctx.lineTo(cardX + cardW - 60, cardY + 315);
  ctx.stroke();

  // The 4 Issues on the Paper
  const issues = [
    {
      num: '1',
      title: 'CYBERBULLYING',
      desc: 'The deliberate, repeated use of digital communication, messaging, and social media to harass, intimidate, insult, or humiliate others online.',
      accent: '#f43f5e',
    },
    {
      num: '2',
      title: 'FAKE NEWS',
      desc: 'False, fabricated, or deliberately misleading information spread across online platforms to manipulate opinions, deceive readers, or cause alarm.',
      accent: '#fb923c',
    },
    {
      num: '3',
      title: 'INTERNET ADDICTION',
      desc: 'Excessive, compulsive usage of digital devices and the internet that harms daily physical health, personal relationships, sleep, and academic focus.',
      accent: '#facc15',
    },
    {
      num: '4',
      title: 'PRIVACY ISSUES',
      desc: 'Vulnerabilities, data leaks, covert tracking, and unauthorized harvesting of personal data that expose confidential identity records without user consent.',
      accent: '#e879f9',
    },
  ];

  const rowStartY = cardY + 360;
  const rowH = 410;
  const rowGap = 30;

  issues.forEach((item, idx) => {
    const rY = rowStartY + idx * (rowH + rowGap);

    ctx.fillStyle = 'rgba(54, 15, 28, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, cardW - 120, rowH, [24]);
    ctx.fill();

    ctx.strokeStyle = item.accent;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Accent left stripe
    ctx.fillStyle = item.accent;
    ctx.beginPath();
    ctx.roundRect(cardX + 60, rY, 14, rowH, [24, 0, 0, 24]);
    ctx.fill();

    // Number Box
    ctx.beginPath();
    ctx.roundRect(cardX + 110, rY + 45, 80, 80, [18]);
    ctx.fill();

    ctx.fillStyle = '#220811';
    ctx.font = 'bold 44px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, cardX + 150, rY + 102);

    // Issue Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px "Georgia", serif';
    ctx.fillText(item.title, cardX + 220, rY + 104);

    // Issue Description
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '36px "Segoe UI", sans-serif';
    wrapText(ctx, item.desc, cardX + 110, rY + 195, cardW - 220, 56);
  });

  // Bottom Tagline
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '24px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Panel 4 • ICT Issues • Group 6', 800, cardY + cardH - 35);

  return canvas;
}

// PANEL 5: SUMMARY & GROUP CREDITS (Strictly summarizing the paper's contents)
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

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
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
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Top Pill
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, cardY + 60, 260, 50, [25]);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PORTFOLIO REVIEW', cardX + 190, cardY + 94);

  // Main Header: SUMMARY & CREDITS
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 84px "Georgia", serif';
  ctx.textAlign = 'left';
  ctx.fillText('ICT POLICIES & ISSUES', cardX + 60, cardY + 205);

  ctx.fillStyle = '#7dd3fc';
  ctx.font = '500 34px "Segoe UI", sans-serif';
  ctx.fillText('Presentation Portfolio Summary • Group 6', cardX + 60, cardY + 265);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, cardY + 310);
  ctx.lineTo(cardX + cardW - 60, cardY + 310);
  ctx.stroke();

  // Summary Comparison Box: 4 Policies vs 4 Issues
  const boxY = cardY + 355;
  const boxH = 760;

  // Left Sub-Box: 4 Policies
  const halfW = (cardW - 150) / 2;
  ctx.fillStyle = 'rgba(7, 36, 35, 0.85)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, boxY, halfW, boxH, [24]);
  ctx.fill();
  ctx.strokeStyle = '#2dd4bf';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#2dd4bf';
  ctx.font = 'bold 44px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('ICT POLICIES', cardX + 60 + halfW / 2, boxY + 80);

  const polList = [
    '1. Data Privacy',
    '2. Anti-Cybercrime',
    '3. Copyright',
    '4. Responsible Use of Technology',
  ];
  polList.forEach((text, i) => {
    const itemY = boxY + 160 + i * 135;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.beginPath();
    ctx.roundRect(cardX + 90, itemY, halfW - 60, 105, [16]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(text, cardX + 120, itemY + 65);
  });

  // Right Sub-Box: 4 Issues
  ctx.fillStyle = 'rgba(40, 11, 21, 0.85)';
  ctx.beginPath();
  ctx.roundRect(cardX + 90 + halfW, boxY, halfW, boxH, [24]);
  ctx.fill();
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 44px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('ICT ISSUES', cardX + 90 + halfW + halfW / 2, boxY + 80);

  const issList = [
    '1. Cyberbullying',
    '2. Fake News',
    '3. Internet Addiction',
    '4. Privacy Issues',
  ];
  issList.forEach((text, i) => {
    const itemY = boxY + 160 + i * 135;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.beginPath();
    ctx.roundRect(cardX + 120 + halfW, itemY, halfW - 60, 105, [16]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(text, cardX + 150 + halfW, itemY + 65);
  });

  // Bottom Box: Official Members Acknowledgement
  const creditsY = cardY + 1160;
  const creditsH = 1040;
  ctx.fillStyle = 'rgba(21, 35, 68, 0.85)';
  ctx.beginPath();
  ctx.roundRect(cardX + 60, creditsY, cardW - 120, creditsH, [28]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 46px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL GROUP 6 MEMBERS', 800, creditsY + 80);

  // 8 Members in 2 Columns of 4 rows
  const colW = (cardW - 200) / 2;
  const colStartY = creditsY + 140;
  const mRowH = 165;
  const mGap = 24;

  OFFICIAL_MEMBERS.forEach((name, idx) => {
    const colIdx = idx < 4 ? 0 : 1;
    const rowIdx = idx % 4;
    const itemX = cardX + 90 + colIdx * (colW + 20);
    const itemY = colStartY + rowIdx * (mRowH + mGap);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.beginPath();
    ctx.roundRect(itemX, itemY, colW, mRowH, [18]);
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.roundRect(itemX + 24, itemY + 45, 75, 75, [14]);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${idx + 1}`, itemX + 61, itemY + 98);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px "Segoe UI", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(name, itemX + 120, itemY + 98);
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
